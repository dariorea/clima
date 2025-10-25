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
        nameCity.textContent = data.name;
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
        viento.textContent =`viento: ${data.wind.deg} m/s`;
        const humedad = document.createElement("p")
        humedad.textContent = `humedad: ${data.main.humidity}%`;
        card.append(nameCity, icono, temperatura, descripcion, viento, humedad)
        climaDiv.appendChild(card)
    //  climaDiv.innerHTML = `
    //    <div class="card">
    //      <h2>${data.name}, ${data.pais}</h2>
    //      <img src="https://openweathermap.org/img/wn/${data.icono}@2x.png" alt="${data.descripcion}">
    //      <p>🌡️ ${data.main.temp}°C</p>
    //      <p>☁️ ${data.weather.description?.[0]}</p>
    //      <p>💨 Viento: ${data.wind.deg} m/s</p>
    //      <p>💧 Humedad: ${data.main.humidity}%</p>
    //    </div>
    //  `;
    } else {
      climaDiv.innerHTML = `<p>Error: ${data.mensaje || "No se pudo obtener el clima."}</p>`;
    }
  } catch (error) {
    console.error(error);
    climaDiv.innerHTML = "<p>❌ Error de conexión con el servidor.</p>";
  }
});
