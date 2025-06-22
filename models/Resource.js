import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['hotline', 'counseling', 'peer-support', 'wellness'],
    required: true,
  },
});

export default mongoose.model('Resource', resourceSchema); 