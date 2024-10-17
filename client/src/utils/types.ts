export type User = {
    id: string,
    name: string,
    email: string,
}

export type Patient = {
    name: string;
    id: string;
    age: number;
    condition: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    medicalHistory: string | null;
    treatmentPlan: string | null;
}