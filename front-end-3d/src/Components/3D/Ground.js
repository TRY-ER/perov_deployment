import React, { useEffect, useState } from "react";
import { useFrame, useLoader, useUpdate, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

var mesh_pos_factor1 = -5;
var mesh_pos_factor2 = -5; // Moving the field forward or backwards
var mesh_pos_factor3 = -5; // moving the mesh

export function Ground() {
  const [roughness, normal] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "textures/random_dotted.jpg",
    process.env.PUBLIC_URL + "textures/random_dot_normal_map_1.jpg",
  ]);

  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      t.offset.set(0, 0);
    });

    normal.encoding = LinearEncoding;
  }, [normal, roughness]);

  const [active, setActive] = useState(false);
  const { viewport } = useThree();
  
  return (
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow 
        scale={(viewport.width / 5) * (active ? 1.5 : 1)}
        position={[mesh_pos_factor1,mesh_pos_factor2,mesh_pos_factor3]}>
      <planeGeometry args={[50, 50]}/>
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        normalScale={[0.15, 0.15]}
        roughnessMap={roughness}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
        mixStrength={80} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        debug={0}
        reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </mesh>
  );
}
