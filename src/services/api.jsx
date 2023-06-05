import axios from "axios";

const app_id = "b34110913f1942c982de2cce0d2448c7";
const baseURL = "https://openexchangerates.org/api";

export const getLatest = () => {
  return axios.get(`${baseURL}/latest.json`, {
    params: {
      app_id: app_id,
    },
  });
};

export const updateCurrency = (base,symbols) =>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formatted = `${year}-${month}-${day}`;
    console.log(formatted)
    return axios.get(`${baseURL}/historical/${formatted}.json`, {
        params: {
          app_id: app_id,
          base: base,
          symbols: symbols
        },
      });
}