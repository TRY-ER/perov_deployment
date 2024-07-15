from fastapi import FastAPI, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
import joblib
import numpy as np
import os
from utils.preprocess import preprocess
from utils.feature_distribution import feature_dict
import sklearn

# Todos:
# 1. Need to setup a pipeline to categorize the features and create a relevant json
# 2. Send it in the get request
# 3. parse in the frontend

col_data = joblib.load("./utils/serial_data/col_bool_mod.z")

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])


@app.get("/predict")
async def test():
    return jsonable_encoder({"feat_list": col_data, "feat_dict": feature_dict})


@app.post("/predict")
async def provide(data: list):
    output = main(data)
    return output


def predict_main(df):
    num_folds = len(os.listdir("./models/xgboost_old")) - 3
    result_li = []
    for fold in range(num_folds):
        print(f"predicting for fold {fold} / {num_folds}")
        model = joblib.load(
            f"./models/xgboost_old/{fold}_xg_boost_reg_no_optim/{fold}_model.z"
        )
        print(df.shape)
        result = model.predict(df)
        print(result)
        result_li.append(result)
    return np.mean(result_li)


def main(data):
    df = preprocess(data)
    res = predict_main(df)
    print(res)
    return {
        "value":
        f"{np.float64(res).item():.3f}"
        if res >= 0 else f"{np.float64(0).item()}"
    }


