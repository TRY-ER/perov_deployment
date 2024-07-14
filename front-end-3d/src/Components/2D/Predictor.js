import "./2d_master.css";
import React, { useEffect, useState, CSSProperties } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

const override = {
    display: "block",
    position: "relative",
    left: "3px",
    top: "-60px",
    margin: "0 auto",
    borderColor: "red",
};



export function Predictor() {
    const [cResponse, setcResponse] = useState([]);
    const [getPCE, setGetPCE] = useState([]);
    const [loading, setLoading] = useState(false);
    let [color, setColor] = useState("red");
    let [clicked, setClicked] = useState(false);

    const getRes = async () => {
        const requestDict = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch("http://127.0.0.1:8000/predict", requestDict);
        const data = await response.json();
        console.log(data);

        if (!response.ok) { console.log("response not working properly"); }
        else {
            setcResponse(data);
        }
    }

    const form = document.getElementById("input_form");
    const responseF = (e) => {
        e.preventDefault();
        setLoading(true);
        setClicked(true);
        const formData = new FormData(form);
        // console.log([...formData]);
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/predict",
            data: [...formData]
        })
            .then((data) => {
                setGetPCE(data.data);
                // setgetmessage(data.message);
                setLoading(false);
                console.log(data.data);
            })
            .catch(function (err) {
                console.log(err);
            })

    }

    useEffect(() => {
        getRes();
    }, []);



    return (
        <div id="main_body">
            <h1 id="title">THE PEROVSKITE <br />
                SOLAR CELL<br />
                EFFICIENCY PREDICTOR<br /> </h1>
            <div>
                <form id="input_form" onSubmit={responseF}>
                    <div id="scale">
                        <p>* Lengths are in "cm" Scale </p></div>
                    <br />
                    <br />
                    <div className="box">
                        <h2 id="colName">Cell Area Measured</h2>
                        <p id="limiter">Enter value between {cResponse.Cell_area_measured_numeric?.min} and {cResponse.Cell_area_measured_numeric?.max}</p>
                        <input type="number" name="Cell_area_measured_numeric" id="Cell_area_measured_numeric" className="text_box" defaultValue={cResponse.Cell_area_measured_numeric?.min} min={cResponse.Cell_area_measured_numeric?.min} max={cResponse.Cell_area_measured_numeric?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">Cell Architecture</h2>
                        <select id="Cell_architecture_cat" name="Cell_architecture_cat" className="cat_drop" required defaultValue={cResponse.Cell_architecture_cat?.u_val.includes("None") ? "None" : cResponse.Cell_architecture_cat?.max}>
                            {cResponse.Cell_architecture_cat?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Substrate_stack_sequence_0?.title}</h2>
                        <select id="Substrate_stack_sequence_0" name="Substrate_stack_sequence_0" className="cat_drop" required defaultValue={cResponse.Substrate_stack_sequence_0?.u_val.includes("None") ? "None" : cResponse.Substrate_stack_sequence_0?.max}>
                            {cResponse.Substrate_stack_sequence_0?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Substrate_stack_sequence_1?.title}</h2>
                        <select id="Substrate_stack_sequence_1" name="Substrate_stack_sequence_1" className="cat_drop" required defaultValue={cResponse.Substrate_stack_sequence_1?.u_val.includes("None") ? "None" : cResponse.Substrate_stack_sequence_1?.max}>
                            {cResponse.Substrate_stack_sequence_1?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Substrate_stack_sequence_2?.title}</h2>
                        <select id="Substrate_stack_sequence_2" name="Substrate_stack_sequence_2" className="cat_drop" required defaultValue={cResponse.Substrate_stack_sequence_2?.u_val.includes("None") ? "None" : cResponse.Substrate_stack_sequence_2?.max}>
                            {cResponse.Substrate_stack_sequence_2?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Substrate_stack_sequence_3?.title}</h2>
                        <select id="Substrate_stack_sequence_3" name="Substrate_stack_sequence_3" className="cat_drop" required defaultValue={cResponse.Substrate_stack_sequence_3?.u_val.includes("None") ? "None" : cResponse.Substrate_stack_sequence_3?.max}>
                            {cResponse.Substrate_stack_sequence_3?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Substrate_stack_sequence_4?.title}</h2>
                        <select id="Substrate_stack_sequence_4" name="Substrate_stack_sequence_4" className="cat_drop" required defaultValue={cResponse.Substrate_stack_sequence_4?.u_val.includes("None") ? "None" : cResponse.Substrate_stack_sequence_4?.max}>
                            {cResponse.Substrate_stack_sequence_4?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.ETL_stack_sequence_0?.title}</h2>
                        <select id="ETL_stack_sequence_0" name="ETL_stack_sequence_0" className="cat_drop" required defaultValue={cResponse.ETL_stack_sequence_0?.u_val.includes("None") ? "None" : cResponse.ETL_stack_sequence_0?.max}>
                            {cResponse.ETL_stack_sequence_0?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.ETL_stack_sequence_1?.title}</h2>
                        <select id="ETL_stack_sequence_1" name="ETL_stack_sequence_1" className="cat_drop" required defaultValue={cResponse.ETL_stack_sequence_1?.u_val.includes("None") ? "None" : cResponse.ETL_stack_sequence_1?.max}>
                            {cResponse.ETL_stack_sequence_1?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.ETL_stack_sequence_2?.title}</h2>
                        <select id="ETL_stack_sequence_2" name="ETL_stack_sequence_2" className="cat_drop" required defaultValue={cResponse.ETL_stack_sequence_2?.u_val.includes("None") ? "None" : cResponse.ETL_stack_sequence_2?.max}>
                            {cResponse.ETL_stack_sequence_2?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.ETL_stack_sequence_3?.title}</h2>
                        <select id="ETL_stack_sequence_3" name="ETL_stack_sequence_3" className="cat_drop" required defaultValue={cResponse.ETL_stack_sequence_3?.u_val.includes("None") ? "None" : cResponse.ETL_stack_sequence_3?.max}>
                            {cResponse.ETL_stack_sequence_3?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.ETL_stack_sequence_4?.title}</h2>
                        <select id="ETL_stack_sequence_4" name="ETL_stack_sequence_4" className="cat_drop" required defaultValue={cResponse.ETL_stack_sequence_4?.u_val.includes("None") ? "None" : cResponse.ETL_stack_sequence_4?.max}>
                            {cResponse.ETL_stack_sequence_4?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.ETL_stack_sequence_5?.title}</h2>
                        <select id="ETL_stack_sequence_5" name="ETL_stack_sequence_5" className="cat_drop" required defaultValue={cResponse.ETL_stack_sequence_5?.u_val.includes("None") ? "None" : cResponse.ETL_stack_sequence_5?.max}>
                            {cResponse.ETL_stack_sequence_5?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.ETL_stack_sequence_6?.title}</h2>
                        <select id="ETL_stack_sequence_6" name="ETL_stack_sequence_6" className="cat_drop" required defaultValue={cResponse.ETL_stack_sequence_6?.u_val.includes("None") ? "None" : cResponse.ETL_stack_sequence_6?.max}>
                            {cResponse.ETL_stack_sequence_6?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.ETL_deposition_procedure_0?.title}</h2>
                        <select id="ETL_deposition_procedure_0" name="ETL_deposition_procedure_0" className="cat_drop" required defaultValue={cResponse.ETL_deposition_procedure_0?.u_val.includes("None") ? "None" : cResponse.ETL_deposition_procedure_0?.max}>
                            {cResponse.ETL_deposition_procedure_0?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.ETL_deposition_procedure_1?.title}</h2>
                        <select id="ETL_deposition_procedure_1" name="ETL_deposition_procedure_1" className="cat_drop" required defaultValue={cResponse.ETL_deposition_procedure_1?.u_val.includes("None") ? "None" : cResponse.ETL_deposition_procedure_1?.max}>
                            {cResponse.ETL_deposition_procedure_1?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.ETL_deposition_procedure_2?.title}</h2>
                        <select id="ETL_deposition_procedure_2" name="ETL_deposition_procedure_2" className="cat_drop" required defaultValue={cResponse.ETL_deposition_procedure_2?.u_val.includes("None") ? "None" : cResponse.ETL_deposition_procedure_2?.max}>
                            {cResponse.ETL_deposition_procedure_2?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.ETL_deposition_procedure_3?.title}</h2>
                        <select id="ETL_deposition_procedure_3" name="ETL_deposition_procedure_3" className="cat_drop" required defaultValue={cResponse.ETL_deposition_procedure_3?.u_val.includes("None") ? "None" : cResponse.ETL_deposition_procedure_3?.max}>
                            {cResponse.ETL_deposition_procedure_3?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.ETL_deposition_procedure_4?.title}</h2>
                        <select id="ETL_deposition_procedure_4" name="ETL_deposition_procedure_4" className="cat_drop" required defaultValue={cResponse.ETL_deposition_procedure_4?.u_val.includes("None") ? "None" : cResponse.ETL_deposition_procedure_4?.max}>
                            {cResponse.ETL_deposition_procedure_4?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.ETL_deposition_procedure_5?.title}</h2>
                        <select id="ETL_deposition_procedure_5" name="ETL_deposition_procedure_5" className="cat_drop" required defaultValue={cResponse.ETL_deposition_procedure_5?.u_val.includes("None") ? "None" : cResponse.ETL_deposition_procedure_5?.max}>
                            {cResponse.ETL_deposition_procedure_5?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.ETL_deposition_procedure_6?.title}</h2>
                        <select id="ETL_deposition_procedure_6" name="ETL_deposition_procedure_6" className="cat_drop" required defaultValue={cResponse.ETL_deposition_procedure_6?.u_val.includes("None") ? "None" : cResponse.ETL_deposition_procedure_6?.max}>
                            {cResponse.ETL_deposition_procedure_6?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_composition_a_ions_0?.title}</h2>
                        <select id="Perovskite_composition_a_ions_0" name="Perovskite_composition_a_ions_0" className="cat_drop" required defaultValue={cResponse.Perovskite_composition_a_ions_0?.u_val.includes("None") ? "None" : cResponse.Perovskite_composition_a_ions_0?.max}>
                            {cResponse.Perovskite_composition_a_ions_0?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_composition_a_ions_1?.title}</h2>
                        <select id="Perovskite_composition_a_ions_1" name="Perovskite_composition_a_ions_1" className="cat_drop" required defaultValue={cResponse.Perovskite_composition_a_ions_1?.u_val.includes("None") ? "None" : cResponse.Perovskite_composition_a_ions_1?.max} >
                            {cResponse.Perovskite_composition_a_ions_1?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_composition_a_ions_2?.title}</h2>
                        <select id="Perovskite_composition_a_ions_2" name="Perovskite_composition_a_ions_2" className="cat_drop" required defaultValue={cResponse.Perovskite_composition_a_ions_2?.u_val.includes("None") ? "None" : cResponse.Perovskite_composition_a_ions_2?.max} >
                            {cResponse.Perovskite_composition_a_ions_2?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_composition_a_ions_3?.title}</h2>
                        <select id="Perovskite_composition_a_ions_3" name="Perovskite_composition_a_ions_3" className="cat_drop" required defaultValue={cResponse.Perovskite_composition_a_ions_3?.u_val.includes("None") ? "None" : cResponse.Perovskite_composition_a_ions_3?.max} >
                            {cResponse.Perovskite_composition_a_ions_3?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_composition_a_ions_coefficients_0?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_composition_a_ions_coefficients_0?.min} and {cResponse.Perovskite_composition_a_ions_coefficients_0?.max}</p>
                        <input type="number" name="Perovskite_composition_a_ions_coefficients_0" id="Perovskite_composition_a_ions_coefficients_0" className="text_box" defaultValue={cResponse.Perovskite_composition_a_ions_coefficients_0?.min} min={cResponse.Perovskite_composition_a_ions_coefficients_0?.min} max={cResponse.Perovskite_composition_a_ions_coefficients_0?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_composition_a_ions_coefficients_1?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_composition_a_ions_coefficients_1?.min} and {cResponse.Perovskite_composition_a_ions_coefficients_1?.max}</p>
                        <input type="number" name="Perovskite_composition_a_ions_coefficients_1" id="Perovskite_composition_a_ions_coefficients_1" className="text_box" defaultValue={cResponse.Perovskite_composition_a_ions_coefficients_1?.min} min={cResponse.Perovskite_composition_a_ions_coefficients_1?.min} max={cResponse.Perovskite_composition_a_ions_coefficients_1?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_composition_a_ions_coefficients_2?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_composition_a_ions_coefficients_2?.min} and {cResponse.Perovskite_composition_a_ions_coefficients_2?.max}</p>
                        <input type="number" name="Perovskite_composition_a_ions_coefficients_2" id="Perovskite_composition_a_ions_coefficients_2" className="text_box" defaultValue={cResponse.Perovskite_composition_a_ions_coefficients_2?.min} min={cResponse.Perovskite_composition_a_ions_coefficients_2?.min} max={cResponse.Perovskite_composition_a_ions_coefficients_2?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_composition_a_ions_coefficients_3?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_composition_a_ions_coefficients_3?.min} and {cResponse.Perovskite_composition_a_ions_coefficients_3?.max}</p>
                        <input type="number" name="Perovskite_composition_a_ions_coefficients_3" id="Perovskite_composition_a_ions_coefficients_3" className="text_box" defaultValue={cResponse.Perovskite_composition_a_ions_coefficients_3?.min} min={cResponse.Perovskite_composition_a_ions_coefficients_3?.min} max={cResponse.Perovskite_composition_a_ions_coefficients_3?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_composition_b_ions_0?.title}</h2>
                        <select id="Perovskite_composition_b_ions_0" name="Perovskite_composition_b_ions_0" className="cat_drop" required defaultValue={cResponse.Perovskite_composition_b_ions_0?.u_val.includes("None") ? "None" : cResponse.Perovskite_composition_b_ions_0?.max}>
                            {cResponse.Perovskite_composition_b_ions_0?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_composition_b_ions_1?.title}</h2>
                        <select id="Perovskite_composition_b_ions_1" name="Perovskite_composition_b_ions_1" className="cat_drop" required defaultValue={cResponse.Perovskite_composition_b_ions_1?.u_val.includes("None") ? "None" : cResponse.Perovskite_composition_b_ions_1?.max}>
                            {cResponse.Perovskite_composition_b_ions_1?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_composition_b_ions_2?.title}</h2>
                        <select id="Perovskite_composition_b_ions_2" name="Perovskite_composition_b_ions_2" className="cat_drop" required defaultValue={cResponse.Perovskite_composition_b_ions_2?.u_val.includes("None") ? "None" : cResponse.Perovskite_composition_b_ions_2?.max}>
                            {cResponse.Perovskite_composition_b_ions_2?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_composition_b_ions_3?.title}</h2>
                        <select id="Perovskite_composition_b_ions_3" name="Perovskite_composition_b_ions_3" className="cat_drop" required defaultValue={cResponse.Perovskite_composition_b_ions_3?.u_val.includes("None") ? "None" : cResponse.Perovskite_composition_b_ions_3?.max}>
                            {cResponse.Perovskite_composition_b_ions_3?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_composition_b_ions_coefficients_0?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_composition_b_ions_coefficients_0?.min} and {cResponse.Perovskite_composition_b_ions_coefficients_0?.max}</p>
                        <input type="number" name="Perovskite_composition_b_ions_coefficients_0" id="Perovskite_composition_b_ions_coefficients_0" className="text_box" defaultValue={cResponse.Perovskite_composition_b_ions_coefficients_0?.min} min={cResponse.Perovskite_composition_b_ions_coefficients_0?.min} max={cResponse.Perovskite_composition_b_ions_coefficients_0?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_composition_b_ions_coefficients_1?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_composition_b_ions_coefficients_1?.min} and {cResponse.Perovskite_composition_b_ions_coefficients_1?.max}</p>
                        <input type="number" name="Perovskite_composition_b_ions_coefficients_1" id="Perovskite_composition_b_ions_coefficients_1" className="text_box" defaultValue={cResponse.Perovskite_composition_b_ions_coefficients_1?.min} min={cResponse.Perovskite_composition_b_ions_coefficients_1?.min} max={cResponse.Perovskite_composition_b_ions_coefficients_1?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_composition_b_ions_coefficients_2?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_composition_b_ions_coefficients_2?.min} and {cResponse.Perovskite_composition_b_ions_coefficients_2?.max}</p>
                        <input type="number" name="Perovskite_composition_b_ions_coefficients_2" id="Perovskite_composition_b_ions_coefficients_2" className="text_box" defaultValue={cResponse.Perovskite_composition_b_ions_coefficients_2?.min} min={cResponse.Perovskite_composition_b_ions_coefficients_2?.min} max={cResponse.Perovskite_composition_b_ions_coefficients_2?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_composition_b_ions_coefficients_3?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_composition_b_ions_coefficients_3?.min} and {cResponse.Perovskite_composition_b_ions_coefficients_3?.max}</p>
                        <input type="number" name="Perovskite_composition_b_ions_coefficients_3" id="Perovskite_composition_b_ions_coefficients_3" className="text_box" defaultValue={cResponse.Perovskite_composition_b_ions_coefficients_3?.min} min={cResponse.Perovskite_composition_b_ions_coefficients_3?.min} max={cResponse.Perovskite_composition_b_ions_coefficients_3?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_composition_c_ions_0?.title}</h2>
                        <select id="Perovskite_composition_c_ions_0" name="Perovskite_composition_c_ions_0" className="cat_drop" required defaultValue={cResponse.Perovskite_composition_c_ions_0?.u_val.includes("None") ? "None" : cResponse.Perovskite_composition_c_ions_0?.max}>
                            {cResponse.Perovskite_composition_c_ions_0?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_composition_c_ions_1?.title}</h2>
                        <select id="Perovskite_composition_c_ions_1" name="Perovskite_composition_c_ions_1" className="cat_drop" required defaultValue={cResponse.Perovskite_composition_c_ions_1?.u_val.includes("None") ? "None" : cResponse.Perovskite_composition_c_ions_1?.max}>
                            {cResponse.Perovskite_composition_c_ions_1?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_composition_c_ions_2?.title}</h2>
                        <select id="Perovskite_composition_c_ions_2" name="Perovskite_composition_c_ions_2" className="cat_drop" required defaultValue={cResponse.Perovskite_composition_c_ions_2?.u_val.includes("None") ? "None" : cResponse.Perovskite_composition_c_ions_2?.max}>
                            {cResponse.Perovskite_composition_c_ions_2?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_composition_c_ions_3?.title}</h2>
                        <select id="Perovskite_composition_c_ions_3" name="Perovskite_composition_c_ions_3" className="cat_drop" required defaultValue={cResponse.Perovskite_composition_c_ions_3?.u_val.includes("None") ? "None" : cResponse.Perovskite_composition_c_ions_3?.max}>
                            {cResponse.Perovskite_composition_c_ions_3?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_composition_c_ions_coefficients_0?.title}</h2>
                        <p id="limiter">Enter value between 0 and {cResponse.Perovskite_composition_c_ions_coefficients_0?.max}</p>
                        <input type="number" name="Perovskite_composition_c_ions_coefficients_0" id="Perovskite_composition_c_ions_coefficients_0" className="text_box" defaultValue="0" min="0" max={cResponse.Perovskite_composition_c_ions_coefficients_0?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_composition_c_ions_coefficients_1?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_composition_c_ions_coefficients_1?.min} and {cResponse.Perovskite_composition_c_ions_coefficients_1?.max}</p>
                        <input type="number" name="Perovskite_composition_c_ions_coefficients_1" id="Perovskite_composition_c_ions_coefficients_1" className="text_box" defaultValue={cResponse.Perovskite_composition_c_ions_coefficients_1?.min} min={cResponse.Perovskite_composition_c_ions_coefficients_1?.min} max={cResponse.Perovskite_composition_c_ions_coefficients_1?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_composition_c_ions_coefficients_2?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_composition_c_ions_coefficients_2?.min} and {cResponse.Perovskite_composition_c_ions_coefficients_2?.max}</p>
                        <input type="number" name="Perovskite_composition_c_ions_coefficients_2" id="Perovskite_composition_c_ions_coefficients_2" className="text_box" defaultValue={cResponse.Perovskite_composition_c_ions_coefficients_2?.min} min={cResponse.Perovskite_composition_c_ions_coefficients_2?.min} max={cResponse.Perovskite_composition_c_ions_coefficients_2?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_composition_c_ions_coefficients_3?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_composition_c_ions_coefficients_3?.min} and {cResponse.Perovskite_composition_c_ions_coefficients_3?.max}</p>
                        <input type="number" name="Perovskite_composition_c_ions_coefficients_3" id="Perovskite_composition_c_ions_coefficients_3" className="text_box" defaultValue={cResponse.Perovskite_composition_c_ions_coefficients_3?.min} min={cResponse.Perovskite_composition_c_ions_coefficients_3?.min} max={cResponse.Perovskite_composition_c_ions_coefficients_3?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">Perovskite composition lead-free</h2>
                        <select id="Perovskite_composition_leadfree_bool" name="Perovskite_composition_leadfree_bool" className="cat_drop" required defaultValue={cResponse.Perovskite_composition_leadfree_bool?.u_val.includes("None") ? "None" : cResponse.Perovskite_composition_leadfree_bool?.max}>
                            {cResponse.Perovskite_composition_leadfree_bool?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">Perovskite band gap graded</h2>
                        <select id="Perovskite_band_gap_graded_bool" name="Perovskite_band_gap_graded_bool" className="cat_drop" required defaultValue={cResponse.Perovskite_band_gap_graded_bool?.u_val.includes("None") ? "None" : cResponse.Perovskite_band_gap_graded_bool?.max}>
                            {cResponse.Perovskite_band_gap_graded_bool?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">Perovskite deposition number of deposition steps</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_deposition_number_of_deposition_steps_numeric?.min} and {cResponse.Perovskite_deposition_number_of_deposition_steps_numeric?.max}</p>
                        <input type="number" name="Perovskite_deposition_number_of_deposition_steps_numeric" id="Perovskite_deposition_number_of_deposition_steps_numeric" className="text_box" defaultValue={cResponse.Perovskite_deposition_number_of_deposition_steps_numeric?.min} min={cResponse.Perovskite_deposition_number_of_deposition_steps_numeric?.min} max={cResponse.Perovskite_deposition_number_of_deposition_steps_numeric?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_deposition_procedure_0?.title}</h2>
                        <select id="Perovskite_deposition_procedure_0" name="Perovskite_deposition_procedure_0" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_procedure_0?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_procedure_0?.max}>
                            {cResponse.Perovskite_deposition_procedure_0?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_procedure_1?.title}</h2>
                        <select id="Perovskite_deposition_procedure_1" name="Perovskite_deposition_procedure_1" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_procedure_1?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_procedure_1?.max}>
                            {cResponse.Perovskite_deposition_procedure_1?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_procedure_2?.title}</h2>
                        <select id="Perovskite_deposition_procedure_2" name="Perovskite_deposition_procedure_2" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_procedure_2?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_procedure_2?.max}>
                            {cResponse.Perovskite_deposition_procedure_2?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_procedure_3?.title}</h2>
                        <select id="Perovskite_deposition_procedure_3" name="Perovskite_deposition_procedure_3" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_procedure_3?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_procedure_3?.max}>
                            {cResponse.Perovskite_deposition_procedure_3?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_procedure_4?.title}</h2>
                        <select id="Perovskite_deposition_procedure_4" name="Perovskite_deposition_procedure_4" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_procedure_4?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_procedure_4?.max}>
                            {cResponse.Perovskite_deposition_procedure_4?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_procedure_5?.title}</h2>
                        <select id="Perovskite_deposition_procedure_5" name="Perovskite_deposition_procedure_5" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_procedure_5?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_procedure_5?.max}>
                            {cResponse.Perovskite_deposition_procedure_5?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_aggregation_state_of_reactants_0?.title}</h2>
                        <select id="Perovskite_deposition_aggregation_state_of_reactants_0" name="Perovskite_deposition_aggregation_state_of_reactants_0" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_aggregation_state_of_reactants_0?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_aggregation_state_of_reactants_0?.max}>
                            {cResponse.Perovskite_deposition_aggregation_state_of_reactants_0?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_aggregation_state_of_reactants_1?.title}</h2>
                        <select id="Perovskite_deposition_aggregation_state_of_reactants_1" name="Perovskite_deposition_aggregation_state_of_reactants_1" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_aggregation_state_of_reactants_1?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_aggregation_state_of_reactants_1?.max}>
                            {cResponse.Perovskite_deposition_aggregation_state_of_reactants_1?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_aggregation_state_of_reactants_2?.title}</h2>
                        <select id="Perovskite_deposition_aggregation_state_of_reactants_2" name="Perovskite_deposition_aggregation_state_of_reactants_2" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_aggregation_state_of_reactants_2?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_aggregation_state_of_reactants_2?.max}>
                            {cResponse.Perovskite_deposition_aggregation_state_of_reactants_2?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_aggregation_state_of_reactants_3?.title}</h2>
                        <select id="Perovskite_deposition_aggregation_state_of_reactants_3" name="Perovskite_deposition_aggregation_state_of_reactants_3" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_aggregation_state_of_reactants_3?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_aggregation_state_of_reactants_3?.max}>
                            {cResponse.Perovskite_deposition_aggregation_state_of_reactants_3?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_aggregation_state_of_reactants_4?.title}</h2>
                        <select id="Perovskite_deposition_aggregation_state_of_reactants_4" name="Perovskite_deposition_aggregation_state_of_reactants_4" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_aggregation_state_of_reactants_4?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_aggregation_state_of_reactants_4?.max}>
                            {cResponse.Perovskite_deposition_aggregation_state_of_reactants_4?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_aggregation_state_of_reactants_5?.title}</h2>
                        <select id="Perovskite_deposition_aggregation_state_of_reactants_5" name="Perovskite_deposition_aggregation_state_of_reactants_5" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_aggregation_state_of_reactants_5?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_aggregation_state_of_reactants_5?.max}>
                            {cResponse.Perovskite_deposition_aggregation_state_of_reactants_5?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_synthesis_atmosphere_0?.title}</h2>
                        <select id="Perovskite_deposition_synthesis_atmosphere_0" name="Perovskite_deposition_synthesis_atmosphere_0" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_synthesis_atmosphere_0?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_synthesis_atmosphere_0?.max}>
                            {cResponse.Perovskite_deposition_synthesis_atmosphere_0?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_synthesis_atmosphere_1?.title}</h2>
                        <select id="Perovskite_deposition_synthesis_atmosphere_1" name="Perovskite_deposition_synthesis_atmosphere_1" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_synthesis_atmosphere_1?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_synthesis_atmosphere_1?.max}>
                            {cResponse.Perovskite_deposition_synthesis_atmosphere_1?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_solvents_0?.title}</h2>
                        <select id="Perovskite_deposition_solvents_0" name="Perovskite_deposition_solvents_0" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_solvents_0?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_solvents_0?.max}>
                            {cResponse.Perovskite_deposition_solvents_0?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_solvents_1?.title}</h2>
                        <select id="Perovskite_deposition_solvents_1" name="Perovskite_deposition_solvents_1" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_solvents_1?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_solvents_1?.max}>
                            {cResponse.Perovskite_deposition_solvents_1?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_solvents_2?.title}</h2>
                        <select id="Perovskite_deposition_solvents_2" name="Perovskite_deposition_solvents_2" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_solvents_2?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_solvents_2?.max}>
                            {cResponse.Perovskite_deposition_solvents_2?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_solvents_3?.title}</h2>
                        <select id="Perovskite_deposition_solvents_3" name="Perovskite_deposition_solvents_3" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_solvents_3?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_solvents_3?.max}>
                            {cResponse.Perovskite_deposition_solvents_3?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_solvents_4?.title}</h2>
                        <select id="Perovskite_deposition_solvents_4" name="Perovskite_deposition_solvents_4" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_solvents_4?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_solvents_4?.max}>
                            {cResponse.Perovskite_deposition_solvents_4?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_solvents_5?.title}</h2>
                        <select id="Perovskite_deposition_solvents_5" name="Perovskite_deposition_solvents_5" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_solvents_5?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_solvents_5?.max}>
                            {cResponse.Perovskite_deposition_solvents_5?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_solvents_mixing_ratios_0?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_deposition_solvents_mixing_ratios_0?.min} and {cResponse.Perovskite_deposition_solvents_mixing_ratios_0?.max}</p>
                        <input type="number" name="Perovskite_deposition_solvents_mixing_ratios_0" id="Perovskite_deposition_solvents_mixing_ratios_0" className="text_box" defaultValue={cResponse.Perovskite_deposition_solvents_mixing_ratios_0?.min} min={cResponse.Perovskite_deposition_solvents_mixing_ratios_0?.min} max={cResponse.Perovskite_deposition_solvents_mixing_ratios_0?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_deposition_solvents_mixing_ratios_1?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_deposition_solvents_mixing_ratios_1?.min} and {cResponse.Perovskite_deposition_solvents_mixing_ratios_1?.max}</p>
                        <input type="number" name="Perovskite_deposition_solvents_mixing_ratios_1" id="Perovskite_deposition_solvents_mixing_ratios_1" className="text_box" defaultValue={cResponse.Perovskite_deposition_solvents_mixing_ratios_1?.min} min={cResponse.Perovskite_deposition_solvents_mixing_ratios_1?.min} max={cResponse.Perovskite_deposition_solvents_mixing_ratios_1?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_deposition_solvents_mixing_ratios_2?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_deposition_solvents_mixing_ratios_2?.min} and {cResponse.Perovskite_deposition_solvents_mixing_ratios_2?.max}</p>
                        <input type="number" name="Perovskite_deposition_solvents_mixing_ratios_2" id="Perovskite_deposition_solvents_mixing_ratios_2" className="text_box" defaultValue={cResponse.Perovskite_deposition_solvents_mixing_ratios_2?.min} min={cResponse.Perovskite_deposition_solvents_mixing_ratios_2?.min} max={cResponse.Perovskite_deposition_solvents_mixing_ratios_2?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_deposition_solvents_mixing_ratios_3?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_deposition_solvents_mixing_ratios_3?.min} and {cResponse.Perovskite_deposition_solvents_mixing_ratios_3?.max}</p>
                        <input type="number" name="Perovskite_deposition_solvents_mixing_ratios_3" id="Perovskite_deposition_solvents_mixing_ratios_3" className="text_box" defaultValue={cResponse.Perovskite_deposition_solvents_mixing_ratios_3?.min} min={cResponse.Perovskite_deposition_solvents_mixing_ratios_3?.min} max={cResponse.Perovskite_deposition_solvents_mixing_ratios_3?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_deposition_solvents_mixing_ratios_4?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_deposition_solvents_mixing_ratios_4?.min} and {cResponse.Perovskite_deposition_solvents_mixing_ratios_4?.max}</p>
                        <input type="number" name="Perovskite_deposition_solvents_mixing_ratios_4" id="Perovskite_deposition_solvents_mixing_ratios_4" className="text_box" defaultValue={cResponse.Perovskite_deposition_solvents_mixing_ratios_4?.min} min={cResponse.Perovskite_deposition_solvents_mixing_ratios_4?.min} max={cResponse.Perovskite_deposition_solvents_mixing_ratios_4?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_deposition_solvents_mixing_ratios_5?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_deposition_solvents_mixing_ratios_5?.min} and {cResponse.Perovskite_deposition_solvents_mixing_ratios_5?.max}</p>
                        <input type="number" name="Perovskite_deposition_solvents_mixing_ratios_5" id="Perovskite_deposition_solvents_mixing_ratios_5" className="text_box" defaultValue={cResponse.Perovskite_deposition_solvents_mixing_ratios_5?.min} min={cResponse.Perovskite_deposition_solvents_mixing_ratios_5?.min} max={cResponse.Perovskite_deposition_solvents_mixing_ratios_5?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_deposition_quenching_induced_crystallisation_bool?.title}</h2>
                        <select id="Perovskite_deposition_quenching_induced_crystallisation_bool" name="Perovskite_deposition_quenching_induced_crystallisation_bool" className="cat_drop" required defaultValue={cResponse.Perovskite_deposition_quenching_induced_crystallisation_bool?.u_val.includes("None") ? "None" : cResponse.Perovskite_deposition_quenching_induced_crystallisation_bool?.max}>
                            {cResponse.Perovskite_deposition_quenching_induced_crystallisation_bool?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Perovskite_deposition_thermal_annealing_temperature_0?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_deposition_thermal_annealing_temperature_0?.min} and {cResponse.Perovskite_deposition_thermal_annealing_temperature_0?.max}</p>
                        <input type="number" name="Perovskite_deposition_thermal_annealing_temperature_0" id="Perovskite_deposition_thermal_annealing_temperature_0" className="text_box" defaultValue={cResponse.Perovskite_deposition_thermal_annealing_temperature_0?.min} min={cResponse.Perovskite_deposition_thermal_annealing_temperature_0?.min} max={cResponse.Perovskite_deposition_thermal_annealing_temperature_0?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_deposition_thermal_annealing_temperature_1?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_deposition_thermal_annealing_temperature_1?.min} and {cResponse.Perovskite_deposition_thermal_annealing_temperature_1?.max}</p>
                        <input type="number" name="Perovskite_deposition_thermal_annealing_temperature_1" id="Perovskite_deposition_thermal_annealing_temperature_1" className="text_box" defaultValue={cResponse.Perovskite_deposition_thermal_annealing_temperature_1?.min} min={cResponse.Perovskite_deposition_thermal_annealing_temperature_1?.min} max={cResponse.Perovskite_deposition_thermal_annealing_temperature_1?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_deposition_thermal_annealing_time_0?.title}</h2>
                        <p id="limiter">Enter value between 0 and {cResponse.Perovskite_deposition_thermal_annealing_time_0?.max}</p>
                        <input type="number" name="Perovskite_deposition_thermal_annealing_time_0" id="Perovskite_deposition_thermal_annealing_time_0" className="text_box" defaultValue="0" min="0" max={cResponse.Perovskite_deposition_thermal_annealing_time_0?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Perovskite_deposition_thermal_annealing_time_1?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Perovskite_deposition_thermal_annealing_time_1?.min} and {cResponse.Perovskite_deposition_thermal_annealing_time_1?.max}</p>
                        <input type="number" name="Perovskite_deposition_thermal_annealing_time_1" id="Perovskite_deposition_thermal_annealing_time_1" className="text_box" defaultValue={cResponse.Perovskite_deposition_thermal_annealing_time_1?.min} min={cResponse.Perovskite_deposition_thermal_annealing_time_1?.min} max={cResponse.Perovskite_deposition_thermal_annealing_time_1?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.HTL_stack_sequence_0?.title}</h2>
                        <select id="HTL_stack_sequence_0" name="HTL_stack_sequence_0" className="cat_drop" required defaultValue={cResponse.HTL_stack_sequence_0?.u_val.includes("None") ? "None" : cResponse.HTL_stack_sequence_0?.max}>
                            {cResponse.HTL_stack_sequence_0?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.HTL_stack_sequence_1?.title}</h2>
                        <select id="HTL_stack_sequence_1" name="HTL_stack_sequence_1" className="cat_drop" required defaultValue={cResponse.HTL_stack_sequence_1?.u_val.includes("None") ? "None" : cResponse.HTL_stack_sequence_1?.max}>
                            {cResponse.HTL_stack_sequence_1?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.HTL_stack_sequence_2?.title}</h2>
                        <select id="HTL_stack_sequence_2" name="HTL_stack_sequence_2" className="cat_drop" required defaultValue={cResponse.HTL_stack_sequence_2?.u_val.includes("None") ? "None" : cResponse.HTL_stack_sequence_2?.max}>
                            {cResponse.HTL_stack_sequence_2?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.HTL_additives_compounds_0?.title}</h2>
                        <select id="HTL_additives_compounds_0" name="HTL_additives_compounds_0" className="cat_drop" required defaultValue={cResponse.HTL_additives_compounds_0?.u_val.includes("None") ? "None" : cResponse.HTL_additives_compounds_0?.max}>
                            {cResponse.HTL_additives_compounds_0?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.HTL_additives_compounds_1?.title}</h2>
                        <select id="HTL_additives_compounds_1" name="HTL_additives_compounds_1" className="cat_drop" required defaultValue={cResponse.HTL_additives_compounds_1?.u_val.includes("None") ? "None" : cResponse.HTL_additives_compounds_1?.max}>
                            {cResponse.HTL_additives_compounds_1?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.HTL_additives_compounds_2?.title}</h2>
                        <select id="HTL_additives_compounds_2" name="HTL_additives_compounds_2" className="cat_drop" required defaultValue={cResponse.HTL_additives_compounds_2?.u_val.includes("None") ? "None" : cResponse.HTL_additives_compounds_2?.max}>
                            {cResponse.HTL_additives_compounds_2?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.HTL_additives_compounds_3?.title}</h2>
                        <select id="HTL_additives_compounds_3" name="HTL_additives_compounds_3" className="cat_drop" required defaultValue={cResponse.HTL_additives_compounds_3?.u_val.includes("None") ? "None" : cResponse.HTL_additives_compounds_3?.max}>
                            {cResponse.HTL_additives_compounds_3?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.HTL_additives_compounds_4?.title}</h2>
                        <select id="HTL_additives_compounds_4" name="HTL_additives_compounds_4" className="cat_drop" required defaultValue={cResponse.HTL_additives_compounds_4?.u_val.includes("None") ? "None" : cResponse.HTL_additives_compounds_4?.max}>
                            {cResponse.HTL_additives_compounds_4?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.HTL_deposition_procedure_0?.title}</h2>
                        <select id="HTL_deposition_procedure_0" name="HTL_deposition_procedure_0" className="cat_drop" required defaultValue={cResponse.HTL_deposition_procedure_0?.u_val.includes("None") ? "None" : cResponse.HTL_deposition_procedure_0?.max}>
                            {cResponse.HTL_deposition_procedure_0?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.HTL_deposition_procedure_1?.title}</h2>
                        <select id="HTL_deposition_procedure_1" name="HTL_deposition_procedure_1" className="cat_drop" required defaultValue={cResponse.HTL_deposition_procedure_1?.u_val.includes("None") ? "None" : cResponse.HTL_deposition_procedure_1?.max}>
                            {cResponse.HTL_deposition_procedure_1?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.HTL_deposition_procedure_2?.title}</h2>
                        <select id="HTL_deposition_procedure_2" name="HTL_deposition_procedure_2" className="cat_drop" required defaultValue={cResponse.HTL_deposition_procedure_2?.u_val.includes("None") ? "None" : cResponse.HTL_deposition_procedure_2?.max}>
                            {cResponse.HTL_deposition_procedure_2?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.HTL_deposition_procedure_3?.title}</h2>
                        <select id="HTL_deposition_procedure_3" name="HTL_deposition_procedure_3" className="cat_drop" required defaultValue={cResponse.HTL_deposition_procedure_3?.u_val.includes("None") ? "None" : cResponse.HTL_deposition_procedure_3?.max}>
                            {cResponse.HTL_deposition_procedure_3?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.HTL_deposition_procedure_4?.title}</h2>
                        <select id="HTL_deposition_procedure_4" name="HTL_deposition_procedure_4" className="cat_drop" required defaultValue={cResponse.HTL_deposition_procedure_4?.u_val.includes("None") ? "None" : cResponse.HTL_deposition_procedure_4?.max}>
                            {cResponse.HTL_deposition_procedure_4?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.HTL_deposition_procedure_5?.title}</h2>
                        <select id="HTL_deposition_procedure_5" name="HTL_deposition_procedure_5" className="cat_drop" required defaultValue={cResponse.HTL_deposition_procedure_5?.u_val.includes("None") ? "None" : cResponse.HTL_deposition_procedure_5?.max}>
                            {cResponse.HTL_deposition_procedure_5?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Backcontact_stack_sequence_0?.title}</h2>
                        <select id="Backcontact_stack_sequence_0" name="Backcontact_stack_sequence_0" className="cat_drop" required defaultValue={cResponse.Backcontact_stack_sequence_0?.u_val.includes("None") ? "None" : cResponse.Backcontact_stack_sequence_0?.max}>
                            {cResponse.Backcontact_stack_sequence_0?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Backcontact_stack_sequence_1?.title}</h2>
                        <select id="Backcontact_stack_sequence_1" name="Backcontact_stack_sequence_1" className="cat_drop" required defaultValue={cResponse.Backcontact_stack_sequence_1?.u_val.includes("None") ? "None" : cResponse.Backcontact_stack_sequence_1?.max}>
                            {cResponse.Backcontact_stack_sequence_1?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Backcontact_stack_sequence_2?.title}</h2>
                        <select id="Backcontact_stack_sequence_2" name="Backcontact_stack_sequence_2" className="cat_drop" required defaultValue={cResponse.Backcontact_stack_sequence_2?.u_val.includes("None") ? "None" : cResponse.Backcontact_stack_sequence_2?.max}>
                            {cResponse.Backcontact_stack_sequence_2?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Backcontact_stack_sequence_3?.title}</h2>
                        <select id="Backcontact_stack_sequence_3" name="Backcontact_stack_sequence_3" className="cat_drop" required defaultValue={cResponse.Backcontact_stack_sequence_3?.u_val.includes("None") ? "None" : cResponse.Backcontact_stack_sequence_3?.max}>
                            {cResponse.Backcontact_stack_sequence_3?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Backcontact_stack_sequence_4?.title}</h2>
                        <select id="Backcontact_stack_sequence_4" name="Backcontact_stack_sequence_4" className="cat_drop" required defaultValue={cResponse.Backcontact_stack_sequence_4?.u_val.includes("None") ? "None" : cResponse.Backcontact_stack_sequence_4?.max}>
                            {cResponse.Backcontact_stack_sequence_4?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Backcontact_thickness_list_0?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Backcontact_thickness_list_0?.min} and {cResponse.Backcontact_thickness_list_0?.max}</p>
                        <input type="number" name="Backcontact_thickness_list_0" id="Backcontact_thickness_list_0" className="text_box" defaultValue={cResponse.Backcontact_thickness_list_0?.min} min={cResponse.Backcontact_thickness_list_0?.min} max={cResponse.Backcontact_thickness_list_0?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Backcontact_thickness_list_1?.title}</h2>
                        <p id="limiter">Enter value between {cResponse.Backcontact_thickness_list_1?.min} and {cResponse.Backcontact_thickness_list_1?.max}</p>
                        <input type="number" name="Backcontact_thickness_list_1" id="Backcontact_thickness_list_1" className="text_box" defaultValue={cResponse.Backcontact_thickness_list_1?.min} min={cResponse.Backcontact_thickness_list_1?.min} max={cResponse.Backcontact_thickness_list_1?.max} step="0.0001" placeholder="0" required ></input>
                        <h2 id="colName">{cResponse.Backcontact_deposition_procedure_0?.title}</h2>
                        <select id="Backcontact_deposition_procedure_0" name="Backcontact_deposition_procedure_0" className="cat_drop" required defaultValue={cResponse.Backcontact_deposition_procedure_0?.u_val.includes("None") ? "None" : cResponse.Backcontact_deposition_procedure_0?.max}>
                            {cResponse.Backcontact_deposition_procedure_0?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">{cResponse.Backcontact_deposition_procedure_1?.title}</h2>
                        <select id="Backcontact_deposition_procedure_1" name="Backcontact_deposition_procedure_1" className="cat_drop" required defaultValue={cResponse.Backcontact_deposition_procedure_1?.u_val.includes("None") ? "None" : cResponse.Backcontact_deposition_procedure_1?.max}>
                            {cResponse.Backcontact_deposition_procedure_1?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                        <h2 id="colName">Encapsulation</h2>
                        <select id="Encapsulation_bool" name="Encapsulation_bool" className="cat_drop" required defaultValue={cResponse.Encapsulation_bool?.u_val.includes("None") ? "None" : cResponse.Encapsulation_bool?.max}>
                            {cResponse.Encapsulation_bool?.u_val.map(val => (<option value={val}>{val}</option>))}
                        </select>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div id="submit_cover"><input type="submit" id="submit_btn" value="Predict" /></div>
                    <br />
                    <br />
                    <br />
                    <div id="result">
                        {/* <h2 id="result_text">{loading? "Predicting ...." : "" }</h2> */}
                        <h2 id="result_text">{clicked && !loading ? "PREDICTED PCE " : ""}&emsp;</h2>
                        <div>
                            <h2 id="result_text_main">{loading ? <HashLoader color={color} loading={loading} cssOverride={override} size={30} /> : getPCE.value}</h2>
                        </div>
                        <div>
                            <br></br>
                            <br></br>
                            <div>{getPCE.value == 0.0 && !loading ? alert("Tune the Parameters Respective to Real Observation for Optimal Results") : ""}</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

};