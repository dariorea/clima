import { baseUrl } from "./config.js";
import { obtenerFecha, obtenerPronostico, obtenerPronosticoActual } from "./funciones.js";

const climaDiv = document.getElementById("columnaUno");
const pronosticoDiv = document.getElementById("pronostico")

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(
		async (position) => {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			try {
				obtenerPronosticoActual(lat, lon, climaDiv)
				obtenerPronostico(lat, lon, pronosticoDiv)
			} catch (err) {
				climaDiv.textContent = "Error al obtener el clima.";
				console.error(err);
			}
		},
		(err) => {
			climaDiv.textContent = "No pudimos obtener tu ubicación.";
			console.error(err);
		}
	);
} else {
	climaDiv.textContent = "Tu navegador no soporta geolocalización.";
}
obtenerFecha()