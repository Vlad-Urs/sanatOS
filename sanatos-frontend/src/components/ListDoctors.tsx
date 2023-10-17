import React, { useEffect, useState } from 'react';
import DoctorService from '../services/DoctorService';

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await DoctorService.getDoctors();
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div>
    <h2 className="text-center">Doctor List</h2>
    <div className = "row">
       <button className="btn btn-primary"> Add Doctor</button>
    </div>
    <br></br>
    <div className = "row">
           <table className = "table table-striped table-bordered">

               <thead>
                   <tr>
                       <th> Doctor First Name</th>
                       <th> Doctor Last Name</th>
                       <th> Doctor Email Id</th>
                       <th> Actions</th>
                   </tr>
               </thead>
               <tbody>
                   {
                       doctors.map(
                           doctor => 
                           <tr key = {doctor.id}>
                                <td> { doctor.firstName} </td>   
                                <td> {doctor.lastName}</td>
                                <td> {doctor.email}</td>
                                <td>
                                    <button className="btn btn-info">Update </button>
                                    <button style={{marginLeft: "10px"}} className="btn btn-danger">Delete </button>
                                    <button style={{marginLeft: "10px"}} className="btn btn-info">View </button>
                                </td>
                           </tr>
                       )
                   }
               </tbody>
           </table>

        </div>
    </div>
  );
};

export default DoctorList;


