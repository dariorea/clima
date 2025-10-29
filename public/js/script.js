import { baseUrl } from "./config.js";

const form = document.getElementById("form-clima");
const input = document.getElementById("ciudad");
const climaDiv = document.getElementById("clima");

form.addEventListener("submit", async (e) => {
	e.preventDefault();

	const ciudad = input.value.trim();
	if (!ciudad) {
		climaDiv.innerHTML = "<p>⚠️ Ingresá una ciudad.</p>";
		return;
	}
	try {
    const res = await fetch(`${baseUrl}/clima?ciudad=${encodeURIComponent(ciudad)}&pais=AR`);
    const data = await res.json();

    if (res.ok) {
        console.log(data)
        climaDiv.textContent = "";
        const card = document.createElement("div")
        card.classList.add("card")
        const nameCity = document.createElement("h2")
		nameCity.textContent =`${data.name}, ${data.sys.country}`;
        const icono = document.createElement("img")
        //icono.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather.icon}@2x.png" alt="${data.name}">`
        const temperatura = document.createElement("p")
        temperatura.textContent = `${data.main.temp}°C`;
        const descripcion = document.createElement("p")
        data.weather.forEach(element => {
            descripcion.textContent = `☁️ ${element.description}`;
            icono.src = `https://openweathermap.org/img/wn/${element.icon}.png`
        });
        const viento = document.createElement("p")
        viento.textContent =`viento: ${data.wind.speed} m/s`;
        const humedad = document.createElement("p")
        humedad.textContent = `humedad: ${data.main.humidity}%`;
        card.append(nameCity, icono, temperatura, descripcion, viento, humedad)
        climaDiv.appendChild(card)
    } else {
		climaDiv.innerHTML = `<p>Error: ${data.mensaje || "No se pudo obtener el clima."}</p>`;
    }
	} catch (error) {
		console.error(error);
		climaDiv.innerHTML = "<p>❌ Error de conexión con el servidor.</p>";
	}
});
