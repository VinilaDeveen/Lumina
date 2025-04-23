import axios from 'axios';

const Donor_Appointment_Based_Common_REST_API_URL = 'http://localhost:8091';

class DonorAppointmentsServices {
  findAppoinments() {
    return axios.get(Donor_Appointment_Based_Common_REST_API_URL + '/appointment/getAll');
  }

  deleteAppointment(donationID) {
    return axios.delete(Donor_Appointment_Based_Common_REST_API_URL + '/delete/' + donationID);
  }
}

const DonorAppointmentsService = new DonorAppointmentsServices();

export default DonorAppointmentsService;
