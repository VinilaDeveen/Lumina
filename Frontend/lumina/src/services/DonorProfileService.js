import axios from 'axios';

const token = localStorage.getItem('accessToken');
const Defualt_API = 'localehost:3000'

class DonorProfileService {
    fetchDonorProfile(donorID){
        return axios.get(Defualt_API+`fetchInfo/${donorID}`);
    };

    updateDonorProfile(donorProfileData){
        return axios.put(Defualt_API+"updateDonorInfo",donorProfileData,{ headers: { Authorization: `Bearer ${token}` } });
    };

    deleteDonorProfile(DonorId){
        return axios.delete(Defualt_API+`/deleteDonorProfile/${DonorId}`,{ headers: { Authorization: `Bearer ${token}` } });
    }
}

const  DonorProfileServices = new DonorProfileService();

export default DonorProfileServices;