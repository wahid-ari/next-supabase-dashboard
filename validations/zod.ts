import { z } from 'zod';

export const formSchema = z
  .object({
    username_object: z
      .string({
        invalid_type_error: 'Username must be string',
      })
      .regex(/^[A-Za-z]+$/, { message: 'Username must be alphabet without space' })
      .min(1, { message: 'Username is required' }),
    email_object: z
      .string({
        invalid_type_error: 'Username is required',
      })
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    age_object: z
      .number({
        required_error: 'Age is required',
        invalid_type_error: 'Age is required',
      })
      .positive({ message: 'Age must be a positive number' })
      .gt(17, { message: 'Age must be a greater than 17' })
      .int({ message: 'Age must be an integer' }),
    password_object: z
      .string()
      .nonempty({
        message: 'Password is required',
      })
      .min(8, { message: 'Password length minimal is 8' }),
    confirmPassword_object: z.string().nonempty({
      message: 'Confirm Password is required',
    }),
  })
  .refine((data) => data.password_object === data.confirmPassword_object, {
    path: ['confirmPassword_object'],
    message: 'Oops! Password doesnt match',
  });

function transformZodErrorsIntoObject(errors: any) {
  const validationErrors = {};
  errors.forEach((error: any) => {
    if (error.path !== undefined) {
      validationErrors[error.path] = error.message;
    }
  });
  return validationErrors;
}

export async function validateFormObject(data: any) {
  try {
    await formSchema.parseAsync(data);
    return { valid: true, errors: [] };
  } catch (err) {
    const validationErrors = transformZodErrorsIntoObject(err.errors);
    return { valid: false, errors: validationErrors };
  }
}
