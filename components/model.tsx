import { createRoot } from "react-dom/client";
import { Canvas, useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

function Model() {
    const gltf = useLoader(GLTFLoader, "/KiaN2/untitled.gltf");
    
    // Adjust the scale of the model
    const scale = 7; // You can adjust this value to scale the model appropriately
  
    return (
      <primitive
        object={gltf.scene}
        position={[0, -4, 0]}
        rotation={[0.15, -Math.PI / 10, 0]}  // Adjust the Y-axis rotation for looking left
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
    <Canvas>
      <Lights />
      <mesh>
        <Model />
      </mesh>
    </Canvas>
  );
};
export default KiaNModel;
