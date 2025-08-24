const publicApis = ["https://pokeapi.co/api/v2/pokemon"];

const AddUrl = (url) => {
  if (publicApis.length >= 20) return;
  publicApis.push(url);
};

async function getDogImage() {
  const output = document.querySelector("#dog-output");
  const url = "https://dog.ceo/api/breeds/image/random";
  const img = document.createElement("img");
  const req = await fetch(url);

  AddUrl(url);
  output.innerHTML = "";

  await req.json().then((res) => (img.src = res.message));
  output.appendChild(img);
}

async function getCatImage() {
  const output = document.querySelector("#cat-output");
  const img = document.createElement("img");
  const url = "https://cataas.com/cat";

  AddUrl(url);
  output.innerHTML = "";

  await fetch(url).then((res) => (img.src = res.url));
  output.appendChild(img);
}

async function getWeather() {
  const output = document.querySelector("#weather-output");
  const p = document.createElement("p");
  const apiKey = "AIzaSyBOTYvNoagYk-LwMPGzGdpFIBjjnyRdBvA";

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = await position.coords.latitude;
        const longitude = await position.coords.longitude;
        const weatherUrl = `https://weather.googleapis.com/v1/forecast/days:lookup?key=${apiKey}&location.latitude=${latitude}&location.longitude=${longitude}`;

        const req = await fetch(weatherUrl);
        const json = await req.json();

        const minHeatF = json.forecastDays[0].minTemperature.degrees;
        const maxHeatF = json.forecastDays[0].maxTemperature.degrees;

        const minHeat = document.createElement("p");
        const maxHeat = document.createElement("p");

        minHeat.innerText = "minHeat: " + Math.floor(minHeatF * 1.8 + 32);
        maxHeat.innerText = "maxHeat: " + Math.floor(maxHeatF * 1.8 + 32);

        AddUrl(weatherUrl);
        output.innerHTML = "";
        p.innerText = "Your location's temperatures";

        output.appendChild(p);
        output.appendChild(minHeat);
        output.appendChild(maxHeat);
      },
      (error) => {
        console.error(`Error: ${error.message}`);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

async function getExchangeRates() {
  const output = document.querySelector("#currency-output");
  const coreFour = ["usd", "gbp", "aud", "cad"];

  const currUrl =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
  const priceUrl =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/btc.json";

  const req = await fetch(currUrl);
  const request = await fetch(priceUrl);

  const curr = await req.json();
  const prices = await request.json();

  AddUrl(currUrl);
  AddUrl(priceUrl);
  output.innerHTML = "";

  for (let price of coreFour) {
    const p = document.createElement("p");
    p.innerText += curr[`${price}`] + " : " + prices.btc[`${price}`];
    output.appendChild(p);
  }
}

async function getMovies() {
  const output = document.querySelector("#movies-output");
  const apiKey = "Ytvl7qI1OKhcH66KqOdVnC2K2cHUbWOvcuFqMnfR";
  const url = `https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}`;

  const res = await fetch(url);
  const json = await res.json();

  AddUrl(url);
  output.innerHTML = "";

  const fourNumbers = Array(10)
    .fill(1)
    .map((num, idx) => {
      const p = document.createElement("p");
      num *= Math.floor(Math.random() * 250);

      p.innerText = idx + 1 + ": " + json.titles[num].title;
      output.appendChild(p);
    });
}

async function getGitHubUser() {
  const output = document.querySelector("#github-output");
  const url = "https://api.github.com/users/greencarlos";

  const h3 = document.createElement("h3");
  const img = document.createElement("img");
  const a = document.createElement("a");

  const res = await fetch(url);
  const profile = await res.json();

  AddUrl(url);
  output.innerHTML = "";

  h3.innerText = profile.name;
  img.src = profile.avatar_url;

  a.href = profile.html_url;
  a.innerText = "GitHub profile";

  output.appendChild(h3);
  output.appendChild(a);
  output.appendChild(img);
}

async function getJoke() {
  const output = document.querySelector("#joke-output");
  const url = "https://v2.jokeapi.dev/joke/Any";
  const setup = document.createElement("p");

  const br = document.createElement("br");
  const delivery = document.createElement("p");

  const res = await fetch(url);
  const json = await res.json();

  AddUrl(url);
  output.innerHTML = "";

  setup.innerText = json.setup ? json.setup : "";
  delivery.innerText = json.delivery ? json.delivery : json.joke;

  output.appendChild(setup);
  output.appendChild(br);
  output.appendChild(delivery);
}

async function getPublicApiInfo() {
  const output = document.querySelector("#publicapi-output");
  const a = document.createElement("a");
  const randomNum = Math.floor(Math.random() * publicApis.length);

  a.href = publicApis[randomNum];
  a.innerText = `Random Api`;
  a.setAttribute("target", "_blank");

  output.innerHTML = "";
  output.appendChild(a);
}
