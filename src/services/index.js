import _axios from "axios";

const axios = _axios.create({
  baseURL: "http://hapi.fhir.org/baseR4",
});

export const getPatients = (queryOptions) => {
  const queryString = !queryOptions || Object.keys(queryOptions) === 0
    ? ""
    : "?" + Object.keys(queryOptions)
        .map((key) => {
          return `${key}=${queryOptions[key]}`;
        })
        .join("&");

  return axios.get(`/Patient${queryString}`);
};

export const getPractitioners = () => {
  return axios.get("/Practitioner");
};
