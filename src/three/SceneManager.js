import * as THREE from 'three';
import { gsap } from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class SceneManager {
    constructor() {
        this.canvas = document.getElementById('three-canvas');
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x050505);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 1.8, 4);

        this.loader = new GLTFLoader();
        this.setupLights();
        this.setupEnvironment();
        this.characters = [];
        this.interactables = [];
        this.player = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.setupGroundMarker();

        window.addEventListener('resize', () => this.onWindowResize());
    }

    setupLights() {
        const ambient = new THREE.AmbientLight(0x404040, 0.8);
        this.scene.add(ambient);

        const point = new THREE.PointLight(0xe74c3c, 2, 15);
        point.position.set(2, 3, 2);
        this.scene.add(point);

        const rimLight = new THREE.DirectionalLight(0x3498db, 0.5);
        rimLight.position.set(-5, 2, -5);
        this.scene.add(rimLight);
    }

    setupEnvironment() {
        const roadGeo = new THREE.PlaneGeometry(20, 200);
        const roadMat = new THREE.MeshStandardMaterial({ 
            color: 0x0a0a0a,
            roughness: 0.9,
            metalness: 0.1
        });
        const road = new THREE.Mesh(roadGeo, roadMat);
        road.rotation.x = -Math.PI / 2;
        this.scene.add(road);

        this.scene.fog = new THREE.FogExp2(0x050505, 0.15);
    }

    setupGroundMarker() {
        const geo = new THREE.RingGeometry(0.3, 0.4, 32);
        const mat = new THREE.MeshBasicMaterial({ color: 0xe74c3c, transparent: true, opacity: 0 });
        this.groundMarker = new THREE.Mesh(geo, mat);
        this.groundMarker.rotation.x = -Math.PI / 2;
        this.groundMarker.position.y = 0.01;
        this.scene.add(this.groundMarker);
    }

    showGroundMarker(pos) {
        this.groundMarker.position.set(pos.x, 0.01, pos.z);
        gsap.killTweensOf(this.groundMarker.material);
        gsap.killTweensOf(this.groundMarker.scale);
        gsap.fromTo(this.groundMarker.material, { opacity: 1 }, { opacity: 0, duration: 1 });
        gsap.fromTo(this.groundMarker.scale, { x: 0.1, y: 0.1 }, { x: 1.5, y: 1.5, duration: 1 });
    }

    getMousePosition(event) {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        return new THREE.Vector2(x, y);
    }

    getGroundClickPoint(event) {
        this.mouse = this.getMousePosition(event);
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        const groundIntersect = intersects.find(i => i.object.geometry?.type === 'PlaneGeometry');
        return groundIntersect ? groundIntersect.point : null;
    }

    getInteractionAtPoint(event) {
        this.mouse = this.getMousePosition(event);
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.interactables, true);
        
        if (intersects.length > 0) {
            let obj = intersects[0].object;
            while (obj && !obj.userData.interactable) {
                obj = obj.parent;
            }
            return obj;
        }
        return null;
    }

    spawnLootable(id, position, type = 'supplies') {
        const group = new THREE.Group();
        const geo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        const mat = new THREE.MeshToonMaterial({ color: 0xf1c40f }); // Gold for loot
        const mesh = new THREE.Mesh(geo, mat);
        const outlineGeo = new THREE.BoxGeometry(0.45, 0.45, 0.45);
        const outlineMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
        const outline = new THREE.Mesh(outlineGeo, outlineMat);

        group.add(mesh);
        group.add(outline);
        group.position.copy(position);
        group.userData = { 
            interactable: true, 
            id: id, 
            type: type,
            baseHeight: position.y 
        };

        this.scene.add(group);
        this.interactables.push(group);
        this.characters.push(group); 
        return group;
    }

    spawnPlayer(position) {
        this.player = this.spawnCharacter('player', position, 0x3498db);
        this.player.userData.targetPos = position.clone();
        this.player.userData.isMoving = false;
        return this.player;
    }

    movePlayer(targetPos) {
        if (!this.player) return;
        this.player.userData.targetPos.copy(targetPos);
        this.player.userData.isMoving = true;
        this.showGroundMarker(targetPos);
    }

    transitionToDialogue() {
        if (!this.player) return;
        const camTarget = new THREE.Vector3().copy(this.player.position).add(new THREE.Vector3(0, 1.5, 2.5));
        this.transitionCamera(camTarget, this.player.position, 1.5);
    }

    transitionToExploration() {
        if (!this.player) return;
        const camTarget = new THREE.Vector3().copy(this.player.position).add(new THREE.Vector3(0, 1.8, 4));
        this.transitionCamera(camTarget, this.player.position, 1.5);
    }

    transitionCamera(targetPos, lookAtPos, duration = 2) {
        gsap.to(this.camera.position, {
            x: targetPos.x,
            y: targetPos.y,
            z: targetPos.z,
            duration: duration,
            ease: "power2.inOut",
            onUpdate: () => {
                this.camera.lookAt(lookAtPos);
            }
        });
    }

    spawnCharacter(id, position, color = 0x3498db) {
        const group = new THREE.Group();
        const geo = new THREE.CapsuleGeometry(0.35, 1, 4, 8);
        const mat = new THREE.MeshToonMaterial({ color });
        const mesh = new THREE.Mesh(geo, mat);
        const outlineGeo = new THREE.CapsuleGeometry(0.38, 1.05, 4, 8);
        const outlineMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
        const outline = new THREE.Mesh(outlineGeo, outlineMat);
        group.add(mesh);
        group.add(outline);
        group.position.copy(position);
        group.userData = { id, baseHeight: position.y };
        this.scene.add(group);
        this.characters.push(group);
        return group;
    }

    spawnZombie(position) {
        const group = new THREE.Group();
        const geo = new THREE.BoxGeometry(0.7, 1.7, 0.7);
        const mat = new THREE.MeshToonMaterial({ color: 0x2d5a27 });
        const mesh = new THREE.Mesh(geo, mat);
        const outlineGeo = new THREE.BoxGeometry(0.75, 1.75, 0.75);
        const outlineMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
        const outline = new THREE.Mesh(outlineGeo, outlineMat);
        group.add(mesh);
        group.add(outline);
        group.position.copy(position);
        group.userData = { id: 'zombie', baseHeight: position.y };
        this.scene.add(group);
        this.characters.push(group);
        return group;
    }

    shakeCamera(intensity = 0.1, duration = 0.5) {
        const originalPos = this.camera.position.clone();
        gsap.to(this.camera.position, {
            x: `+=${intensity}`,
            y: `+=${intensity}`,
            repeat: 5,
            yoyo: true,
            duration: duration / 10,
            onComplete: () => {
                this.camera.position.copy(originalPos);
            }
        });
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    clearScene() {
        this.scene.children = this.scene.children.filter(child => 
            child.type === 'AmbientLight' || 
            child.type === 'PointLight' || 
            child.type === 'DirectionalLight' ||
            child.geometry?.type === 'PlaneGeometry' ||
            child.geometry?.type === 'RingGeometry'
        );
        this.characters = [];
        this.interactables = [];
        this.player = null;
    }

    update(time) {
        if (this.player && this.player.userData.targetPos) {
            const dist = this.player.position.distanceTo(this.player.userData.targetPos);
            if (dist > 0.1) {
                const dir = new THREE.Vector3().subVectors(this.player.userData.targetPos, this.player.position).normalize();
                this.player.position.add(dir.multiplyScalar(0.05));
                const targetRotation = Math.atan2(dir.x, dir.z);
                this.player.rotation.y = THREE.MathUtils.lerp(this.player.rotation.y, targetRotation, 0.1);
                
                if (window.gameInstance && window.gameInstance.isExploring) {
                    this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, this.player.position.x, 0.05);
                    this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, this.player.position.z + 4, 0.05);
                    this.camera.lookAt(this.player.position);
                }
            } else {
                this.player.userData.isMoving = false;
            }
        }

        this.characters.forEach((char, index) => {
            const offset = index * 0.5;
            const isMoving = char.userData.id === 'player' && char.userData.isMoving;
            const speed = isMoving ? 0.01 : 0.002;
            const amp = isMoving ? 0.15 : 0.05;
            char.position.y = (char.userData.baseHeight || 0.9) + Math.sin(time * speed + offset) * amp;
            if (!isMoving) {
                char.rotation.z = Math.sin(time * 0.001 + offset) * 0.02;
            } else {
                char.rotation.z = Math.sin(time * 0.01 + offset) * 0.05;
            }
        });

        this.renderer.render(this.scene, this.camera);
    }
}
