import './style.css'
import axios from 'axios'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight)
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') })

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

const floorColor = 0x526082
const bulbColor = 0xFEF747

// add background color #242424

scene.background = new THREE.Color(0x242424)

camera.position.set(16.983774549829118, 2.426112775447004, 16.08843220654572)

renderer.render(scene, camera)

// create light
const pointLight = new THREE.PointLight(0xffffff, 500)
const pointLight2 = new THREE.PointLight(0xffffff, 500)
const pointLight3 = new THREE.PointLight(0xffffff, 300)
const pointLight4 = new THREE.PointLight(0xffffff, 300)
const ambientLight = new THREE.AmbientLight(0xffffff)

pointLight4.position.set(-15, 8, 16)
pointLight3.position.set(15, 8, -16)
pointLight2.position.set(-15, -8, -16)
pointLight.position.set(10, 10, 15)
scene.add(pointLight4)
scene.add(pointLight3)
scene.add(pointLight2)
scene.add(pointLight)



// create helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const lightHelper2 = new THREE.PointLightHelper(pointLight2)
const lightHelper3 = new THREE.PointLightHelper(pointLight3)
const lightHelper4 = new THREE.PointLightHelper(pointLight4)
const gridHelper = new THREE.GridHelper(200, 50)
gridHelper.position.y = -10

// create a control
const controls = new OrbitControls(camera, renderer.domElement)

// create a FLOOR of color #646cff
const geometry = new THREE.BoxGeometry(25, 1, 25)
const material = new THREE.MeshStandardMaterial({ color: floorColor })
const floor = new THREE.Mesh(geometry, material)

scene.add(floor)

floor.position.set(0, -10, 0)


// Create light bulb
const lightBulb = new THREE.PointLight(0xFFFEE8, 700)
const lb2 = new THREE.PointLight(0xFFFEE8, 500)

lightBulb.position.set(0, -3, 0)

lb2.position.set(0, 3, 0)

// lightbulb helper
const lightBulbHelper = new THREE.PointLightHelper(lightBulb);
//scene.add(lightHelper, gridHelper, lightHelper2, lightHelper3, lightHelper4)



let intensity = 700;
const group = new THREE.Group();
//main bulb
var bulbGeometry = new THREE.SphereGeometry(1, 32, 32);
var bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);
var bulbMat = new THREE.MeshStandardMaterial({
  emissive: 0xffffee,
  emissiveIntensity: intensity,
  color: 0xffffee,
  roughness: 1
});

bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
bulbLight.position.set(0, 2, 0);
bulbLight.castShadow = true;

var d = 200;

bulbLight.shadow.camera.left = -d;
bulbLight.shadow.camera.right = d;
bulbLight.shadow.camera.top = d;
bulbLight.shadow.camera.bottom = -d;

bulbLight.shadow.camera.far = 100;

// bulb off 
var bulbLightoff = new THREE.PointLight(0x000000, 1, 100, 2);
var bulbMatoff = new THREE.MeshStandardMaterial({
  emissive: 0xffffee,
  emissiveIntensity: 0,
  color: 0xffffee,
  roughness: 1
});

bulbLightoff.add(new THREE.Mesh(bulbGeometry, bulbMatoff));
bulbLightoff.position.set(0, 2, 0);
bulbLightoff.castShadow = true;

//stem light
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

//stem off
var bulbStemoff = new THREE.CylinderGeometry(0.5, 0.65, 0.55, 32);
var stemMatoff = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0xffffee,
  emissiveIntensity: 0,
  metalness: 0.8,
  roughness: 0
});

var bStemoff = new THREE.Mesh(bulbStemoff, stemMatoff);
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
  group.add(ring);

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
group.add(bulbLight);
group.add(plug);
group.add(plugTop);
group.add(botRing);
group.add(topRing);

scene.add(group);
group.position.y = 0;
group.position.z = 0;
group.position.x = 0;
group.rotation.x = Math.PI;

group.position.set(0, -4, 0)



animate()
function animate() {
  requestAnimationFrame(animate)

  controls.update()

  // camera fixing bulb
  camera.lookAt(group.position)
  // floor rotation
  floor.rotation.y += 0.005

  renderer.render(scene, camera)

}

// Add click event listener
window.addEventListener('click', onClick, false);
// Toggle light function
let lightOn = false;
function toggleLight() {
  lightOn = !lightOn;
  if (lightOn) {
    // Turn off light
    group.remove(bStem);
    group.remove(bulbLight);
    scene.remove(lightBulb)
    group.add(bStemoff);
    group.add(bulbLightoff);
    OFF()
  } else {
    // Turn on light
    group.add(bStem);
    scene.add(lightBulb)

    group.remove(bStemoff);
    group.remove(bulbLightoff);
    group.add(bulbLight);
    ON()
  }
}
// Function to handle click events
function onClick(event) {
  toggleLight();
  event.preventDefault();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0 && intersects[0].object === group) {
    console.log('Light bulb clicked');
    toggleLight();
  }
}

/*controls.addEventListener( "change", event => {  
  console.log( controls.object.position ); 
} )*/


const URL = "http://192.168.0.1"
const ON = async () => {
  await axios.get(`${URL}/on`)
}
const OFF = async () => {
  await axios.get(`${URL}/off`)
}
