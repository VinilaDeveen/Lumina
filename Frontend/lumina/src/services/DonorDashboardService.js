import axios from 'axios';

const Donor_Dashboard_Based_Common_REST_API_URL = 'http://localhost:8091';

class DonorDashboardServices {
  getDonors() {
    return axios.get(Donor_Dashboard_Based_Common_REST_API_URL + '/Donor/getAll');
  }
}

const DonorDashboardService = new DonorDashboardServices();

export default DonorDashboardService;
