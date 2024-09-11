import { z } from 'zod';

export const UserSchema = z.object({
  username: z.string().min(5, 'Username must be at least 5 characters'),
  email: z.string().email('Invalid email format'),
  address: z.string().min(5,'Invalid address format'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
  contactnumber: z.string().min(10, 'Invalid contact number format'),
  age: z.number().optional(),
  role: z.string().refine((role) => ['admin', 'user'].includes(role), {
  message: 'Role must be either "admin" or "user"',
  })
});

// // Type inference in action
// const validUserData = { 
//     username: 'johnsmith', 
//     email: 'john@example.com', 
//     password: 'strongpassword123',
//     contactnumber: '1234567890',
//     address: '123 Main St',
//     role: 'admin',
//     age: 12
// };

exports.schema = UserSchema;