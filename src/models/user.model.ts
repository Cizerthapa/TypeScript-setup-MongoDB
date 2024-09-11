import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  address: { type: String },
  password: { type: String },
  contactnumber: { type: String },
  age: { type: Number, optional: true }, // default value is false
  role: { type: String }, 
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;