import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
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
camera.position.set(1, 2, 2);
//camera.lookAt(0, 0, 0);
//camera.position.y = 5;


//const hlight = new THREE.AmbientLight(0x000000, 100);
const hlight = new THREE.AmbientLight(0x5A5A5A, 1);

const directional_Light = new THREE.DirectionalLight(0xffffff,1);
directional_Light.position.set(0,1,0);
directional_Light.castShadow = false;
scene.add(directional_Light);

const light34 = new THREE.HemisphereLight( 0xfffffb, 0x080820, 0.8 );
light34.position.set(3,2,1);
scene.add(light34);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 3;
controls.maxDistance = 50;
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

const loader = new GLTFLoader().setPath('gear_box/');

loader.load('gear_box.gltf', (gltf) => {
    const mesh = gltf.scene;
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
});


// loader.load('buggy.gltf', (gltf) => {
//     const mesh = gltf.scene;
//     const bbox = new THREE.Box3().setFromObject(mesh);
//     const center = bbox.getCenter(new THREE.Vector3());
//     mesh.position.sub(center); // This will center the model
//     scene.add(mesh);
//   });
  

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
