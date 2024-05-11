import axios from 'axios'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import Logo.png
import Logo from '/Logo.png'

// dark white
const WallColor = 0xeeeeee
// dark gray
const bgColor = 0x444444


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight)
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') })

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

scene.background = new THREE.Color(bgColor)
renderer.render(scene, camera)

function createWalls() {
  // construct house with only 3 walls front left and bottom 
  // front wall
  const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(10, 5, 0.1),
    new THREE.MeshStandardMaterial({ color: WallColor })
  )
  frontWall.position.set(0, 0, -5)
  scene.add(frontWall)

  // left wall
  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 5, 10),
    new THREE.MeshStandardMaterial({ color: WallColor })
  )
  leftWall.position.set(-5, 0, 0)
  scene.add(leftWall)

  // the bottom wall with Logo.png on his face
  const bottomWall = new THREE.Mesh(
    new THREE.BoxGeometry(10, 0.1, 10),
    new THREE.MeshStandardMaterial({ color: WallColor })
  )
  bottomWall.position.set(0, -2.5, 0)
  scene.add(bottomWall)

  // add logo to the bottom wall
  const loader = new THREE.TextureLoader()
  loader.load(Logo, (texture) => {
    const logo = new THREE.Mesh(
      new THREE.BoxGeometry(4, 4, 0.01),
      new THREE.MeshStandardMaterial({ map: texture  })
    )
    logo.position.set(0, -2.4, 0)
    logo.rotation.x = Math.PI/2
    logo.rotation.z = Math.PI/4 + Math.PI/2
    scene.add(logo)
  })
  

  // make a group for the walls
  const walls = new THREE.Group()
  walls.add(frontWall)
  walls.add(leftWall)
  walls.add(bottomWall)
  scene.add(walls)

  return walls
}

function createFishTank() {
  // construct fish tank
  // the inside of the fish tank is empty and the wall is transparent
  const fishTank = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 1, 5, 32, 32, true, 0, Math.PI * 2),
    new THREE.MeshStandardMaterial({ color: 0x68D4F6, transparent: true, opacity: 0.5 })
  )
  fishTank.position.set(-3, 0, -3)
  scene.add(fishTank)
  return fishTank
}

const fishTank = createFishTank()


let intensity = 700;
const group = new THREE.Group();
//MAIN bulb
var bulbGeometry = new THREE.SphereGeometry(1, 32, 32);
var mainBulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);
var bulbMat = new THREE.MeshStandardMaterial({
  emissive: 0xffffee,
  emissiveIntensity: intensity,
  color: 0xffffee,
  roughness: 1
});
mainBulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
mainBulbLight.position.set(0, 2, 0);
mainBulbLight.castShadow = true;
var d = 200;
mainBulbLight.shadow.camera.left = -d;
mainBulbLight.shadow.camera.right = d;
mainBulbLight.shadow.camera.top = d;
mainBulbLight.shadow.camera.bottom = -d;
mainBulbLight.shadow.camera.far = 100;

// MAIN bulb off 
var mainBulbLightOff = new THREE.PointLight(0x000000, 1, 100, 2);
var bulbMatoff = new THREE.MeshStandardMaterial({
  emissive: 0xffffee,
  emissiveIntensity: 0,
  color: 0xffffee,
  roughness: 1
});

mainBulbLightOff.add(new THREE.Mesh(bulbGeometry, bulbMatoff));
mainBulbLightOff.position.set(0, 2, 0);
mainBulbLightOff.castShadow = true;


//STEM light
var bulbStem = new THREE.CylinderGeometry(0.5, 0.65, 0.55, 32);
var stemMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0xffffee,
  emissiveIntensity: intensity,
  metalness: 0.8,
  roughness: 0
});

var bStem = new THREE.Mesh(bulbStem, stemMat);
bStem.position.set(0, 2.9, 0);
bStem.castShadow = true;
bStem.receiveShadow = true;

//STEM off
var bulbStemOff = new THREE.CylinderGeometry(0.5, 0.65, 0.55, 32);
var stemMatoff = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0xffffee,
  emissiveIntensity: 0,
  metalness: 0.8,
  roughness: 0
});

