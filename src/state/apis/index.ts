import axios from "axios";

export const requestLoadSource = async (id: string) => {
  const resp = await axios.get(`/api/sources/${id}`);
  return resp.data.source;
};
