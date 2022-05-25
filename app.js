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
    display.appendChild(panel);    
    panel.innerHTML ="<p>" + response.location.name + "</p>";
    panel.classList.add('weather-panel');

  })
  .catch(err => console.error(err));
} )

