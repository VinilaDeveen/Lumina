import axios from 'axios';

const Phlebotomist_Donation_Process_Based_Common_REST_API_URL = 'http://localhost:8091';

class PhlebotomistDonationProcessServices {
  saveDonationProcess(donation) {
    return axios.post(Phlebotomist_Donation_Process_Based_Common_REST_API_URL + '/saveDonation/', donation);
  }
}

const PhlebotomistDonationProcessService = new PhlebotomistDonationProcessServices();

export default PhlebotomistDonationProcessService;
