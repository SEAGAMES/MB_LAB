import axios from "axios";
import { apiUrl } from '../services/getUrl'
//const apiUrl = "http://10.20.5.205:9200/";


const getRoomLab = async () => {
  const { data } = await axios.get(`${apiUrl}mb_lab_room`);
  //console.log(data)
  //console.log(typeof(data.data))
  return data.data
};


const createBookLabRoom = async (data) => {
  const result = axios.post(`${apiUrl}bookLabRoom` , data)
  //console.log('result : ', result)
  return result
}


export default {
  getRoomLab,
  createBookLabRoom
};
