import axios from "axios";

const movieInstance = axios.create({
  baseURL: "http://localhost:3001",
});

export default movieInstance;
