import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '../utils/api-client';
import { PatientSchema, PatientInput } from '../../../server/src/utils/validation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';




interface AddPatientModalProps {
  closeModal: () => void;
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({ closeModal }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PatientInput>({
    resolver: zodResolver(PatientSchema),
  });

  const queryClient = useQueryClient();

  const onSubmit = async (data: PatientInput) => {
    try {
      await authClient.post('/patients/create', data);
      toast.success("Patient Created")
      //@ts-expect-error invalidating the queries but its working 
      queryClient.invalidateQueries("patients")
      closeModal();
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white  p-8 rounded shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Add New Patient</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 ">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register('name')}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              {...register('age', { valueAsNumber: true })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Condition</label>
            <input
              type="text"
              {...register('condition')}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.condition && <p className="text-red-500">{errors.condition.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              {...register('phone')}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              {...register('address')}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Medical History</label>
            <textarea
              {...register('medicalHistory')}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.medicalHistory && <p className="text-red-500">{errors.medicalHistory.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Treatment Plan</label>
            <textarea
              {...register('treatmentPlan')}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.treatmentPlan && <p className="text-red-500">{errors.treatmentPlan.message}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;