import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DoctorPage: React.FC = () => {
  const { DoctorID } = useParams<{ DoctorID: string }>();
  const [doctorData, setDoctorData] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [showPatients, setShowPatients] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/doctor-${DoctorID}`);
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        setDoctorData(data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchData();
  }, [DoctorID]);

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const toggleShowPatients = () => {
    setShowPatients(!showPatients);
    if (showPatients) {
      setPatients([]); 
    } else {
      fetchPatients();
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await fetch(`http://localhost:8080/doctor-${DoctorID}/patients`);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  return (
    <>
      <section className="bg-ct-dark-300 min-h-screen py-10">
        <div className="bg-white max-w-4xl mx-auto p-6 rounded-lg shadow-md">
          <div className="text-center">
            <h4 className="text-3xl font-bold text-blue-500">
              Welcome, {doctorData ? doctorData.username : "Loading..."}
            </h4>
          </div>
          <div className="text-center mt-4">
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover-bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={toggleTable}
            >
              {showTable ? "Hide Account Info" : "Show Account Info"}
            </button>
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg ml-4 hover-bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={toggleShowPatients}
            >
              {showPatients ? "Hide Patients" : "Show Patients"}
            </button>
          </div>
          {showTable && doctorData && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mt-4">Doctor Information</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 text-gray-500 font-semibold">First Name</td>
                      <td className="py-2 px-4">{doctorData.firstName}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 text-gray-500 font-semibold">Last Name</td>
                      <td className="py-2 px-4">{doctorData.lastName}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 text-gray-500 font-semibold">Email</td>
                      <td className="py-2 px-4">{doctorData.email}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 text-gray-500 font-semibold">Phone Number</td>
                      <td className="py-2 px-4">{doctorData.phoneNumber}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 text-gray-500 font-semibold">Specialization</td>
                      <td className="py-2 px-4">{doctorData.specialization}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 text-gray-500 font-semibold">License Number</td>
                      <td className="py-2 px-4">{doctorData.licenseNumber}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {showPatients && patients.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mt-4">Patients of the Doctor</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <tbody>
                    {patients.map((patient: any) => (
                      <tr key={patient.patientId} className="border-b border-gray-200">
                        <td className="py-2 px-4 text-gray-500 font-semibold">Patient ID</td>
                        <td className="py-2 px-4">{patient.patientId}</td>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-4 text-gray-500 font-semibold">Username</td>
                          <td className="py-2 px-4">{patient.username}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-4 text-gray-500 font-semibold">First Name</td>
                          <td className="py-2 px-4">{patient.firstName}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-4 text-gray-500 font-semibold">Last Name</td>
                          <td className="py-2 px-4">{patient.lastName}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-4 text-gray-500 font-semibold">Email</td>
                          <td className="py-2 px-4">{patient.email}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-4 text-gray-500 font-semibold">Phone Number</td>
                          <td className="py-2 px-4">{patient.phoneNumber}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-4 text-gray-500 font-semibold">Date of Birth</td>
                          <td className="py-2 px-4">{patient.dateOfBirth}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-4 text-gray-500 font-semibold">Gender</td>
                          <td className="py-2 px-4">{patient.gender}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-4 text-gray-500 font-semibold">Address</td>
                          <td className="py-2 px-4">{patient.address}</td>
                        </tr>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DoctorPage;
