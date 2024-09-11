import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, optional: true },
  email: { type: String, optional: true },
  address: { type: String, optional: true },
  password: { type: String, optional: true },
  contactnumber: { type: String, optional: true },
  age: { type: Number, optional: true },
  role: { type: String, optional: true }, 
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;