import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Set camera position to center around the origin
camera.position.set(2, 0, 0);

// Adjust FOV for better visibility
camera.fov = 45; // You can tweak this value as needed

// Update camera aspect ratio
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

const light34 = new THREE.HemisphereLight( 0xfffffb, 0x080820, 0.8 );
light34.position.set(3,2,1);
scene.add(light34);

// Make sure the model is visible within the screen
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 1; // Minimum distance from camera to model
controls.maxDistance = 10; // Maximum distance (adjust as necessary)
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 0.9;
controls.autoRotate = true;
controls.target.set(0, 0, 0); // Set the center of rotation

// Load the 3D model
const loader = new GLTFLoader().setPath('gear_box/');
loader.load('gear_box.gltf', (gltf) => {
    const mesh = gltf.scene;
    mesh.position.set(0, 0.2, 0);
    scene.add(mesh);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
