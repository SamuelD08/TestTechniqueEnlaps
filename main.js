import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls'

// Création de la scene
const scene = new THREE.Scene();

// Création de la caméra
const camera = new THREE.PerspectiveCamera(
);

camera.position.z = 20;
camera.position.y = 20;
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
for (let i = 0; i < 5 ; i++) {
    const solGeometry = new THREE.PlaneGeometry(5, 5);
    const solMaterial = new THREE.MeshStandardMaterial({
        map: routeTexture,
        side: THREE.DoubleSide
    });
    const sol = new THREE.Mesh(solGeometry, solMaterial);
    sol.rotation.x = -Math.PI/2;
    sol.position.z = i*5 - 10;
    sol.receiveShadow = true;
    scene.add(sol)
}


// Soleil
const soleilGeometry = new THREE.SphereGeometry();
const soleilMaterial = new THREE.MeshPhongMaterial({
    shininess: 70,
    color: 0xdc7a25
});

const soleil = new THREE.Mesh(soleilGeometry, soleilMaterial);
soleil.position.y = 10
soleil.position.x = -4;
soleil.position.z = 5;


// Batiment
for (let i = 0; i < 5; i++) {
    const bat = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshStandardMaterial({
                map: batimentTexture
            })
        );
    bat.position.y = 2*i + 1.01
    bat.castShadow = true;
    scene.add(bat)
}

// Voiture
const voiture = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5),
    new THREE.MeshStandardMaterial({
        color: 0xff0000
    })
);
voiture.position.z = 10
voiture.position.y = 0.25
voiture.position.x = 1

// Ajouts
scene.add(soleil);
scene.add(voiture)

//////////////////// CREATION DES Lumières /////////////////////
// Ambiance
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

// Directionnel
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(soleil.position.x, soleil.position.y, 20);

// Ajouts
scene.add(ambientLight);
scene.add(directionalLight)


//////////////////// CREATION DES OMBRES /////////////////////
renderer.shadowMap.enabled = true;
directionalLight.castShadow = true;
voiture.castShadow = true;

//////////////////// AJOUT SKY Simplifiée /////////////////////
const skyGeometry = new THREE.SphereGeometry(100, 32, 32);
const skyMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./textures/sky.jpg'),
    side: THREE.BackSide
});
const sky = new THREE.Mesh(skyGeometry, skyMaterial)
scene.add(sky)

//////////////////// Création nuages /////////////////////
const nuages = []
for (let i = 0; i < 10; i++) {
    const nuage = new THREE.Mesh(
            new THREE.SphereGeometry(Math.random()*3),
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.8
            })
        );
    nuage.position.x = Math.random() * 20 - 10;
    nuage.position.y = Math.random() * 7 + 7;
    nuage.position.z = Math.random() * 20 - 10;

    nuage.rotation.z = Math.random() * Math.PI*2
    nuages.push(nuage)
    scene.add(nuage)
}

//////////////////// CREATION DES CONTROLES /////////////////////
let avance = true
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
function animate() {
    requestAnimationFrame(animate);

    // Animation de la voiture
    if (voiture.position.z > 3 && avance) {
        voiture.position.z -= 0.05
    } else if (voiture.position.z < 10) {
        avance = false
        voiture.position.z += 0.05
    } else {
        avance = true;
    }

    // Animation nuage
    nuages.forEach((nuage) => {
        nuage.position.x += 0.01;
        if (nuage.position.x > 10) {
            nuage.position.x = -10
        }
    });


    controls.update();
    renderer.render( scene, camera );
}


renderer.render(scene, camera);
animate()
