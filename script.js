document.querySelector(".submit").addEventListener("click", async() => {
    const city = document.querySelector("#city");
    const request = await fetch("https://api.weatherapi.com/v1/current.json?key=bdee9d5452364da3b71113739222705&q=" + city.value);
      
    if (request.status === 400) {
      city.style.border = "2px solid red";
      return;
    }
  
    document.querySelector(".box").style.display = "none";
    document.querySelector(".preview").style.display = "block";
    
    const data = await request.json();
  
    document.querySelector(".map").innerHTML = `
      <iframe width="600" height="500" src="https://maps.google.com/maps?q=${data.location.name}&z=10&output=embed" frameborder="0" scrolling="no"></iframe>
    `;
  
    document.querySelector(".weather").innerHTML = `
      <div class="condition">
        <img src="https:${data.current.condition.icon}" class="icon">
        <span>${data.current.condition.text}</span>
      </div>
      <div class="data">
        <span>${data.current.temp_c} °C</span>
        <span>Känns som: ${data.current.feelslike_c} °C</span>
        <span>UV-index: ${data.current.uv}</span>
        <span>Stad: ${data.location.name}</span>
        <span>Land: ${data.location.country}</span>
        <span>Tid just nu: ${data.location.localtime}</span>
      </div>
    `;
  
    console.log(data)
  });
  
  
  document.querySelector(".back").addEventListener("click", () => {
    document.querySelector(".box").style.display = "block";
    document.querySelector(".preview").style.display = "none";
    document.querySelector("#city").value = "";
  });