import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "../utils/api-client";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PriorAuthorizationRequest, PriorAuthorizationRequestSchema } from "../utils/validations";

const submitPriorAuth = async (data: PriorAuthorizationRequest) => {
  const response = await authClient.post("/authorization/create", data);
  return response.data;
};

const PriorAuthorizationForm: React.FC = () => {
  const { id: patientId } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PriorAuthorizationRequest>({
    resolver: zodResolver(PriorAuthorizationRequestSchema),
    defaultValues: {
      patientId,
    },
  });

  const mutation = useMutation({
    mutationFn: submitPriorAuth,
    onSuccess: () => {
      toast.success("Prior Authorization Request Submitted Successfully");
      reset();
    },
    onError: (error: unknown) => {
      const errMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(errMessage);
    },
  });

  const onSubmit = (data: PriorAuthorizationRequest) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto mt-5 flex flex-col justify-center h-full w-full">
      <div className="flex gap-x-3 items-center mb-5 py-3">
        <button onClick={() => navigate(`/patient/${patientId}`)} className="text-4xl mr-2">
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-extrabold text-center uppercase">
          Prior Authorization Request
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="patientId" className="block mb-1">
            Patient ID
          </label>
          <input
            id="patientId"
            {...register("patientId")}
            className="w-full p-2 border rounded"
            readOnly
          />
          {errors.patientId && (
            <span className="text-red-500 text-sm">
              {errors.patientId.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="treatmentDetails" className="block mb-1">
            Treatment Details
          </label>
          <input
            id="treatmentDetails"
            {...register("treatmentDetails")}
            className="w-full p-2 border rounded"
          />
          {errors.treatmentDetails && (
            <span className="text-red-500 text-sm">
              {errors.treatmentDetails.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="requestStatus" className="block mb-1">
            Request Status
          </label>
          <select
            id="requestStatus"
            {...register("requestStatus")}
            className="w-full p-2 border rounded"
          >
            <option value="APPROVED">APPROVED</option>
            <option value="PENDING">PENDING</option>
            <option value="DENIED">DENIED</option>
          </select>
          {errors.requestStatus && (
            <span className="text-red-500 text-sm">
              {errors.requestStatus.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="labResults" className="block mb-1">
            Lab Results
          </label>
          <input
            id="labResults"
            {...register("labResults")}
            className="w-full p-2 border rounded"
          />
          {errors.labResults && (
            <span className="text-red-500 text-sm">
              {errors.labResults.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="insurancePlan" className="block mb-1">
            Insurance Plan
          </label>
          <input
            id="insurancePlan"
            {...register("insurancePlan")}
            className="w-full p-2 border rounded"
          />
          {errors.insurancePlan && (
            <span className="text-red-500 text-sm">
              {errors.insurancePlan.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="dateOfService" className="block mb-1">
            Date of Service
          </label>
          <input
            id="dateOfService"
            type="date"
            {...register("dateOfService")}
            className="w-full p-2 border rounded"
          />
          {errors.dateOfService && (
            <span className="text-red-500 text-sm">
              {errors.dateOfService.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="diagnosisCode" className="block mb-1">
            Diagnosis Code
          </label>
          <input
            id="diagnosisCode"
            {...register("diagnosisCode")}
            className="w-full p-2 border rounded"
          />
          {errors.diagnosisCode && (
            <span className="text-red-500 text-sm">
              {errors.diagnosisCode.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="doctorNote" className="block mb-1">
            Doctor's Note
          </label>
          <input
            id="doctorNote"
            {...register("doctorNote")}
            className="w-full p-2 border rounded"
          />
          {errors.doctorNote && (
            <span className="text-red-500 text-sm">
              {errors.doctorNote.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Loading..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default PriorAuthorizationForm;