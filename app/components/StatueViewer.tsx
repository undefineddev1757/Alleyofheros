'use client';

import { Suspense, useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Statue() {
  const { scene } = useGLTF('/Statue_1.glb');
  const groupRef = useRef<THREE.Group>(null);

  // ⛔ Центровка модели (автоматическая)
  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center); // центрируем модель
  }, [scene]);

  // 🔄 Плавное вращение
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Оставляем оригинальное освещение и материалы */}
      <primitive object={scene} scale={1.4} />
    </group>
  );
}

export default function StatueViewer(): JSX.Element {
  return (
    <div className="statue-viewer">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        {/* 🔥 Дополнительное освещение (НЕ ломает оригинальное) */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Мягкий заполняющий свет */}
        <hemisphereLight intensity={0.3} groundColor={'#444'} />

        {/* Плоскость для теней */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.2, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.4} />
        </mesh>

        <Suspense fallback={null}>
          <Statue />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/Statue_1.glb');
