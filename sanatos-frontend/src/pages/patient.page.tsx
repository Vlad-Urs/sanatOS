import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RootState } from '../redux-toolkit/store/store';

const PatientPage: React.FC = () => {
  interface MedicalHistories {
    [key: string]: {
      [x: string]: any; patient_history?: { history_text: string, entry_date: string }[] 
};
  }  
  const { PatientID } = useParams<{ PatientID: string }>();
  const [patientData, setPatientData] = useState<any>(null);
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showHistoryText, setShowHistoryText] = useState(false);
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [medicalHistories, setMedicalHistories] = useState<MedicalHistories>({});

  const authState = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  let localNavigate = useNavigate();


  useEffect(() => {
    const isUserAuthenticated = authState.isAuthenticated;
    const correctedPath = authState.correctedPath;
    const currentPath = location.pathname;
    console.log(correctedPath)
    console.log(currentPath)

    if (!isUserAuthenticated || correctedPath !== currentPath) {
      localNavigate('/unauthorized');
    }
  }, [authState, location.pathname, localNavigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/patient-${PatientID}`);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/patient-${PatientID}/history`);
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        setMedicalHistories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [PatientID]);


  return (
    <>
      <section className="bg-ct-blue-200 min-h-screen py-10">
        <div className="bg-white max-w-4xl mx-auto p-6 rounded-lg shadow-md">
          <div className="text-center">
            <h4 className="text-3xl font-bold text-blue-500">
              Welcome, {patientData ? patientData.username : "Loading..."}
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
              <h2 className="text-2xl font-semibold text-gray-700 mt-4">Patient Info</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <tbody>
                    {Object.entries(patientData)
                      .filter(([key]) => !["patientId", "username", "lastModifiedAt", "password"].includes(key))
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
              <textarea
                className="w-full h-40 p-2 mt-4 border rounded-md" 
                style={{ width: "100%", maxWidth: "800px" }}  
                value={(medicalHistories.patient_history ?? []).map((historyItem: { entry_date: any; history_text: any; }) => (
                  `Entry date: ${historyItem?.entry_date} | History text: ${historyItem?.history_text || ''}`
                )).join('\n')}
                readOnly={true}
              ></textarea>
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
