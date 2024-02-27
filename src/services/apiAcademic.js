import axios from "axios";
import { apiAcademic } from "../services/getUrl";

const getAcademicPrograms = async () => {
  const { data } = await axios.get(`${apiAcademic}academic_programs`);
  //console.log(data.data)
  return data.data;
};

export default { getAcademicPrograms };
