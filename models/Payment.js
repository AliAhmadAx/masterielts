import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({ amount: Number });
export default mongoose.model('Payment', paymentSchema);