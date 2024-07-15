import React, { Suspense, useEffect, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function HomeInfo() {
  return (
    <h1 className="home_info_txt">
       Welcome to our Power Conversion Efficiency Regressor website, designed to help researchers and engineers predict the power conversion efficiency (PCE) of perovskite-based solar cells. By inputting your experimental and compositional data, our advanced machine learning model provides accurate PCE predictions. Our user-friendly interface ensures that you can easily upload your data and receive results quickly, aiding in your research and development efforts. Join us in advancing solar technology with reliable and efficient PCE predictions.</h1>
  );
}