// Import Zod for validation and MongoDB's ObjectId utility
import { z } from 'zod'
import { ObjectId } from 'mongodb'

// A helper function to check if a given string is a valid MongoDB ObjectId --
const isValidObjectId = (id: string) => ObjectId.isValid(id)

// Define a base schema using Zod to validate the basic structure of folder data
// This schema ensures the name is a string with constraints on length and presence.
const baseSchema = z
  .object({
    userId: z
      .string()
      .min(6, 'Folder name should be at least 6 characters.')
      .max(20, 'Folder name should not exceed 20 characters.')
      .min(1, 'Folder name is required.'),
  })
  .strict() // Disallows any extra properties that are not defined in the schema

// Schema to validate request parameters, specifically the folderId
// The folderId must be a non-empty string and a valid MongoDB ObjectId
const parameterSchema = z.object({
  folderId: z.string().min(1, 'Query Param is required.') // folderId should not be empty
    .refine(isValidObjectId, { // Custom validation using refine to check for valid ObjectId
      message: 'Invalid ObjectId for folderId.', // Custom error message if validation fails
    }),
})

// The createSchema is the same as baseSchema since creation requires full validation of the folder name
const createSchema = baseSchema

// The updateSchema allows partial updates to folder data, making fields optional
// It is derived from baseSchema by making all properties optional with .partial()
const updateSchema = baseSchema.partial()

// Combine and export all schemas for use in other parts of the application
const schemas = {
  createSchema,
  updateSchema,
  parameterSchema,
}

export default schemas
