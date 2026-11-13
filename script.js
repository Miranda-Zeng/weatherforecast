let bkgMusic = document.getElementById("musik");
bkgMusic.volume = 0.3;
document.addEventListener("click",function(){
  bkgMusic.play(); 
},{once:true});

async function visualize() { 
  // console.log(locale.value); 
  const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + locale.value
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    // console.log(result.days[0].icon);
    // info.innerHTML = "the weather in " + locale.value + " is " + result.days[0].icon + ", " + result.days[0].temp + "°F"
    document.getElementById("subtitle").textContent = "THE WEATHER IN";
    document.getElementById("city").textContent = locale.value;
    document.getElementById("temperature").textContent = result.days[0].temp + "°F";
    document.getElementById("conditions").textContent = result.days[0].conditions;
    document.getElementById("date").textContent = result.days[0].datetime;

    speakWeather(locale.value,result.days[0].temp, result.days[0].conditions);
    let weather = result.days[0].icon;
    let emoji = "";
    if (weather === "snow"){
      emoji="❄️";
    }else if (weather === "rain"){
      emoji="☔";
    }else if (weather === "clear-day"){
      emoji="☀️";
    }else if(weather === "clear-night"){
      emoji="🌙";
    }else if(weather === "cloudy"){
      emoji="☁️";
    }else if(weather === "partly-cloudy-day"){
      emoji="⛅";
    }else if(weather === "partly-cloudy-night"){
      emoji="☁️";
    }else if(weather === "fog"){
      emoji="🌫️";
    }else if(weather === "wind"){
      emoji="🍃";
    }

    weatherEmojis.innerHTML = "";
    for (i=0;i<30;i++){
      let weatherEmoji = document.createElement("div")
      weatherEmoji.textContent = emoji;
      weatherEmoji.className = "weather-emoji";
      weatherEmoji.style.left = Math.random() * 100 + "vw";
      weatherEmoji.style.animationDuration =  3 + Math.random() * 5 + "s";
      weatherEmoji.style.animationDelay = -Math.random() * 8 + "s";
      weatherEmojis.appendChild(weatherEmoji);
    }
    console.log(weatherEmojis);  

    if (result.days[0].temp < 60) {
      document.body.style.backgroundColor = "#C6D8D4"
    }
    else {
      document.body.style.backgroundColor = "#F9C784"
    }
  } catch (error) {
    console.error(error.message);
  }
}

function speakWeather(city, temperature, conditions){
  let message = new SpeechSynthesisUtterance("The weather in " + city + " is " + conditions + ". The temperature is "+ temperature +" degrees Fahrenheit.");
  message.lang = "en-US";
  message.rate=0.9;

  speechSynthesis.cancel();
  speechSynthesis.speak(message);
}

function stop(){
  locale.value ="";
  weatherEmojis.innerHTML = "";
  speechSynthesis.cancel();
  bkgMusic.pause(); 
  document.getElementById("subtitle").textContent = "";
  document.getElementById("city").textContent = "";
  document.getElementById("temperature").textContent = "";
  document.getElementById("conditions").textContent ="";
}






