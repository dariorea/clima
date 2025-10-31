import { baseUrl } from "./config.js";

export const obtenerPronostico = async (lat, lon, pronosticoDiv) => {
    const response = await fetch(`${baseUrl}/clima/pronostico?lat=${lat}&lon=${lon}`)
    const data = await response.json()
    console.log("pronostico: ", data)

    data.list.forEach(element => {

        const fecha = new Date(element.dt_txt);
        const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const dia = dias[fecha.getDay()];
        // Formatea la hora en formato 24hs (ej: 21:00)
        const hora = fecha.toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
        const fechaHora = document.createElement("p")
        fechaHora.textContent = `${dia} ${hora}`;
        fechaHora.classList.add("fecha")

        const icon = document.createElement("img")
        element.weather.forEach(item => {
            icon.src = `https://openweathermap.org/img/wn/${item.icon}.png`
        })
        
        const temperatura = document.createElement("h3")

        temperatura.textContent = `${element.main.temp_max.toFixed(0)}° ${element.main.temp_min.toFixed(0)}°`;

        const card = document.createElement("div")
        card.classList.add("card-forest")
        card.append(fechaHora, icon, temperatura)
        pronosticoDiv.appendChild(card)
    })
}




export const obtenerPronosticoActual = async (lat, lon, climaDiv) => {
    const res = await fetch(`${baseUrl}/clima/get?lat=${lat}&lon=${lon}`)
    const data = await res.json()
    console.log("clima :", data)

    try {
        climaDiv.textContent = "";
        const card = document.createElement("div")
        card.classList.add("card")
        const nameCity = document.createElement("h2")
        nameCity.textContent = `${data.name}, ${data.sys.country}`;

        const divIconTemp = document.createElement("div")
        divIconTemp.classList.add("icontemp")
        const icono = document.createElement("img")
        const temperaturaRedondeada = data.main.temp.toFixed(0);

        const temperatura = document.createElement("h3")
        temperatura.textContent = `${temperaturaRedondeada}°C`;

        const descripcion = document.createElement("p")
        data.weather.forEach(element => {
        descripcion.textContent = `☁️ ${element.description}`;
        icono.src = `https://openweathermap.org/img/wn/${element.icon}.png`
    });
    const velocidadMS = data.wind.speed; // Por ejemplo, 8.22 m/s
    const velocidadKMH = (velocidadMS * 3.6).toFixed(0); // 👉 29.6 km/h

    const viento = document.createElement("p")
    viento.textContent =`viento: ${velocidadKMH} km/h`;
    const humedad = document.createElement("p")
    humedad.textContent = `humedad: ${data.main.humidity}%`;
	divIconTemp.append(icono, temperatura)
    card.append(nameCity, divIconTemp, descripcion, viento, humedad)
    climaDiv.appendChild(card)
    } catch (error) {
        
    }

    
}


export const obtenerFecha = () => {
    const dateDiv = document.getElementById("date")
    const fecha = new Date()
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const dia = dias[fecha.getDay()];
    const numero = fecha.getDate()
    const hora = fecha.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    //const minutos = fecha.getMinutes()
    console.log(`${dia} ${numero}, ${hora}`)
    const fechaText = document.createElement("p")
    fechaText.textContent = `${dia} ${numero}, ${hora}`
    dateDiv.appendChild(fechaText)

}