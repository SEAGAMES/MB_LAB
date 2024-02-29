import axios from "axios";
import { apiAcademic } from "../services/getUrl";

const getStudentData = async () => {
  const { data } = await axios.get(`${apiAcademic}mb_student`);
  //console.log(data.data)
  return data.data;
};

const getAcademicPrograms = async () => {
  const { data } = await axios.get(`${apiAcademic}academic_programs`);
  //console.log(data.data)
  return data.data;
};

export default { getStudentData, getAcademicPrograms };
