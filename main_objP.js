import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, 1, 1000);

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth,window.innerHeight);
//renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

/*const geometry = new THREE.BoxGeometry( 1, 1, 1);
const material = new THREE.MeshBasicMaterial( {color:0xffff00} );
const cube = new THREE.Mesh( geometry, material );*/
//D:\3d_model_on_web\assets2\scene.gltf
//assets2\scene.gltf
//scene.add(cube);

//camera.position.z = 5;
camera.position.set(4, 5, 11);
//camera.lookAt(0, 0, 0);
//camera.position.y = 5;


const hlight = new THREE.AmbientLight(0x000000, 100);

const directional_Light = new THREE.DirectionalLight(0xffffff,100);
directional_Light.position.set(0,1,0);
directional_Light.castShadow = true;
scene.add(directional_Light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = true;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

/*const groundGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(groundMesh);*/

/*const spotlight = new THREE.SpotLight(0xffffff, 35, 100, 0, 100);
spotlight.position.set(0, 0, 0);
scene.add(spotlight);*/

const loader = new OBJLoader().setPath('Town Bus/');
loader.load('gen bus 2.obj', (obj) => {
    const mesh = obj.scene;
    mesh.position.set(0, 1.05, -1);
    scene.add(mesh);
});

function animate() {
    requestAnimationFrame(animate);
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    //mesh.autoRotate;
    controls.update();
    renderer.render(scene, camera);
}
animate();
//renderer.render(scene, camera);
