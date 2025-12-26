import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene setup
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 5;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xd4af37, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0x2d8659, 0.8);
pointLight.position.set(-5, 5, 3);
scene.add(pointLight);

// Mouse tracking
let mouseX = 0;
let mouseY = 0;
let targetRotationX = 0;
let targetRotationY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    targetRotationY = mouseX * Math.PI * 0.3;
    targetRotationX = mouseY * Math.PI * 0.15;
});

// Load 3D model
let moth = null;
const loader = new GLTFLoader();

loader.load(
    '3dmodels/luna_moth_vcu_3d_5731.glb',
    (gltf) => {
        moth = gltf.scene;

        // Scale and position the moth
        moth.scale.set(2, 2, 2);
        moth.position.set(0, 0, 0);

        scene.add(moth);
        console.log('🦋 Luna moth loaded successfully!');
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('Error loading moth model:', error);
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (moth) {
        // Smooth rotation towards mouse position
        moth.rotation.y += (targetRotationY - moth.rotation.y) * 0.05;
        moth.rotation.x += (targetRotationX - moth.rotation.x) * 0.05;

        // Gentle floating animation
        moth.position.y = Math.sin(Date.now() * 0.001) * 0.3;
    }

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
