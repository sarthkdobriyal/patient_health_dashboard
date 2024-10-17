import { Request, Response } from 'express';
import { prisma } from "..";
import { z } from 'zod';
import { PriorAuthorizationRequestSchema } from '../utils/validation';

export const createAuthorizationRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = PriorAuthorizationRequestSchema.parse(req.body);
    const authorizationRequest = await prisma.priorAuthorizationRequest.create({
      data: {
        patientId: validatedData.patientId,
        treatmentDetails: validatedData.treatmentDetails,
        requestStatus: validatedData.requestStatus,
        labResults: validatedData.labResults,
        insurancePlan: validatedData.insurancePlan,
        dateOfService: validatedData.dateOfService ? new Date(validatedData.dateOfService) : null,
        diagnosisCode: validatedData.diagnosisCode,
        doctorNote: validatedData.doctorNote,
      },
    });
    console.log(authorizationRequest);
    res.status(201).json(authorizationRequest);
  } catch (error) {
    console.error('Error creating authorization request:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Error creating authorization request' });
    }
  }
};

export const getAllAuthorizationRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const authorizationRequests = await prisma.priorAuthorizationRequest.findMany();
    res.json(authorizationRequests);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching authorization requests' });
  }
};