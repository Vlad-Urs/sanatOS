import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PatientPage: React.FC = () => {
  const { PatientID } = useParams<{ PatientID: string }>();
  const [patientData, setPatientData] = useState<{ username: string } | null>(null);
  const [isTableVisible, setIsTableVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/patient-${PatientID}`);
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        setPatientData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [PatientID]);

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  // Define an array of keys to exclude from the table
  const excludedFields = ["patientId", "password", "username", "lastModifiedAt"];

  // Filter the keys and values to exclude fields based on the excludedFields array
  const filteredPatientData = patientData
    ? Object.fromEntries(
        Object.entries(patientData).filter(([key, _]) => !excludedFields.includes(key))
      )
    : null;

  return (
    <>
      <section className="bg-ct-dark-300 min-h-screen py-10">
        <div className="bg-white max-w-4xl mx-auto p-6 rounded-lg shadow-md">
          <div className="text-center">
            <h4 className="text-3xl font-bold text-blue-500">
              Welcome, {patientData ? patientData.username : "Loading..."}
            </h4>
          </div>
          <div className="text-center mt-4">
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={toggleTableVisibility}
            >
              {isTableVisible ? "Hide Account Info" : "Show Account Info"}
            </button>
          </div>
          {isTableVisible && filteredPatientData && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mt-4">Profile Info</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <tbody>
                    {Object.entries(filteredPatientData).map(([key, value]) => (
                      <tr key={key} className="border-b border-gray-200">
                        <td className="py-2 px-4 text-gray-500 font-semibold">
                          {key}
                        </td>
                        <td className="py-2 px-4">{value}
                        </td>
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



