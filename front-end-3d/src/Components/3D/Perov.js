import React, { Suspense, useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import {
  OrbitControls
} from "@react-three/drei";
// import * as THREE from "three";



export function Perov() {
    const gltf = useLoader(
      GLTFLoader,
      process.env.PUBLIC_URL + "gltf_models/perov_cube_added.gltf"
    );

    const MyMesh = useRef();

    useFrame(({clock}) => {
      MyMesh.current.rotation.y = clock.getElapsedTime()*0.04;
      MyMesh.current.rotation.z = clock.getElapsedTime()*0.04;
      MyMesh.current.rotation.x = clock.getElapsedTime()*0.04;
    })
    
    
    useEffect(() => {
      gltf.scene.scale.set(2.5,2.5,2.5);
      gltf.scene.position.set(-1,2, 0);
      gltf.scene.castShadow = true;
      gltf.recieveShadow = true;
      gltf.scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.castShadow = true;
          // object.receiveShadow = true;
          object.material.envMapIntensity = 1;
        }
      });
    }, [gltf]);

    // const object = new THREE.Mesh(gltf, material);
  
    // useFrame((state, delta) => {
    //   let t = state.clock.getElapsedTime();
  
    //   let group = gltf.scene.children[0].children[0].children[0];
    //   group.children[0].rotation.x = t * 2;
    //   group.children[2].rotation.x = t * 2;
    //   group.children[4].rotation.x = t * 2;
    //   group.children[6].rotation.x = t * 2;
    // });
    
    return (
    <Suspense fallback={null} >
      <OrbitControls 
        enableRotate = {true}
        enableZoom = {false}
        enablePan = {false}
        maxPolarAngle={1.45}
      />
      <primitive object={gltf.scene} ref={MyMesh} />
      </Suspense>);
  }

  // onPointerEnter={(e) => console.log("pointer enter")}