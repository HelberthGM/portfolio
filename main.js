
import './style.css'
import *  as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();
const camera= new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry= new THREE.TorusGeometry(10, 3, 16, 15);
const material = new THREE.MeshStandardMaterial( { color: 0x00fffd, wireframe: true , metalness: 1, roughness: 1} ); 
const torus = new THREE.Mesh( geometry, material ); 
scene.add( torus );

const pointLight = new THREE.PointLight(0xffffff,3000,100);
pointLight.position.set(15, 15, 15);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25,24,24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh( geometry, material);
    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('fondo.jpg');
scene.background = spaceTexture;

// planet
const planetTexture = new THREE.TextureLoader().load('texture.jpg');
const logTexture = new THREE.TextureLoader().load('texture0.jpg');
const planet = new THREE.Mesh(
  new THREE.SphereGeometry(5,32,32),
  new THREE.MeshStandardMaterial({
    map: planetTexture,
    normalMap: logTexture
  })
);
scene.add(planet);

planet.position.z = 30;
planet.position.setX(-10);

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  planet.rotation.x += 0.05;
  planet.rotation.y += 0.075;
  planet.rotation.z += 0.05;

  camera.position.x = t* -0.01;
  camera.position.y = t* -0.0002;
  camera.position.z = t* -0.0002;
}
document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame( animate );
  torus.rotation.x+= 0.01;
  torus.rotation.y+= 0.005;
  torus.rotation.z+= 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate()
/* js por defecto
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
*/