import axios from "axios";

const EXPRESS_API_URL = "http://localhost:3000";
const PYTHON_API_URL = "http://localhost:3001";

const pythonAxiosInstance = axios.create({
  baseURL: PYTHON_API_URL,
});

const expressAxiosInstance = axios.create({
  baseURL: EXPRESS_API_URL,
});

const ApiService = {
  signin: async (email: string, password: string) => {
    const response = await expressAxiosInstance.post("/auth/signin", {
      email: email,
      password: password,
    });
    return response;
  },

  signup: async (email: string, password: string) => {
    const response = await expressAxiosInstance.post("/auth/signup", {
      email: email,
      password: password,
    });

    return response;
  },

  getNutrientsLog: async function (userId: string, date: string) {
    const response = await expressAxiosInstance.get(
      `/nutrients/logs/${userId}/${date}`
    );

    return response;
  },
};

export default ApiService;
