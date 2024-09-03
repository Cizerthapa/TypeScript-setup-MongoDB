import mongoose from 'mongoose';
import { validatePassword } from '../utils/validators';
const { Schema } = mongoose;

const fileSchema = new Schema({
  name: {type: String}, // String is shorthand for {type: String}
  address: String,
  email: String,
  password: String,
  contactnumber: String,
  birthdate: String,
});
exports.schema = fileSchema;