import { APIKEY } from "/js/apikey.js";
const URL = ""
const searchBtn = document.getElementById("search-btn");
const container = document.getElementById("container");
const toastContainer = document.getElementById("toast-container");
const searchInput = document.getElementById("search-query");
let searchQuery;
let toast;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(convertCoords);
} else {
  x.innerHTML = "Geolocation is not supported by this browser.";
}

function convertCoords(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      searchInput.value = data.locality;
    })
    .catch();
}

searchBtn.addEventListener("click", () => {
  searchQuery = searchInput.value;
  console.log(searchQuery)
  if (searchQuery === "") {
    createInfoToast();
  } else {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${searchQuery}&aqi=no`)
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
      <h1 class="text-center font-bold text-2xl">${location}</h1>
      <p class="text-center font-semibold">${weather}</p>
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
  <div class='toast absolute top-3 right-3 w-[15rem] flex align-center justify-around cursor-pointer transition ease-in-out duration-300 bg-white border-l-8 rounded-lg border-yellow-300 px-3 py-3'>
    <i class='bi bi-info-circle-fill inline text-xl text-yellow-300'></i>
    <p class='inline font-semibold self-center text-lg'>Cannot find the city</p>
  </div>`;
  toast = document.getElementsByClassName("toast");
  toast = Array.from(toast);
  setTimeout(() => {
    removeToast();
  }, 3000);
}

toastContainer.addEventListener("click", () => {
  console.log("toast clicked");
  removeToast();
});

function removeToast() {
  toast.forEach((element) => {
    element.style.right = "-400px";
    setTimeout(() => {
    console.log(element)
      element.remove();
    }, 1000);
  });
}