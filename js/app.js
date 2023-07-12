import { APIKEY } from '/js/apikey.js';

const URL = "https://api.weatherapi.com/v1/current.json?key=";
const searchBtn = document.getElementById("search-btn");
const container = document.getElementById("container");
const toastContainer = document.getElementById("toast-container");
let toast;

searchBtn.addEventListener("click", () => {
  const inputValue = document.getElementById("city-input").value;
  if (inputValue === "") {
    createInfoToast();
  } else {
    fetch(URL + APIKEY + "&q=" + inputValue + "&aqi=no")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        const location = data.location.name + ", " + data.location.country;
        const weather = data.current.condition.text;
        const icon = data.current.condition.icon;
        const temperature = data.current.temp_c;
        const humidity = data.current.humidity;
        const wind = data.current.wind_kph;

        container.innerHTML = `
    <div class="my-10 p-5 m-auto bg-slate-300 w-80 rounded-md">
      <h2 class="text-center font-bold text-2xl">${location}</h2>
      <p class="text-center">${weather}</p>
      <div class="flex justify-center">
        <img class="ml-auto inline text-center" src="${icon}" />
        <h2 class="text-center inline font-bold text-2xl mr-auto self-center">${temperature}°C</h2>
      </div>
      <p class="text-center font-semibold">Humidity:<i class="mx-2 bi bi-droplet"></i>${humidity}%</p>
      <p class="text-center font-semibold">Wind:<i class="mx-2 bi bi-wind"></i>${wind}km/h</p>
    </div>
    `;
      });
  }
});

function currentWeather(weather) {
  console.log(weather);
  return "cloudy";
}

function createInfoToast() {
  toastContainer.innerHTML = `
  <div class='toast transition-all duration-300 ease-out bg-white border-l-8 rounded-lg border-yellow-300 px-3 py-3'>
    <i class='bi bi-info-circle-fill inline text-xl text-yellow-300'></i>
    <p class='inline font-semibold'>Cannot find the city</p>
  </div>`;
  toast = document.getElementsByClassName("toast");
  toast = Array.from(toast);
  setTimeout(() => {
    removeToast();
  }, 3000);
}

toastContainer.addEventListener("click", () => {
  removeToast();
});

function removeToast() {
  toast.forEach((element) => {
    element.style.right = "-400px";
    setTimeout(() => {
      element.remove();
    }, 1000);
  });
}
