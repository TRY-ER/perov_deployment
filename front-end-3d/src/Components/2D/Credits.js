import React, { Suspense, useEffect } from "react";
import "../../style.css";



export function Credits() {
  return (
    <>
      <div id="click_inst"><p>The above 3D structure is the crystal structure for the perovskite. Click and drag on the strucrure to rotate and view in 3D</p></div>
      <div id="credits_paper">Find the research paper at this <a href="https://doi.org/10.1002/adts.202300309" >Link</a></div>
      <div id="credits">Made with ❤️ by <a href="https://try-er.github.io/debasish/" >Debasish Mohanty</a></div>
    </>
  );
}