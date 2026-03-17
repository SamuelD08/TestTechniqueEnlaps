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

renderer.render(scene, camera);
