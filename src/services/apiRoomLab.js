import axios from "axios";
import { apiUrl } from '../services/getUrl'
//const apiUrl = "http://10.20.5.205:9200/";

// const getRoomLab = async () => {
//     await axios
//     .get(`${ apiUrl }mb_lab_room`)
//     .then((res) =>
//       console.log(res.data)
  
//       // this.lab_room = res.data;
//       //console.log('lab_room ' , res.data)
//     )
//     .catch((err) => {
//       console.log(err);
//     });
// }

const getRoomLab = async () => {
  const  { data } = await axios.get(`${apiUrl}mb_lab_room`);
  console.log(data.data[0])
  console.log(typeof(data.data))
  return data.data
};

export default {
  getRoomLab,
};
