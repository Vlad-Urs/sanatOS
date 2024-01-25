import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux-toolkit/store/store';
import { setCorrectedPath } from '../redux-toolkit/slices/authSlice';

const DoctorPage: React.FC = () => {
  interface MedicalHistories {
    [key: string]: { patient_history?: { history_text: string, entry_date: string }[] };
  }  

  interface NotificationProps {
    message: string;
    type: 'success' | 'error' | null;
  }

  const authState = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  let localNavigate = useNavigate();

  useEffect(() => {
    const isUserAuthenticated = authState.isAuthenticated;
    const correctedPath = authState.correctedPath;
    const currentPath = location.pathname;
  
    if (!isUserAuthenticated || correctedPath !== currentPath) {
      console.log(correctedPath)
      console.log(currentPath)
      console.log(isUserAuthenticated)
      localNavigate('/unauthorized');
    }
  }, [authState, location.pathname, localNavigate]);
  
  const NotificationMessage: React.FC<NotificationProps> = ({ message, type }) => {
    if (!type) return null;
  
    const notificationStyle: React.CSSProperties = {
      position: 'fixed',
      bottom: '60px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: type === 'success' ? 'green' : 'red',
      color: 'white',
      padding: '10px',
      zIndex: 9999,
      borderRadius: '5px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    };
  
    return (
      <div style={notificationStyle}>
        <p>{message}</p>
      </div>
    );
  };
  
  const [notification, setNotification] = useState<NotificationProps>({ message: '', type: null });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const navigate = useNavigate();
  const { DoctorID } = useParams<{ DoctorID: string }>();
  const [doctorData, setDoctorData] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [showPatients, setShowPatients] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [medicalHistories, setMedicalHistories] = useState<MedicalHistories>({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    address: "",
  });

  const fetchMedicalHistory = async (patientId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/patient-${patientId}/history`);
      const data = await response.json();
      console.log(data)
      setMedicalHistories((prevHistories) => ({
        ...prevHistories,
        [patientId]: data,
      }));
    } catch (error) {
      console.error(`Error fetching medical history for patient ${patientId}:`, error);
    }
  };

  useEffect(() => {
    const fetchAllMedicalHistories = async () => {
      for (const patient of patients) {
        await fetchMedicalHistory(patient.patient_id);
      }
    };

    fetchAllMedicalHistories();
  }, [patients]); 

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Convert dateOfBirth to the appropriate format
        const formattedDateOfBirth = formData.date_of_birth
        ? new Date(formData.date_of_birth).toISOString()
        : "";

        const response = await fetch(`http://localhost:5000/doctor-${DoctorID}`);
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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/doctor-${DoctorID}/patients/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Patient added successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          date_of_birth: "",
          gender: "",
          address: "",
        });
      } else {
        alert("Failed to add a patient.");
        console.log(formData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await fetch(`http://localhost:5000/doctor-${DoctorID}/patients`);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      setPatients(data.patients);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const renderDoctorInformation = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Doctor Information</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-500 font-semibold">First Name</td>
                <td className="py-2 px-4">{doctorData.first_name}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-500 font-semibold">Last Name</td>
                <td className="py-2 px-4">{doctorData.last_name}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-500 font-semibold">Email</td>
                <td className="py-2 px-4">{doctorData.email}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-500 font-semibold">Phone Number</td>
                <td className="py-2 px-4">{doctorData.phone_number}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-500 font-semibold">Specialization</td>
                <td className="py-2 px-4">{doctorData.specialization}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-500 font-semibold">License Number</td>
                <td className="py-2 px-4">{doctorData.license_number}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderPatientInformation = () => {

   
    function handleAddHistory(patient_id: string, medicalHistoryValue: string): void {
      try {
        if (medicalHistoryValue !== null && medicalHistoryValue.trim() !== '') {

          const PatientID = patient_id;
    
          const endpoint = `http://localhost:5000/doctor-${DoctorID}/patients/patient-${PatientID}/history`;

          const entryDate = new Date().toISOString().split('T')[0];
    
          fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              history_text: medicalHistoryValue,
              entry_date: entryDate,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              console.log('Medical history updated successfully:', data);
              setNotification({ message: 'Medical history added successfully', type: 'success' });
              setTimeout(() => {
                setNotification({ message: '', type: null });
              }, 3000);
            })
            .catch((error) => {
              console.error('Error updating medical history:', error);
              setNotification({ message: 'Failed to update medical history. Please try again.', type: 'error' });
              setTimeout(() => {
                setNotification({ message: '', type: null });
              }, 3000);
            });
        } else {
          console.log('Medical history value is empty or null. Skipping API call.');
          setNotification({ message: 'Medical history value is empty or null. Please enter a valid medical history.', type: 'error' });
          setTimeout(() => {
            setNotification({ message: '', type: null });
          }, 3000);
        }
      } catch (error) {
        console.error('Error handling medical history modification:', error);
        setNotification({ message: 'An error occurred. Please try again.', type: 'error' });
        setTimeout(() => {
          setNotification({ message: '', type: null });
        }, 3000);
      }
    }
    
    
    
    
    function handleGivePrescriptions(patient_id: any): void {
      throw new Error("Function not implemented.");
    }

    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Patients of the Doctor</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <tbody>
              {patients.map((patient: any,index:number) => (
                <tr key={patient.patient_id} className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-500 font-semibold">Patient Number</td>
                <td className="py-2 px-4">{index + 1}</td>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 text-gray-500 font-semibold">Username</td>
                    <td className="py-2 px-4">{patient.username}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 text-gray-500 font-semibold">First Name</td>
                    <td className="py-2 px-4">{patient.first_name}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 text-gray-500 font-semibold">Last Name</td>
                    <td className="py-2 px-4">{patient.last_name}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 text-gray-500 font-semibold">Email</td>
                    <td className="py-2 px-4">{patient.email}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 text-gray-500 font-semibold">Phone Number</td>
                    <td className="py-2 px-4">{patient.phone_number}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 text-gray-500 font-semibold">Date of Birth</td>
                    <td className="py-2 px-4">{patient.date_of_birth}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 text-gray-500 font-semibold">Gender</td>
                    <td className="py-2 px-4">{patient.gender}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 text-gray-500 font-semibold">Address</td>
                    <td className="py-2 px-4">{patient.adress}</td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 text-gray-500 font-semibold">Medical History</td>
                    <td className="py-2 px-4">
                    <textarea
                    className="w-full h-20 p-2 border rounded-md"
                    style={{ width: "100%", maxWidth: "500px" }}
                    value={(medicalHistories[patient.patient_id]?.patient_history || []).map((historyItem) => (
                      `${historyItem?.entry_date}: ${historyItem?.history_text || ''}`
                    )).join('\n')}
                    
                    readOnly={true}
                  ></textarea>
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 text-gray-500 font-semibold">New History</td>
                    <td className="py-2 px-4">
                    <textarea
                    ref={textareaRef}
                    className="w-full h-20 p-2 border rounded-md"
                    placeholder="Enter medical history here..."
                    
                    style={{ width: "100%", maxWidth: "500px" }}
                  ></textarea>
                    </td>
                  </tr>

                  <td className="py-2 px-4">
                  <button
                    className="bg-ct-blue-100 text-white px-4 py-2 rounded-md hover:bg-ct-blue-200 focus:outline-none focus:ring focus:border-ct-red-700 my-2 mx-5"
                    onClick={() => {
                      if (textareaRef.current) {
                        handleAddHistory(patient.patient_id, textareaRef.current.value);
                        textareaRef.current.value = '';
                      }
                    }}
                    
                  >
                    Add History
                  </button>
                  <button
                    className="bg-ct-blue-100 text-white px-4 py-2 rounded-md hover:bg-ct-blue-200 focus:outline-none focus:ring focus:border-ct-red-700 mx-10 ml-5"
                    onClick={() => handleGivePrescriptions(patient.patient_id)}
                  >
                    Give Prescriptions
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
   );
  };

  return (
    <>
      <section className="bg-ct-blue-200 min-h-screen py-10">
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
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg ml-4 hover-bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={toggleForm}
            >
              {showForm ? "Hide Create Patient Form" : "Show Create Patient Form"}
            </button>
          </div>
          {showForm && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mt-4">Add New Patient</h2>
              <form>
                <div className="mt-4">
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleFormChange}
                    className="border border-gray-300 px-3 py-2 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleFormChange}
                    className="border border-gray-300 px-3 py-2 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="border border-gray-300 px-3 py-2 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleFormChange}
                    className="border border-gray-300 px-3 py-2 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <DatePicker
                    selected={formData.date_of_birth ? new Date(formData.date_of_birth) : null}
                    onChange={(date: Date | null) =>
                      setFormData({
                        ...formData,
                        date_of_birth: date ? date.toISOString().split("T")[0] : "",
                      })
                    }
                    className="border border-gray-300 px-3 py-2 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleFormChange}
                    className="border border-gray-300 px-3 py-2 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    className="border border-gray-300 px-3 py-2 rounded-md "
                  />
                </div>
                <button
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mt-4"
                  onClick={submitForm}
                >
                  Submit
                </button>
              </form>
            </div>
          )}
          {showTable && doctorData && renderDoctorInformation()}
          {showPatients && patients.length > 0 && renderPatientInformation()}
        </div>
      </section>
   
      {notification.message && (
        <NotificationMessage message={notification.message} type={notification.type} />
      )}    </>
  );
};

export default DoctorPage;
