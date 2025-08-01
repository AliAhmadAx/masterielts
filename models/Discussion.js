import mongoose from 'mongoose';

const discussionSchema = new mongoose.Schema({ message: String });
export default mongoose.model('Discussion', discussionSchema);