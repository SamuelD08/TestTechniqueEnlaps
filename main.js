import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls'

// Création de la scene
const scene = new THREE.Scene();

// Création de la caméra
const camera = new THREE.PerspectiveCamera(
);

camera.position.z = 20;
camera.position.y = 10;
camera.position.x = 10;

// Création du renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(900, 800);
document.body.append(renderer.domElement);

//////////////////// CREATION DES Textures /////////////////////
const textureLoader = new THREE.TextureLoader();
const routeTexture = textureLoader.load('./textures/Road.jpg');
const batimentTexture = textureLoader.load('./textures/batiment.jpeg');

//////////////////// CREATION DES FORMES /////////////////////

// Sol
const solGeometry = new THREE.PlaneGeometry(5, 5);
const solMaterial = new THREE.MeshStandardMaterial({
    map: routeTexture
});
const sol = new THREE.Mesh(solGeometry, solMaterial);
sol.rotation.x = -Math.PI/2;
sol.position.x = 0;

// Soleil
const soleilGeometry = new THREE.SphereGeometry();
const soleilMaterial = new THREE.MeshPhongMaterial({
    shininess: 70,
    color: 0xdc7a25
});

const soleil = new THREE.Mesh(soleilGeometry, soleilMaterial);
soleil.position.y = 10
soleil.position.x = -4;


// Batiment
for (let i = 0; i < 5; i++) {
    const bat = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshStandardMaterial({
                map: batimentTexture
            })
        );
    bat.position.y = 2*i + 1
    scene.add(bat)
}

// Ajouts
scene.add(sol)
scene.add(soleil);
// scene.add(batiment)

//////////////////// CREATION DES Lumières /////////////////////
// Ambiance
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

// Directionnel
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

// Ajouts
scene.add(ambientLight);
scene.add(directionalLight)


//////////////////// CREATION DES CONTROLES /////////////////////
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render( scene, camera );
}


renderer.render(scene, camera);
animate()
