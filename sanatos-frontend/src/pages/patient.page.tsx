import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PatientPage: React.FC = () => {
  const { PatientID } = useParams<{ PatientID: string }>();
  const [patientData, setPatientData] = useState<any>(null);
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showHistoryText, setShowHistoryText] = useState(false);
  const [showPrescriptions, setShowPrescriptions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/patient-${PatientID}`);
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [PatientID]);

  return (
    <>
      <section className="bg-ct-dark-300 min-h-screen py-10">
        <div className="bg-white max-w-4xl mx-auto p-6 rounded-lg shadow-md">
          <div className="text-center">
            <h4 className="text-3xl font-bold text-blue-500">
              Welcome, {patientData ? patientData.patient.username : "Loading..."}
            </h4>
          </div>
          <div className="text-center mt-4">
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowAccountInfo(!showAccountInfo)}
            >
              {showAccountInfo ? "Hide Account Info" : "Show Account Info"}
            </button>
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg ml-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowHistoryText(!showHistoryText)}
            >
              {showHistoryText ? "Hide Medical History" : "Show Medical History"}
            </button>
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg ml-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowPrescriptions(!showPrescriptions)}
            >
              {showPrescriptions ? "Hide Prescriptions" : "Show Prescriptions"}
            </button>
          </div>
          {showAccountInfo && patientData && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mt-4">Account Info</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <tbody>
                    {Object.entries(patientData.patient)
                      .filter(([key]) => !["patientId", "username", "lastModifiedAt","password"].includes(key))
                      .map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-200">
                          <td className="py-2 px-4 text-gray-500 font-semibold">{key}</td>
                          <td className="py-2 px-4">{String(value)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {showHistoryText && patientData && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mt-4">Medical History</h2>
              <p className="py-2 px-4">{patientData.medHistory.historyText}</p>
            </div>
          )}
          {showPrescriptions && patientData && patientData.prescriptions && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mt-4">Prescriptions</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 px-4 text-gray-500 font-semibold">Medication Name</th>
                      <th className="py-2 px-4 text-gray-500 font-semibold">Dosage</th>
                      <th className="py-2 px-4 text-gray-500 font-semibold">Dosage Duration</th>
                      <th className="py-2 px-4 text-gray-500 font-semibold">Instructions</th>
                      <th className="py-2 px-4 text-gray-500 font-semibold">Issue Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientData.prescriptions.map((prescription: any) => (
                      <tr key={prescription.prescriptionId} className="border-b border-gray-200">
                        <td className="py-2 px-4">{prescription.medicationName}</td>
                        <td className="py-2 px-4">{prescription.dosage}</td>
                        <td className="py-2 px-4">{prescription.dosageDuration}</td>
                        <td className="py-2 px-4">{prescription.instructions}</td>
                        <td className="py-2 px-4">{prescription.issueDate}</td>
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

export default PatientPage;
