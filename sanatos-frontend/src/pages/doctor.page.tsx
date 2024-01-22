import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DoctorPage: React.FC = () => {
  const { DoctorID } = useParams<{ DoctorID: string }>();
  const [doctorData, setDoctorData] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [showPatients, setShowPatients] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Convert dateOfBirth to the appropriate format
        const formattedDateOfBirth = formData.dateOfBirth
        ? new Date(formData.dateOfBirth).toISOString()
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
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          dateOfBirth: "",
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
    function handleModifyMedicalHistory(patient_id: any): void {
      throw new Error("Function not implemented.");
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
                  <td className="py-2 px-4">
                  <button
                    className="bg-ct-blue-100 text-white px-4 py-2 rounded-md hover:bg-ct-blue-200 focus:outline-none focus:ring focus:border-ct-red-700 my-2 mx-5"
                    onClick={() => handleModifyMedicalHistory(patient.patient_id)}
                  >
                    Modify Medical History
                  </button>
                  <button
                    className="bg-ct-blue-100 text-white px-4 py-2 rounded-md hover:bg-ct-blue-200 focus:outline-none focus:ring focus:border-ct-red-700 mx-10"
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
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    className="border border-gray-300 px-3 py-2 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    className="border border-gray-300 px-3 py-2 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    className="border border-gray-300 px-3 py-2 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
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
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleFormChange}
                    className="border border-gray-300 px-3 py-2 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <DatePicker
                    selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
                    onChange={(date: Date | null) =>
                      setFormData({
                        ...formData,
                        dateOfBirth: date ? date.toISOString().split("T")[0] : "",
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
    </>
  );
};

export default DoctorPage;
