import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// Création de la scene
const scene = new THREE.Scene();

// Création de la caméra
const camera = new THREE.PerspectiveCamera(
);

camera.position.z = 10;
camera.position.y = 2;
camera.position.x = 2;

// Création du renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(900, 800);
document.body.append(renderer.domElement);



//////////////////// CREATION DES FORMES /////////////////////

// Sol
const solGeometry = new THREE.PlaneGeometry(1, 1);
const solMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});
const sol = new THREE.Mesh(solGeometry, solMaterial);

// Ajouts
scene.add(sol)

//////////////////// CREATION DES Lumières /////////////////////
// Ambiance
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

// Directionnel
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

// Ajouts
scene.add(ambientLight);



renderer.render(scene, camera);
