import "./2d_master.css";
import React, { useEffect, useState, CSSProperties } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
    const [cCat, setCCat] = useState([]);
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
        console.log("prime_data", data);

        if (!response.ok) { console.log("response not working properly"); }
        else {
            setcResponse(data.feat_list);
            setCCat(data.feat_dict);
        }
    }

    const form = document.getElementById("input_form");
    const responseF = (e) => {
        e.preventDefault();
        setLoading(true);
        setClicked(true);
        const formData = new FormData(form);
        console.log("formdata>>", [...formData]);
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

    useEffect(() => {
        console.log("cCat>>", cCat);
    }, [cCat])

    return (
        <div id="main_body">
            <Link to={"/"}>
                <h1 id="title">THE PEROVSKITE <br />
                    SOLAR CELL<br />
                    EFFICIENCY PREDICTOR<br /> </h1>
            </Link>
            <div>
                <form id="input_form" onSubmit={responseF}>
                    <div id="scale">
                        <p>* Lengths are in "cm" Scale </p></div>
                    <div className="box">
                        {
                            cCat?.map((value, key) => {
                                return (<>
                                    {Object.entries(value).map(([nest_key, nest_value]) => {
                                        return (
                                            <>
                                                <h2 id="cat_name">{nest_key}</h2>
                                                {
                                                    nest_value.map((val, val_key) => {
                                                        return (
                                                            <>
                                                                {cResponse[val]?.type === "numeric" ? (
                                                                    <div className="numeric-container">
                                                                        <h2 id="colName">{cResponse[val]?.title}</h2>
                                                                        <p id="limiter">Enter value between {cResponse[val]?.min} and {cResponse[val]?.max}</p>
                                                                        <input type="number" name={val} id={val_key} className="text_box" defaultValue={cResponse[val]?.min} min={cResponse[val]?.min} max={cResponse[val]?.max} step="0.01" placeholder="0" required ></input>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <div className="cat-container">
                                                                            <h2 id="colName">{cResponse[val]?.title}</h2>
                                                                            <select id={val_key} name={val} className="cat_drop" required defaultValue={cResponse[val]?.u_val.includes("None") ? "None" : cResponse[val]?.max}>
                                                                                {cResponse[val]?.u_val.map(v => (<option value={v}>{v}</option>))}
                                                                            </select>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </>

                                                        )
                                                    })
                                                }
                                            </>
                                        )
                                    }
                                    )
                                    }</>)
                            })
                        }
                    </div>
                    {loading ? "" :
                        <div id="submit_cover"><input type="submit" id="submit_btn" value="Predict" /></div>
                    }
                    <div id="result">
                        {/* <h2 id="result_text">{loading? "Predicting ...." : "" }</h2> */}
                        <h2 id="result_text">{clicked && !loading ? "PREDICTED PCE :" : ""}&emsp;</h2>
                        <div>
                            <h2 id="result_text_main">{loading ? <HashLoader color={color} loading={loading} cssOverride={override} size={30} /> : getPCE.value}</h2>
                        </div>
                        <div>
                            <div>{getPCE.value == 0.0 && !loading ? alert("Tune the Parameters Respective to Real Observation for Optimal Results") : ""}</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

};