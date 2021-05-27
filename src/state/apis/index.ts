import axios from "axios";

export const requestLoadSource = async (id: string) => {
  const resp = await axios.get(`http://localhost:3001/sources/${id}`);
  return resp.data;
};
