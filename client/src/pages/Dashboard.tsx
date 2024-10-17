import { useState } from 'react';
import Navbar from '../components/Navbar';
import PatientList from '../components/PatientList';
import AddPatientModal from '../components/AddPatientModal';

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-100 lg:max-w-7xl mx-auto">
      <Navbar />
      <div className="flex justify-between px-8 py-2 items-center">
        <h1 className='my-5 text-center font-bold uppercase text-3xl'>
          Patient List
        </h1>
        <button
          className='bg-blue-600 text-white h-fit py-2  px-4 rounded-xl hover:bg-blue-700'
          onClick={openModal}
        >
          Add Patient
        </button>
      </div>
      <PatientList />
      {isModalOpen && <AddPatientModal closeModal={closeModal} />}
    </div>
  );
}

export default Dashboard;