import "../../style.css";
import React, { Suspense, useEffect, useRef } from "react";



export function Predict_btn() {
    return (
        <>
            <a href="/predictor" >
                <button className="button_main" >Predict</button>
            </a>
        </>
    );
}
