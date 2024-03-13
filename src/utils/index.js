export function logOut(setToken, setUser, navigate) {
  setToken(null);
  setUser("");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
}

export function dateConverterToString(date) {
  const dateObject = new Date(date);
  const day = dateObject.getUTCDate();
  const month = dateObject.getUTCMonth() + 1;
  const year = dateObject.getUTCFullYear();
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const convertedDate = `${formattedDay}/${formattedMonth}/${year}`;
  console.log("convertedDate: ", convertedDate);
  return convertedDate;
}

export function convertToISOString(date) {
  const dateObject = new Date(date).toISOString();
  return dateObject;
}
