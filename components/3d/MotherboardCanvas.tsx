'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MotherboardCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 16, 22);
    camera.lookAt(0, -1, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Main Group
    const sceneGroup = new THREE.Group();
    sceneGroup.rotation.x = 0.4;
    scene.add(sceneGroup);

    // 1. PCB Substrate (Dark Blue Board)
    const pcbGeo = new THREE.BoxGeometry(15, 0.4, 15);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x090f1d,
      roughness: 0.3,
      metalness: 0.8,
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    sceneGroup.add(pcb);

    // 2. Central AWIE LABS Chip
    const chipGeo = new THREE.BoxGeometry(4.5, 0.7, 4.5);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x0c1629,
      roughness: 0.1,
      metalness: 0.9,
    });
    const chip = new THREE.Mesh(chipGeo, chipMat);
    chip.position.y = 0.45;
    sceneGroup.add(chip);

    // Glowing Chip Core Logo Surface
    const coreGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      side: THREE.DoubleSide,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.rotation.x = -Math.PI / 2;
    core.position.y = 0.81;
    sceneGroup.add(core);

    // 3. Robotic Arm Model (Top Left)
    const robotArmGroup = new THREE.Group();
    robotArmGroup.position.set(-4, 0.4, -4);
    
    // Arm Base
    const armBaseGeo = new THREE.CylinderGeometry(0.8, 1, 0.6, 16);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
    const armBase = new THREE.Mesh(armBaseGeo, armMat);
    robotArmGroup.add(armBase);

    // Arm Segment 1
    const seg1Geo = new THREE.CylinderGeometry(0.2, 0.2, 2.5);
    const seg1 = new THREE.Mesh(seg1Geo, armMat);
    seg1.position.set(0, 1.3, 0.4);
    seg1.rotation.x = 0.5;
    robotArmGroup.add(seg1);

    // Arm Joint
    const jointGeo = new THREE.SphereGeometry(0.4, 16, 16);
    const jointMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const joint = new THREE.Mesh(jointGeo, jointMat);
    joint.position.set(0, 2.3, 0.9);
    robotArmGroup.add(joint);

    // Arm Segment 2
    const seg2Geo = new THREE.CylinderGeometry(0.15, 0.15, 2);
    const seg2 = new THREE.Mesh(seg2Geo, armMat);
    seg2.position.set(0, 3, 0.2);
    seg2.rotation.x = -0.6;
    robotArmGroup.add(seg2);

    sceneGroup.add(robotArmGroup);

    // 4. Drone Model (Top Right)
    const droneGroup = new THREE.Group();
    droneGroup.position.set(4.5, 3.5, -4);

    const droneBodyGeo = new THREE.BoxGeometry(1.2, 0.3, 1.2);
    const droneBodyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 });
    const droneBody = new THREE.Mesh(droneBodyGeo, droneBodyMat);
    droneGroup.add(droneBody);

    // Drone Arms & Propellers
    const propGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.05, 12);
    const propMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });

    [[-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2]].forEach(([px, pz]) => {
      const armMesh = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.1, 0.1), droneBodyMat);
      armMesh.position.set(px / 2, 0, pz / 2);
      armMesh.rotation.y = Math.atan2(pz, px);
      droneGroup.add(armMesh);

      const prop = new THREE.Mesh(propGeo, propMat);
      prop.position.set(px, 0.2, pz);
      droneGroup.add(prop);
    });

    sceneGroup.add(droneGroup);

    // 5. PCB Traces & Capacitors
    const tracesMat = new THREE.MeshBasicMaterial({ color: 0x2563eb });
    for (let i = 0; i < 20; i++) {
      const traceGeo = new THREE.BoxGeometry(Math.random() * 4 + 1, 0.05, 0.1);
      const trace = new THREE.Mesh(traceGeo, tracesMat);
      const angle = (i / 20) * Math.PI * 2;
      trace.position.set(Math.cos(angle) * 5, 0.22, Math.sin(angle) * 5);
      trace.rotation.y = Math.floor(Math.random() * 4) * (Math.PI / 2);
      sceneGroup.add(trace);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x0066ff, 5, 50);
    blueLight.position.set(0, 10, 0);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x22d3ee, 4, 30);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      sceneGroup.rotation.y = Math.sin(elapsedTime * 0.3) * 0.15;
      droneGroup.position.y = 3.5 + Math.sin(elapsedTime * 2) * 0.2;
      droneGroup.rotation.y += 0.01;

      robotArmGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] lg:h-[550px] flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
