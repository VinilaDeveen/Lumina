import axios from 'axios';

const Recieve_Donation_Based_Common_REST_API_URL = 'http://localhost:8091';

class RecieveDonationServices {
  getRecievedDonations() {
    return axios.get(Recieve_Donation_Based_Common_REST_API_URL + '/getReciveDonations');
  }
  deleteRecieveDonations(DonationId) {
    return axios.delete(Recieve_Donation_Based_Common_REST_API_URL + '/' + DonationId);
  }
}

const RecieveDonationService = new RecieveDonationServices();

export default RecieveDonationService;
