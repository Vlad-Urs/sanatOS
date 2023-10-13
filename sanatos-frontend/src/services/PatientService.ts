import axios from 'axios';

const PATIENT_API_URL = "http://localhost:8080/patients";

class PatientService{
    getPatients(){
        return axios.get(PATIENT_API_URL);
    }
}

export default new PatientService()