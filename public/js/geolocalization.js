if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // ✅ Si el usuario acepta
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log("Ubicación:", lat, lon);
  
        // Llamás a tu backend o a OpenWeather con las coordenadas
        obtenerClima(lat, lon);
      },
      // ❌ Si el usuario rechaza o hay error
      (error) => {
        console.error("Error al obtener ubicación:", error);
        alert("No pudimos obtener tu ubicación. Buscá una ciudad manualmente.");
      }
    );
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
  