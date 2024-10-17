import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const signupSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
});

export const priorAuthSchema = z.object({
  patientId: z.string().min(1, 'Patient ID is required'),
  treatmentDetails: z.string().min(1, 'Treatment Details are required'),
  requestStatus: z.enum(['APPROVED', 'PENDING', 'DENIED']),
  labResults: z.string().optional(),
  insurancePlan: z.string().optional(),
  dateOfService: z.string().optional(),
  diagnosisCode: z.string().optional(),
  doctorNote: z.string().optional(),
});

export type PriorAuthInput = z.infer<typeof priorAuthSchema>;


export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;