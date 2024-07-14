import React, { Suspense, useEffect, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function HomeInfo() {
  return (
    <h1 class="home_info_txt">
      Perovskite solar cells, fueled by their distinctive crystal structure, promise a renewable energy revolution. The ABX3 lattice, featuring 'A' as a larger cation, 'B' as a smaller cation, and 'X' as an anion, forms the basis of their uniqueness, allowing meticulous property adjustments.
      Scientific factors such as bandgap, charge carrier mobility, and defect management significantly impact power conversion efficiency. Tailoring the bandgap expands light absorption, while improved charge carrier mobility optimizes energy conversion. Reducing lattice defects curbs recombination losses.
      Our platform harnesses insights from perovskite crystal structure and these parameters, enabling precise power conversion efficiency prediction. Through this site, accurately anticipating PCE propels us towards a sustainable and efficient solar energy landscape.</h1>
  );
}