var bStemoff = new THREE.Mesh(bulbStemOff, stemMatoff);
bStemoff.position.set(0, 2.9, 0);
bStemoff.castShadow = true;
bStemoff.receiveShadow = true;

//plug main
var bulbPlug = new THREE.CylinderGeometry(0.52, 0.52, 1.2, 32);

var plugMat = new THREE.MeshStandardMaterial({
  color: 0x807d7a
});

var plug = new THREE.Mesh(bulbPlug, plugMat);
plug.position.set(0, 3.2, 0);
plug.receiveShadow = true;
plug.castShadow = true;

//plug top
var topGeo = new THREE.CylinderGeometry(0.25, 0.3, 0.2, 32);

var topMat = new THREE.MeshStandardMaterial({
  color: 0xe8d905
});
var plugTop = new THREE.Mesh(topGeo, topMat);
plugTop.position.set(0, 3.75, 0);
plugTop.receiveShadow = true;
plugTop.castShadow = true;

//plug rings
var ringGeo = new THREE.TorusGeometry(0.52, 0.04, 4, 100);

var ringMat = new THREE.MeshStandardMaterial({
  color: 0x807d7a
});

var ringY = 3.33;
for (let i = 0; i < 3; i++) {
  var ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(0, ringY, 0);
 

  ringY += 0.15;
}

//top ring
var topRingGeo = new THREE.TorusGeometry(0.49, 0.05, 16, 100)
var topRing = new THREE.Mesh(topRingGeo, ringMat);
topRing.position.set(0, 3.75, 0);
topRing.rotation.x = -Math.PI / 2;

//bottom ring
var botRingGeo = new THREE.TorusGeometry(0.5, 0.05, 16, 100);

var botRing = new THREE.Mesh(botRingGeo, ringMat);
botRing.position.set(0, 3.15, 0);
botRing.rotation.x = -Math.PI / 2;

//add to group
group.add(bStem);
group.add(mainBulbLight);
group.add(plug);
group.add(plugTop);
group.add(botRing);
group.add(topRing);

scene.add(group);
group.position.y = 0;
group.position.z = 0;
group.position.x = 0;
group.rotation.x = Math.PI;

group.position.set(-3, 3, -3)

// add light in the bulb
const mainLight = new THREE.PointLight(0xfffeee, 20)
mainLight.position.set(0, 2, 0)
group.add(mainLight)






const walls = createWalls()

// add light
const pointLight = new THREE.PointLight(0xfeeeee, 10)
pointLight.position.set(10, 0, 10)
scene.add(pointLight)

// add light helper
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)

// add camera
/*


x: 3.743556853301611
​
y: 0.9588741169457655
​
z: 7.007768853103948

_x: -0.41313078839130307
​
_y: 0.49122211833755136
​
_z: 0.20390178972904482
​
isEuler: true
*/
camera.position.set(3.829301405919178, 0.7089849450928973, 7.107016487707217)
camera.rotation.set(-0.41313078839130307, 0.49122211833755136, 0.20390178972904482)
// add controls
const controls = new OrbitControls(camera, renderer.domElement)

const groupPos = group.position

animate()
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)

  const t = Date.now() * 0.001
  group.position.y = groupPos.y + Math.sin(t) * 0.005
  
  //console.log(camera.position, camera.rotation)

   
}


window.addEventListener('click', onClick, false);

// Toggle light function
let lightOn = true;
// get checkbox id="switch" 
const switchButton = document.getElementById('switch')
switchButton.checked = lightOn
function toggleLight() {
  // checkbox switchButton
  switchButton.checked = !lightOn
  lightOn = !lightOn;
  if (lightOn) {
    // Turn off light
    group.remove(mainBulbLight);
    group.remove(bStem);
    group.add(mainBulbLightOff);
    group.add(bStemoff);
    group.remove(mainLight);
    OFF()

  } else {
    // Turn on light
    group.remove(mainBulbLightOff);
    group.remove(bStemoff);
    group.add(mainBulbLight);
    group.add(bStem);
    group.add(mainLight);
    ON()
  }
}
// Function to handle click events
function onClick(event) {
  event.preventDefault();
  toggleLight();
}

const URL = "http://192.168.0.1"
const ON = async () => {
  await axios.get(`${URL}/on`)
}
const OFF = async () => {
  await axios.get(`${URL}/off`)
}