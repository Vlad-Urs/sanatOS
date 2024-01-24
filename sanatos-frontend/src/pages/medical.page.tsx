import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface MedicalHistory {
  patient_history: Record<string, any>;
}

const MedicalHistoryPage: React.FC = () => {
  const { PatientID } = useParams<{ PatientID: string }>();
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory | null>(null);
  const [modifiedHistory, setModifiedHistory] = useState<string>("");

  useEffect(() => {
    fetchMedicalHistory();
  }, [PatientID]);

  const fetchMedicalHistory = async () => {
    try {
      const response = await fetch(`http://localhost:5000/patient-${PatientID}/history`);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data: MedicalHistory = await response.json();
      setMedicalHistory(data);
      setModifiedHistory(data.patient_history.historyText || "");
    } catch (error) {
      console.error("Error fetching medical history data:", error);
    }
  };

  const handleModify = async () => {
    try {
      const response = await fetch(`http://localhost:5000/patient-${PatientID}/history`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ historyText: modifiedHistory }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const updatedData: MedicalHistory = await response.json();
      setMedicalHistory(updatedData);

    } catch (error) {
      console.error("Error modifying medical history:", error);
    }
  };

  return (
    <section className="bg-ct-blue-200 min-h-screen py-10">
      <div className="bg-white max-w-4xl mx-auto p-6 rounded-lg shadow-md">
        <div className="text-center">
          <h4 className="text-3xl font-bold text-blue-500">
            Patient {PatientID}
          </h4>
        </div>
        {medicalHistory && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mt-4">Medical History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <tbody>
                  {Object.entries(medicalHistory.patient_history).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-200">
                      <td className="py-2 px-4 text-gray-500 font-semibold">{key}</td>
                      <td className="py-2 px-4">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-4">
          <textarea
            id="modifiedHistory"
            name="modifiedHistory"
            value={modifiedHistory}
            onChange={(e) => setModifiedHistory(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
          />
        </div>

        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mt-4"
          onClick={handleModify}
        >
          Modify
        </button>
      </div>
    </section>
  );
};

export default MedicalHistoryPage;
