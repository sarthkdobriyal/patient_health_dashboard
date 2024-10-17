import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "../utils/api-client";
import { Patient } from "../utils/types";
import { ArrowLeft } from "lucide-react";

const fetchPatient = async (id: string): Promise<Patient> => {
  const response = await authClient.get(`/patients/${id}`);
  return response.data;
};

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: patient,
    isLoading,
    isError,
  } = useQuery<Patient, Error>({
    queryKey: ["patient", id],
    queryFn: () => fetchPatient(id!),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div className="text-red-500">Error fetching patient details</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md relative">
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="text-4xl mr-2"
            >
              <ArrowLeft />
            </button>
            <h1 className="text-3xl font-bold">Patient Details</h1>
          </div>
          <div className="">
          <Link
            to={`/prior-auth/${patient?.id}`}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit Prior Authorization Form
          </Link>
        </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold">Name</h2>
            <p className="text-gray-700">{patient?.name || "-"}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Age</h2>
            <p className="text-gray-700">{patient?.age || "-"}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Condition</h2>
            <p className="text-gray-700">{patient?.condition || "-"}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="text-gray-700">{patient?.email || "-"}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Phone</h2>
            <p className="text-gray-700">{patient?.phone || "-"}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Address</h2>
            <p className="text-gray-700">{patient?.address || "-"}</p>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold">Medical History</h2>
            <p className="text-gray-700">{patient?.medicalHistory || "-"}</p>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold">Treatment Plan</h2>
            <p className="text-gray-700">{patient?.treatmentPlan || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
