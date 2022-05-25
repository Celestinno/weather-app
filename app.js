const btn = document.querySelector('[data-weather="submit"]')
const input = document.querySelector('[data-weather="text"]')
const display = document.querySelector('[data-weather="display"]')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
		'X-RapidAPI-Key': '853243696amsha8a2c9da46b622ep1de6dcjsnd8eb86fe7ffd'
	}
};


btn.addEventListener('click',() =>{
  
  let cityName = input.value;
  fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + input.value, options)
  .then(response => response.json())
  .then(response => { 
    display.innerHTML = "";
    let panel = document.createElement('div');
    let temp = document.createElement('div');
    let icon = document.createElement('img');    
    display.appendChild(panel);  
    display.appendChild(icon);  
    display.appendChild(temp);
    panel.innerHTML ="<p>" + response.location.name + "</p>";
    panel.classList.add('weather-panel');
    icon.classList.add('weather-icon');
    temp.classList.add("weather-temp");
    if(response.current.precip_mm >= 0.5){
      icon.src = 'https://cdn-icons-png.flaticon.com/512/116/116251.png';
      icon.style="  width: 200px; height: 200px;"
    }
    else if (response.current.cloud > 25 && response.current.precip_mm <0.5){
      icon.src = 'https://uxwing.com/wp-content/themes/uxwing/download/27-weather/cloudy.png';
      icon.style="  width: 200px; height: 150px;"
    }
    else{
      icon.src = 'https://www.iconpacks.net/icons/2/free-sun-icon-3337-thumb.png';
      icon.style="  width: 200px; height: 200px;"
    }
    temp.innerHTML = "<p>"+ response.current.temp_c + "°C </p>";
  })
  .catch(err => console.error(err));
} )

