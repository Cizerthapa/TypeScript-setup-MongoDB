import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {type: String}, // String is shorthand for {type: String}
  address: String,
  email: String,
  password: String,
  contactnumber: String,
  birthdate: String,
});
exports.schema = userSchema;