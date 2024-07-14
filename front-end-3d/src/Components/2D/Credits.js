import React, { Suspense, useEffect } from "react";
import "../../style.css";



export function Credits() {
  return (
    <>
      <div id="click_inst"><p>Click and Drag on the Strucrure to View in 3D</p></div>
      <div id="credits_paper">Find the research paper at this <a href="https://doi.org/10.1002/adts.202300309" >Link</a></div>
      <div id="credits">Made with ❤️ by <a href="https://try-er.github.io/debasishm/" >Debasish Mohanty</a></div>
    </>
  );
}