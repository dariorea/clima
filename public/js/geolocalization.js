import { baseUrl } from "./config.js";
import { obtenerPronostico, obtenerPronosticoActual } from "./funciones.js";

const climaDiv = document.getElementById("clima");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

		try {
        //const res = await fetch(`${baseUrl}/clima?lat=${lat}&lon=${lon}`);
        //const data = await res.json();


        //console.log(data)
        //climaDiv.textContent = "";
        //const card = document.createElement("div")
        //card.classList.add("card")
        //const nameCity = document.createElement("h2")
        //nameCity.textContent = `${data.name}, ${data.sys.country}`;

		//const divIconTemp = document.createElement("div")
		//divIconTemp.classList.add("icontemp")
        //const icono = document.createElement("img")
        //const temperaturaRedondeada = data.main.temp.toFixed(0);
//
        //const temperatura = document.createElement("h3")
        //temperatura.textContent = `${temperaturaRedondeada}°C`;
		
        //const descripcion = document.createElement("p")
        //data.weather.forEach(element => {
        //    descripcion.textContent = `☁️ ${element.description}`;
        //    icono.src = `https://openweathermap.org/img/wn/${element.icon}.png`
        //});
        //const velocidadMS = data.wind.speed; // Por ejemplo, 8.22 m/s
        //const velocidadKMH = (velocidadMS * 3.6).toFixed(0); // 👉 29.6 km/h
//
        //const viento = document.createElement("p")
        //viento.textContent =`viento: ${velocidadKMH} km/h`;
        //const humedad = document.createElement("p")
        //humedad.textContent = `humedad: ${data.main.humidity}%`;
		//divIconTemp.append(icono, temperatura)
        //card.append(nameCity, divIconTemp, descripcion, viento, humedad)
        //climaDiv.appendChild(card)
		
		obtenerPronosticoActual(lat, lon)
		obtenerPronostico(lat, lon)
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
