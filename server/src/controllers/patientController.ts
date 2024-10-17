import { Request, Response } from 'express';
import { prisma } from "..";
import { z } from 'zod';
import { PatientSchema } from '../utils/validation';
import { Patient } from '@prisma/client';

export const getAllPatients = async (req: Request, res: Response): Promise<void> => {
  try {
    const patients: Patient[] = await prisma.patient.findMany();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching patients' });
  }
};

export const getPatient = async (req: Request, res: Response): Promise<void | any> => {
  try {
    console.log(req.params.id, "id")
    const patient = await prisma.patient.findUnique({
      where: { id: req.params.id },
    });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching patient' });
  }
};

export const createPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = PatientSchema.parse(req.body);
    console.log(validatedData)
    const patient = await prisma.patient.create({ data: validatedData });
    res.status(201).json(patient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Error creating patient' });
    }
  }
};