import "./LedStyle.css"
import axios from 'axios'

const switchButton = document.getElementById('switch')

switchButton.addEventListener('change', toggleLight);

let lightOn

function toggleLight() {
  // checkbox switchButton
  lightOn = !lightOn;
  if (lightOn) {
    // Turn off light
    OFF()

  } else {
    // Turn on light
    ON()
  }
}

const URL = "http://192.168.0.1"
const ON = async () => {
  await axios.get(`${URL}/on`)
}
const OFF = async () => {
  await axios.get(`${URL}/off`)
}