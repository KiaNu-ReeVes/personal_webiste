import React, { useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from 'three';

function Model() {
  const gltf = useLoader(GLTFLoader, "/FreeAnimatedMale/scene.gltf");
  const modelRef = useRef();

  // Adjust the scale of the model
  const scale = 5; // You can adjust this value to scale the model appropriately

  // Animation mixer setup
  const mixer = useRef();
  useFrame((state, delta) => mixer.current && mixer.current.update(delta));

  if (gltf.animations.length && !mixer.current) {
    mixer.current = new AnimationMixer(gltf.scene);
    const action = mixer.current.clipAction(gltf.animations[0]);
    action.play();
  }

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={[0, -6, 0]}
      rotation={[0.15, -Math.PI / 14, 0]} // Adjust the Y-axis rotation for looking left
      scale={[scale, scale, scale]}
      castShadow
    />
  );
}

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight color="white" position={[0, 0, 2]} />
    </>
  );
};

const KiaNModel = () => {
  return (
    <Canvas className="backround">
      <Lights />
      <mesh>
        <Model />
      </mesh>
    </Canvas>
  );
};

export default KiaNModel;
