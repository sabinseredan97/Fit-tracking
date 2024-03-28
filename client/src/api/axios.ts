import axios from "axios";

type Data = {
  email: string;
  password: string;
};

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

export async function login(data: Data) {
  return await axios
    .post("/login?useCookies=true&usePersistCookies=true", data)
    .then((res) => res.data);
}

export async function logout() {
  return await axios.post("Account/logout").then((res) => res.data);
}

export async function getRequest() {
  return await axios.get("/WeatherForecast").then((res) => res.data);
}

export async function getUserData() {
  return await axios.get("/manage/info").then((res) => res.data);
}
