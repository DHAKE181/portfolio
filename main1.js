import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

camera.position.set(4, 5, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const loader = new GLTFLoader().setPath('assets/');
loader.load('scene.gltf', (gltf) => {
    const mesh = gltf.scene;
    
    // Load and apply the texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('path_to_texture.jpg', (texture) => {
        // Create a material with the loaded texture
        const material = new THREE.MeshBasicMaterial({ map: texture });

        // Apply the material to your model
        mesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });

        scene.add(mesh);
    });
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
