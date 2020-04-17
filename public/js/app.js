console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const weatherFormInput = document.querySelector("input");
const weatherFormButton = document.querySelector("button");

const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = weatherFormInput.value;
  messageOne.textContent = "loading...";
  messageTwo.textContent = "";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((jsonData) => {
      if (jsonData.error) {
        messageOne.textContent = jsonData.error;
      } else {
        const {
          description,
          feelslike,
          temperature,
          probabilityRain,
        } = jsonData.forecast;
        messageOne.textContent = jsonData.location.toString();
        messageTwo.textContent = `Today's weather is ${description}.
        The temperature is ${temperature} degrees Celsius today, but it feels like ${feelslike} degrees.
        There is a ${probabilityRain}% likelihood that it will rain today`;
      }
    });
  });
});