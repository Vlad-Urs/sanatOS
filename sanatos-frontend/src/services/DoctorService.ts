import axios from 'axios';

const DOCTOR_API_URL = "http://localhost:8080/doctors";

class DoctorService{
    getDoctors(){
        return axios.get(DOCTOR_API_URL);
    }

    createDoctor(newDoctor:Doctor){
        return axios.post(DOCTOR_API_URL, newDoctor);
    }
}

export default new DoctorService()