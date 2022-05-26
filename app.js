const btn = document.querySelector('[data-weather="submit"]')
const input = document.querySelector('[data-weather="text"]')
const display = document.querySelector('[data-weather="display"]')
const rainThreshold = 0.5;
const moderateRainThreshold = 4;
const heavyRainThreshold = 8;
const sunnyThreshold = 25;
let panel;
let temp;
let icon;
let summary;


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
		'X-RapidAPI-Key': '853243696amsha8a2c9da46b622ep1de6dcjsnd8eb86fe7ffd'
	}
};

function getInputValue(){
  return input.value;
}
function cleanElements(){
  return "";
}
function createPageElements(){
  //creates elements
  panel = document.createElement('div');
  temp = document.createElement('div');
  icon = document.createElement("div");  
  summary = document.createElement('div'); 
  //appends them to parent div
  display.appendChild(panel);  
  display.appendChild(icon);  
  display.appendChild(temp);
  display.appendChild(summary);
  //adds styling
  panel.classList.add('weather-panel');
  icon.classList.add('weather-icon');
  temp.classList.add("weather-temp");
  summary.classList.add("weather-summary");
  return;
}

function addContent(response){
  panel.innerHTML ="<p>" + response.location.name + "</p>";
  if(response.current.precip_mm >= rainThreshold){
    icon.innerHTML = "<img src='./images/rain.png'>";
    if(response.current.precip_mm>= rainThreshold && response.current.precip_mm < moderateRainThreshold){
      summary.innerHTML = "<p>Light Rain</p>"
    }
    else if (response.current.precip_mm>= moderateRainThreshold && response.current.precip_mm < heavyRainThreshold){
      summary.innerHTML = "<p>Moderate Rain</p>"
    }
    else{
      summary.innerHTML = "<p>Heavy Rain</p>"
    }
    
  }
  else if (response.current.cloud > sunnyThreshold && response.current.precip_mm < rainThreshold){
    icon.innerHTML = "<img src='./images/cloud.png'>";
    summary.innerHTML = "<p>cloudy</p>"
  }
  else{
    icon.innerHTML = "<img src='./images/sun.png'>";
    summary.innerHTML = "<p>Sunny</p>"
  }
  temp.innerHTML = "<p>"+ response.current.temp_c + "°C </p>";
}

btn.addEventListener('click',() =>{

  //fetches the data from the API
  fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + getInputValue(), options)
  .then(response => response.json())
  .then(response => { 
    //cleans the HTML of the display Element
    display.innerHTML = cleanElements();
    //creates the divs
    createPageElements();
    addContent(response);
    //sets up the top div with the name of the city
  })
  //catches errors in the request
  .catch(err => console.error(err));
} )