if __name__ == "__main__":
    data = [['Cell_area_measured_numeric', '0.0004'],
            ['Cell_architecture_cat', 'nip'],
            ['Substrate_stack_sequence_0', 'SLG'],
            ['Substrate_stack_sequence_1', 'FTO'],
            ['Substrate_stack_sequence_2', 'None'],
            ['Substrate_stack_sequence_3', 'None'],
            ['Substrate_stack_sequence_4', 'None'],
            ['ETL_stack_sequence_0', 'TiO2-c'],
            ['ETL_stack_sequence_1', 'TiO2-mp'],
            ['ETL_stack_sequence_2', 'None'], ['ETL_stack_sequence_3', 'None'],
            ['ETL_stack_sequence_4', 'None'], ['ETL_stack_sequence_5', 'None'],
            ['ETL_stack_sequence_6', 'None'],
            ['ETL_deposition_procedure_0', 'Spray-pyrolys'],
            ['ETL_deposition_procedure_1', 'Spin-coating'],
            ['ETL_deposition_procedure_2', 'None'],
            ['ETL_deposition_procedure_3', 'None'],
            ['ETL_deposition_procedure_4', 'None'],
            ['ETL_deposition_procedure_5', 'None'],
            ['ETL_deposition_procedure_6', 'None'],
            ['Perovskite_composition_a_ions_0', 'FA'],
            ['Perovskite_composition_a_ions_1', 'None'],
            ['Perovskite_composition_a_ions_2', 'None'],
            ['Perovskite_composition_a_ions_3', 'None'],
            ['Perovskite_composition_a_ions_coefficients_0', '0.005'],
            ['Perovskite_composition_a_ions_coefficients_1', '0'],
            ['Perovskite_composition_a_ions_coefficients_2', '0'],
            ['Perovskite_composition_a_ions_coefficients_3', '0'],
            ['Perovskite_composition_b_ions_0', 'Pb'],
            ['Perovskite_composition_b_ions_1', 'None'],
            ['Perovskite_composition_b_ions_2', 'None'],
            ['Perovskite_composition_b_ions_3', 'None'],
            ['Perovskite_composition_b_ions_coefficients_0', '0'],
            ['Perovskite_composition_b_ions_coefficients_1', '0'],
            ['Perovskite_composition_b_ions_coefficients_2', '0'],
            ['Perovskite_composition_b_ions_coefficients_3', '0'],
            ['Perovskite_composition_c_ions_0', 'I'],
            ['Perovskite_composition_c_ions_1', 'None'],
            ['Perovskite_composition_c_ions_2', 'None'],
            ['Perovskite_composition_c_ions_3', 'None'],
            ['Perovskite_composition_c_ions_coefficients_0', '-4.44e-16'],
            ['Perovskite_composition_c_ions_coefficients_1', '0'],
            ['Perovskite_composition_c_ions_coefficients_2', '0'],
            ['Perovskite_composition_c_ions_coefficients_3', '0'],
            ['Perovskite_composition_leadfree_bool', 'Yes'],
            ['Perovskite_band_gap_graded_bool', 'No'],
            ['Perovskite_deposition_number_of_deposition_steps_numeric', '0'],
            [
                'Perovskite_deposition_procedure_0',
                'Space-limited inverse temperature crystallization'
            ], ['Perovskite_deposition_procedure_1', 'Ultrasonic spray'],
            ['Perovskite_deposition_procedure_2', 'None'],
            ['Perovskite_deposition_procedure_3', 'None'],
            ['Perovskite_deposition_procedure_4', 'None'],
            ['Perovskite_deposition_procedure_5', 'None'],
            [
                'Perovskite_deposition_aggregation_state_of_reactants_0',
                'Liquid'
            ],
            ['Perovskite_deposition_aggregation_state_of_reactants_1', 'None'],
            ['Perovskite_deposition_aggregation_state_of_reactants_2', 'None'],
            ['Perovskite_deposition_aggregation_state_of_reactants_3', 'None'],
            ['Perovskite_deposition_aggregation_state_of_reactants_4', 'None'],
            ['Perovskite_deposition_aggregation_state_of_reactants_5', 'None'],
            ['Perovskite_deposition_synthesis_atmosphere_0', 'N2'],
            ['Perovskite_deposition_synthesis_atmosphere_1', 'None'],
            ['Perovskite_deposition_solvents_0', 'DMSO'],
            ['Perovskite_deposition_solvents_1', 'None'],
            ['Perovskite_deposition_solvents_2', 'None'],
            ['Perovskite_deposition_solvents_3', 'None'],
            ['Perovskite_deposition_solvents_4', 'None'],
            ['Perovskite_deposition_solvents_5', 'None'],
            ['Perovskite_deposition_solvents_mixing_ratios_0', '1'],
            ['Perovskite_deposition_solvents_mixing_ratios_1', '0'],
            ['Perovskite_deposition_solvents_mixing_ratios_2', '0'],
            ['Perovskite_deposition_solvents_mixing_ratios_3', '0'],
            ['Perovskite_deposition_solvents_mixing_ratios_4', '0'],
            ['Perovskite_deposition_solvents_mixing_ratios_5', '0'],
            [
                'Perovskite_deposition_quenching_induced_crystallisation_bool',
                'No'
            ], ['Perovskite_deposition_thermal_annealing_temperature_0', '0'],
            ['Perovskite_deposition_thermal_annealing_temperature_1', '0'],
            ['Perovskite_deposition_thermal_annealing_time_0', '-3.55e-15'],
            ['Perovskite_deposition_thermal_annealing_time_1', '0'],
            ['HTL_stack_sequence_0', 'Selenium'],
            ['HTL_stack_sequence_1', 'None'], ['HTL_stack_sequence_2', 'None'],
            ['HTL_additives_compounds_0', 'Li(CF3SO2)2N'],
            ['HTL_additives_compounds_1', 'TBP'],
            ['HTL_additives_compounds_2', 'None'],
            ['HTL_additives_compounds_3', 'None'],
            ['HTL_additives_compounds_4', 'None'],
            ['HTL_deposition_procedure_0', 'Spin-coating'],
            ['HTL_deposition_procedure_1', 'None'],
            ['HTL_deposition_procedure_2', 'None'],
            ['HTL_deposition_procedure_3', 'None'],
            ['HTL_deposition_procedure_4', 'None'],
            ['HTL_deposition_procedure_5', 'None'],
            ['Backcontact_stack_sequence_0', 'Au'],
            ['Backcontact_stack_sequence_1', 'None'],
            ['Backcontact_stack_sequence_2', 'None'],
            ['Backcontact_stack_sequence_3', 'None'],
            ['Backcontact_stack_sequence_4', 'None'],
            ['Backcontact_thickness_list_0', '0.5'],
            ['Backcontact_thickness_list_1', '0'],
            ['Backcontact_deposition_procedure_0', 'Evaporation'],
            ['Backcontact_deposition_procedure_1', 'None'],
            ['Encapsulation_bool', 'No']]
    value = main(data)
    print("output>>", value)
