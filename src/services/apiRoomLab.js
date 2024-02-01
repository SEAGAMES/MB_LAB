import axios from "axios";
import { apiUrl } from '../services/getUrl'
//const apiUrl = "http://10.20.5.205:9200/";

const getRoomLab = async () => {
  const { data } = await axios.get(`${apiUrl}mb_lab_room`);
  //console.log(typeof(data.data))
  return data.data
};

const getBookingLab = async () => {
  const { data } = await axios.get(`${apiUrl}mb_booking_lab`);
  //console.log(data)
  //console.log(typeof(data.data))
  return data.data
};

const thisLabBooking = async (labNo) => {
  const { data } = await axios.get(`${apiUrl}thisLabBooking/${labNo}`);
  // console.log(data)
  return data
};


const createBookLabRoom = async (data) => {
  const result = axios.post(`${apiUrl}bookLabRoom`, data)
  return result
}

const updateApproveStatus = async (id, statusCode) => {
  // console.log(id, statusCode)
  const result = axios.post(`${apiUrl}updateApproveStatus`, {
    id: id,
    statusCode: statusCode,
  })
  //console.log(result)
  return result
}

const deleteBookingLab = async (id) => {
  const result = await axios.delete(`${apiUrl}delete_bookingLab/${id}`)
  return result.data
}



export default {
  getRoomLab,
  getBookingLab,
  thisLabBooking,
  createBookLabRoom,
  updateApproveStatus,
  deleteBookingLab
};
