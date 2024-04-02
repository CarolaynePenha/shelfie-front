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

export function handleError(err, setToken, setUser, navigate) {
  if (err.response.status === 401) {
    alert("Usuário inválido, faça login novamente");
    logOut(setToken, setUser, navigate);
  }
  if (err.response.status === 404) {
    alert("Livro não encontrado");
    navigate("/shelf");
  } else {
    alert("Houve um erro ao realizar sua busca!");
  }
}
