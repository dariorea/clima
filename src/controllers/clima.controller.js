import axios from "axios";

const KEY = "3a8608d869f10a9e12921db9013a7dc2";

//export const getClima = async (req, res) => {
//  try {
//    // Permite que la ciudad venga por query, o usa un valor por defecto
//    const ciudad = req.query.ciudad || "Buenos Aires";
//    const pais = req.query.pais || "AR";
//
//    // URL con unidades y idioma configurados
//    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${KEY}&units=metric&lang=es`;
//    const result = await axios.get(url);
//    const data = result.data;
//
//    // Respuesta más limpia y manejable para el frontend
//    res.json(data);
//  } catch (error) {
//    console.error("❌ Error al obtener el clima:", error.response?.data || error.message);
//
//    res.status(500).json({
//      mensaje: "Error al hacer la llamada a OpenWeatherMap",
//      error: error.response?.data || error.message,
//    });
//  }
//};

export const weatherLocal = async (req, res) => {
	try {
		const lat = req.query.lat;
		const lon = req.query.lon;

		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric&lang=es`
		const result = await axios.get(`${url}`)
		const data = result.data
		res.json(data)
	} catch (error) {
		res.status(500).json({mensaje: "error al buscar las coordenadas", error: error})
	}
}

export const getPronostico = async (req, res) => {
  try {
	const lat = req.query.lat;
	const lon = req.query.lon;

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric&lang=es`;

    const result = await axios.get(`${url}`);
    const data = result.data;
    res.json(data);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      mensaje: "Error al obtener pronóstico del clima",
      error: error.message,
    });
  }
};