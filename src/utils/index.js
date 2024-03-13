import dayjs from "dayjs";
import "dayjs/locale/pt-br";
export function logOut(setToken, setUser, navigate) {
  setToken(null);
  setUser("");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
}

export function dateConverterToString(date) {
  const convertedDate = dayjs(date).locale("pt-br").format("DD/MM/YY");
  return convertedDate;
}

export function convertToISOString(date) {
  const dateObject = new Date(date).toISOString();
  return dateObject;
}
