import axios from 'axios';

const Appointment_Based_Common_REST_API_URL = 'http://localhost:8091';

class AppointmentService {
  /* Appoinment Axios REST API Services */

  findAppoinments() {
    return axios.get(Appointment_Based_Common_REST_API_URL + '/appointment/getAll');
  }

  /* Schedule Appoinment Axios REST API Services */
  findLocations() {
    return axios.get(Appointment_Based_Common_REST_API_URL + '/appointment/getAll');
  }
  findDatesUnderTheSelectedLocation(location) {
    return axios.get(Appointment_Based_Common_REST_API_URL + '/appointment/findByLocation/' + location);
  }

  findAllAvailableTimesUnderBothDateAndLocationSelection(location, date) {
    return axios.get(
      Appointment_Based_Common_REST_API_URL + '/appointment/findByLocationAndDate/' + location + '/' + date
    );
  }

  createAppoinment(appoinment) {
    return axios.post(Appointment_Based_Common_REST_API_URL + '/appointment/add', appoinment);
  }
}
const AppointmentServices = new AppointmentService();

export default AppointmentServices;
