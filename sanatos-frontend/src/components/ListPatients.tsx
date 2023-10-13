import React, { useEffect, useState } from 'react';
import PatientService from '../services/PatientService';

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await PatientService.getPatients();
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="patient-list-page">
      <h1 className="patient-list">Patient List</h1>
      <ul className="patient-container">
        {patients.map((patient) => (
          <li key={patient.patientId}>
            ID: {patient.patientId}, First Name: {patient.firstName}, Last Name: {patient.lastName}
            <p>Email: {patient.email}</p>
            <p>Phone Number: {patient.phoneNumber}</p>
            <p>Date of Birth: {patient.dateOfBirth}</p>
            <p>Gender: {patient.gender}</p>
            <p>Address: {patient.address}</p>
            <p>Created At: {patient.createdAt}</p>
            <p>Last Modified At: {patient.lastModifiedAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;



