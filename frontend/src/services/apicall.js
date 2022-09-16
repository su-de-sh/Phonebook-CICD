import axios from "axios";
const get = () => {
  return axios.get("/api/persons");
};

const post = (name, number) => {
  return axios.post("/api/persons", { name, number });
};

const update = (id, dataToUpdate) => {
  return axios.put(`/api/persons/${id}`, dataToUpdate);
};

const remove = (id) => {
  return axios.delete(`/api/persons/${id}`);
};

const apiCall = { get, post, remove, update };
export default apiCall;
