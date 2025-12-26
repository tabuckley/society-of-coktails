import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// Scene setup
const canvas = document.getElementById('three-canvas');

if (!canvas) {
    console.error('Canvas element not found!');
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 15; // Pull camera back further

console.log('✅ Three.js scene initialized');

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xd4af37, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0x2d8659, 2);
pointLight.position.set(-5, 5, 3);
scene.add(pointLight);

// Add additional point light for volumetric effect
const volumetricLight = new THREE.PointLight(0xd4af37, 1.5);
volumetricLight.position.set(5, -3, 5);
scene.add(volumetricLight);

// Volumetric lighting fog
scene.fog = new THREE.FogExp2(0x0a0a0a, 0.02);

// Post-processing for bloom
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    2.0,  // strength
    0.8,  // radius
    0.3   // threshold
);
composer.addPass(bloomPass);

console.log('✨ Bloom and volumetric lighting added');

// Mouse tracking
let mouseX = 0;
let mouseY = 0;
let targetRotationX = 0;
let targetRotationY = 0;
let mouse3D = new THREE.Vector3();

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // More extreme rotation - full 360 degree range
    targetRotationY = mouseX * Math.PI * 1.5;
    targetRotationX = mouseY * Math.PI * 0.8;

    // Convert mouse position to 3D space
    mouse3D.set(mouseX * 10, mouseY * 10, 5);
});

// Load 3D model with Draco compression
let moth = null;
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load(
    '3Dmodels/luna_moth_optimized.glb',
    (gltf) => {
        moth = gltf.scene;

        // Log model info for debugging
        const box = new THREE.Box3().setFromObject(moth);
        const size = box.getSize(new THREE.Vector3());
        console.log('Model size:', size);
        console.log('Model position:', moth.position);

        // Apply green reflective chrome material with strong glow
        const chromeMaterial = new THREE.MeshStandardMaterial({
            color: 0x2d8659,
            metalness: 1.0,
            roughness: 0.1,
            emissive: 0x2d8659,
            emissiveIntensity: 2.0,  // Increased for stronger bloom
            envMapIntensity: 1.0
        });

        // Apply material and store original vertices for distortion
        moth.traverse((child) => {
            if (child.isMesh) {
                child.material = chromeMaterial;

                // Store original vertex positions for distortion
                const positions = child.geometry.attributes.position;
                child.userData.originalPositions = positions.array.slice();
            }
        });

        // Scale and position the moth - make it tiny because it's HUGE
        moth.scale.set(0.05, 0.05, 0.05);
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

        // Apply vertex distortion based on mouse position
        moth.traverse((child) => {
            if (child.isMesh && child.userData.originalPositions) {
                const positions = child.geometry.attributes.position;
                const originalPositions = child.userData.originalPositions;

                // Get world position for distance calculation
                const worldPos = new THREE.Vector3();

                for (let i = 0; i < positions.count; i++) {
                    const i3 = i * 3;

                    // Get original vertex position
                    const vx = originalPositions[i3];
                    const vy = originalPositions[i3 + 1];
                    const vz = originalPositions[i3 + 2];

                    // Calculate world position of vertex
                    worldPos.set(vx, vy, vz);
                    child.localToWorld(worldPos);

                    // Calculate distance from mouse to vertex
                    const distance = worldPos.distanceTo(mouse3D);
                    const maxDistance = 8;

                    if (distance < maxDistance) {
                        // Pull vertices towards mouse with falloff
                        const influence = (1 - distance / maxDistance) * 0.3;
                        const pullDirection = new THREE.Vector3();
                        pullDirection.subVectors(mouse3D, worldPos).normalize();

                        // Apply displacement in local space
                        child.worldToLocal(pullDirection);

                        positions.setXYZ(
                            i,
                            vx + pullDirection.x * influence,
                            vy + pullDirection.y * influence,
                            vz + pullDirection.z * influence
                        );
                    } else {
                        // Smoothly return to original position
                        const currentX = positions.getX(i);
                        const currentY = positions.getY(i);
                        const currentZ = positions.getZ(i);

                        positions.setXYZ(
                            i,
                            currentX + (vx - currentX) * 0.1,
                            currentY + (vy - currentY) * 0.1,
                            currentZ + (vz - currentZ) * 0.1
                        );
                    }
                }

                positions.needsUpdate = true;
                child.geometry.computeVertexNormals();
            }
        });
    }

    // Animate volumetric light
    volumetricLight.position.x = Math.sin(Date.now() * 0.0005) * 8;
    volumetricLight.position.y = Math.cos(Date.now() * 0.0003) * 5;

    // Render with bloom effect
    composer.render();
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});
