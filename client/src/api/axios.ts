import axios from "axios";

type AuthData = {
  email: string;
  password: string;
};

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

export async function register(data: AuthData) {
  return await axios.post("/register", data).then((res) => res.data);
}

export async function login(data: AuthData) {
  return await axios
    .post("/login?useCookies=true&usePersistCookies=true", data)
    .then((res) => res.data);
}

export async function logout() {
  return await axios.post("/Account/logout").then((res) => res.data);
}

export async function getRequest() {
  return await axios.get("/WeatherForecast").then((res) => res.data);
}

export async function getUserData() {
  return await axios.get("/manage/info").then((res) => res.data);
}
