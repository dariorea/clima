import { baseUrl } from "./config.js";

export const obtenerPronostico = async (lat, lon) => {
    const response = await fetch(`${baseUrl}/clima/pronostico?lat=${lat}&lon=${lon}`)
    const data = await response.json()
    console.log("pronostico: ", data)
}
export const obtenerPronosticoActual = async (lat, lon) => {
    const res = await fetch(`${baseUrl}/clima?lat=${lat}&lon=${lon}`)
    const data = await res.json()
    console.log("clima", data)
}