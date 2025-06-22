import axios from "axios";
class OpenAIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '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';
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';

    if (!this.apiKey) {
      throw new Error('OpenAI API key is not configured');
    }
  }

  async sendMessage(prompt) {
    const requestBody = {
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    };

    try {
      const response = await axios.post(this.apiUrl, requestBody, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      const message = response.data.choices[0].message.content;
      return message;
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      console.error('Error sending message to OpenAI:', errorMessage);
      throw new Error('Failed to send message to OpenAI');
    }
  }

  getErrorMessage(error) {
    if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
      return error.response.data.error.message;
    }
    return error.message || 'An unknown error occurred';
  }
}

export const openAIService = new OpenAIService();
