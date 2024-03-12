export function logOut(setToken, setUser, navigate) {
  setToken(null);
  setUser("");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
}

export function dateCodateConverter(date) {
  const startDateObjeto = new Date(date);

  const day = startDateObjeto.getUTCDay();
  const month = startDateObjeto.getUTCMonth();
  const year = startDateObjeto.getUTCFullYear();
  const convertedDate = `${day}/${month}/${year}`;
  return convertedDate;
}
