// Importing necessary modules from Three.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Creating a new scene
const scene = new THREE.Scene();

// Setting up the camera
const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, 1, 1000);

// Setting up the renderer with a dark clear color
const renderer = new THREE.WebGLRenderer({alpha:true, antialias: true});
renderer.setClearColor(0x000000); // Set clear color to black for a dark background
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Adding the renderer to the HTML document
document.body.appendChild(renderer.domElement);

// Positioning the camera
camera.position.set(1, 3, 2);

// Adding ambient light to the scene
const hlight = new THREE.AmbientLight(0x5A5A5A, 1);
scene.add(hlight);

// Adding directional light to the scene
const directional_Light = new THREE.DirectionalLight(0xffffff,1);
directional_Light.position.set(0,1,0);
directional_Light.castShadow = false;
scene.add(directional_Light);

// Adding hemisphere light to the scene
const light34 = new THREE.HemisphereLight( 0xfffffb, 0x080820, 0.8 );
light34.position.set(3,2,1);
scene.add(light34);

// Setting up the controls for the camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 1;
controls.maxDistance = 50;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 2.5;
controls.autoRotate = true;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

// Loading a 3D model using GLTFLoader
const loader = new GLTFLoader().setPath('models/');
loader.load('screw_jack.gltf', (gltf) => {
    const mesh = gltf.scene;
    mesh.position.set(0.2, 0.5, 0.5);
    scene.add(mesh);

    // Adjust the camera to center the model
    const box = new THREE.Box3().setFromObject(mesh);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());
    controls.maxDistance = size * 10;
    const minPan = new THREE.Vector3(center.x - size / 2, center.y - size / 2, center.z - size / 2);
    const maxPan = new THREE.Vector3(center.x + size / 2, center.y + size / 2, center.z + size / 2);
    controls.minPan = minPan;
    controls.maxPan = maxPan;
    camera.near = size / 100;
    camera.far = size * 100;
    camera.updateProjectionMatrix();
    camera.position.copy(center);
    camera.position.x += size / 2.0;
    camera.position.y += size / 5.0;
    camera.position.z += size / 2.0;
    camera.lookAt(center);
});

// Animation function
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Starting the animation
animate();
