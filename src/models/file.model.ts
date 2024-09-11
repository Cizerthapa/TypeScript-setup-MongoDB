import { z } from 'zod';

const fileSchema = z.object({
  name: z.string().min(3, 'File name must be greater than 3 characters'), 
  folderId: z.string().min(1,'FolderId must be greater than 1'),
  userId: z.string().min(1,'UserId must be greater than 1'),
  type: z.string().min(1,'File type must be greater than 1'),
})

// Type inference in action
const validFileData = { 
  name: 'johnsmith', 
  folderId: 'john@example.com', 
  userId: 'strongpassword123',
  type: 'pdf'
};

const myUser = fileSchema.parse(validFileData);