import joblib
import pandas as pd
import os
from .feature_distribution import feature_dict, get_all_param_list



def preprocess(data):
    '''
    This function is reponsible to preprocess the input data and return it in a model compatible form !
    '''
    cols = [ x[0] for x in data]
    col_val = [ x[1] for x in data]
    dataframe_list = get_all_param_list(feature_dict) 
    dataframe_dict = {}
    for key in dataframe_list:
        if key in cols:
            dataframe_dict[key] = [col_val[cols.index(key)]]
        else:
            dataframe_dict[key] = [0]
    predict_df = pd.DataFrame(dataframe_dict)
    encoders = os.listdir("./encoders")
    exclude_lbl_enc = lambda x : x[:-2]
    enc = list(map(exclude_lbl_enc,encoders))
    mod_df = predict_df.copy()
    for col in predict_df.columns:
        if col in enc:
            lbl_enc = joblib.load(f"./encoders/{col}.z")
            mod_df[col] = lbl_enc.transform(mod_df[col])
    standard_scaler = joblib.load("./scaler/std_scaler.z")
    mod_df = standard_scaler.transform(mod_df)
    mod_df = pd.DataFrame(mod_df,columns=predict_df.columns)
    return mod_df


if __name__ == "__main__":
    data = [['Cell_area_measured_numeric', '0.0004'], ['Cell_architecture_cat', 'nip'], ['Substrate_stack_sequence_0', 'SLG'], ['Substrate_stack_sequence_1', 'FTO'], ['Substrate_stack_sequence_2', 'None'], ['Substrate_stack_sequence_3', 'None'], ['Substrate_stack_sequence_4', 'None'], ['ETL_stack_sequence_0', 'TiO2-c'], ['ETL_stack_sequence_1', 'TiO2-mp'], ['ETL_stack_sequence_2', 'None'], ['ETL_stack_sequence_3', 'None'], ['ETL_stack_sequence_4', 'None'], ['ETL_stack_sequence_5', 'None'], ['ETL_stack_sequence_6', 'None'], ['ETL_deposition_procedure_0', 'Spray-pyrolys'], ['ETL_deposition_procedure_1', 'Spin-coating'], ['ETL_deposition_procedure_2', 'None'], ['ETL_deposition_procedure_3', 'None'], ['ETL_deposition_procedure_4', 'None'], ['ETL_deposition_procedure_5', 'None'], ['ETL_deposition_procedure_6', 'None'], ['Perovskite_composition_a_ions_0', 'Cs'], ['Perovskite_composition_a_ions_1', 'None'], ['Perovskite_composition_a_ions_2', 'None'], ['Perovskite_composition_a_ions_3', 'None'], ['Perovskite_composition_a_ions_coefficients_0', '0.005'], ['Perovskite_composition_a_ions_coefficients_1', '0'], ['Perovskite_composition_a_ions_coefficients_2', '0'], ['Perovskite_composition_a_ions_coefficients_3', '0'], ['Perovskite_composition_b_ions_0', 'Sn'], ['Perovskite_composition_b_ions_1', 'None'], ['Perovskite_composition_b_ions_2', 'None'], ['Perovskite_composition_b_ions_3', 'None'], ['Perovskite_composition_b_ions_coefficients_0', '0'], ['Perovskite_composition_b_ions_coefficients_1', '0'], ['Perovskite_composition_b_ions_coefficients_2', '0'], ['Perovskite_composition_b_ions_coefficients_3', '0'], ['Perovskite_composition_c_ions_0', 'I'], ['Perovskite_composition_c_ions_1', 'None'], ['Perovskite_composition_c_ions_2', 'None'], ['Perovskite_composition_c_ions_3', 'None'], ['Perovskite_composition_c_ions_coefficients_0', '-4.44e-16'], ['Perovskite_composition_c_ions_coefficients_1', '0'], ['Perovskite_composition_c_ions_coefficients_2', '0'], ['Perovskite_composition_c_ions_coefficients_3', '0'], ['Perovskite_composition_leadfree_bool', 'Yes'], ['Perovskite_band_gap_graded_bool', 'No'], ['Perovskite_deposition_number_of_deposition_steps_numeric', '0'], ['Perovskite_deposition_procedure_0', 'Space-limited inverse temperature crystallization'], ['Perovskite_deposition_procedure_1', 'Ultrasonic spray'], ['Perovskite_deposition_procedure_2', 'None'], ['Perovskite_deposition_procedure_3', 'None'], ['Perovskite_deposition_procedure_4', 'None'], ['Perovskite_deposition_procedure_5', 'None'], ['Perovskite_deposition_aggregation_state_of_reactants_0', 'Liquid'], ['Perovskite_deposition_aggregation_state_of_reactants_1', 'None'], ['Perovskite_deposition_aggregation_state_of_reactants_2', 'None'], ['Perovskite_deposition_aggregation_state_of_reactants_3', 'None'], ['Perovskite_deposition_aggregation_state_of_reactants_4', 'None'], ['Perovskite_deposition_aggregation_state_of_reactants_5', 'None'], ['Perovskite_deposition_synthesis_atmosphere_0', 'N2'], ['Perovskite_deposition_synthesis_atmosphere_1', 'None'], ['Perovskite_deposition_solvents_0', 'DMSO'], ['Perovskite_deposition_solvents_1', 'None'], ['Perovskite_deposition_solvents_2', 'None'], ['Perovskite_deposition_solvents_3', 'None'], ['Perovskite_deposition_solvents_4', 'None'], ['Perovskite_deposition_solvents_5', 'None'], ['Perovskite_deposition_solvents_mixing_ratios_0', '1'], ['Perovskite_deposition_solvents_mixing_ratios_1', '0'], ['Perovskite_deposition_solvents_mixing_ratios_2', '0'], ['Perovskite_deposition_solvents_mixing_ratios_3', '0'], ['Perovskite_deposition_solvents_mixing_ratios_4', '0'], ['Perovskite_deposition_solvents_mixing_ratios_5', '0'], ['Perovskite_deposition_quenching_induced_crystallisation_bool', 'No'], ['Perovskite_deposition_thermal_annealing_temperature_0', '0'], ['Perovskite_deposition_thermal_annealing_temperature_1', '0'], ['Perovskite_deposition_thermal_annealing_time_0', '-3.55e-15'], ['Perovskite_deposition_thermal_annealing_time_1', '0'], ['HTL_stack_sequence_0', 'Selenium'], ['HTL_stack_sequence_1', 'None'], ['HTL_stack_sequence_2', 'None'], ['HTL_additives_compounds_0', 'Li(CF3SO2)2N'], ['HTL_additives_compounds_1', 'TBP'], ['HTL_additives_compounds_2', 'None'], ['HTL_additives_compounds_3', 'None'], ['HTL_additives_compounds_4', 'None'], ['HTL_deposition_procedure_0', 'Spin-coating'], ['HTL_deposition_procedure_1', 'None'], ['HTL_deposition_procedure_2', 'None'], ['HTL_deposition_procedure_3', 'None'], ['HTL_deposition_procedure_4', 'None'], ['HTL_deposition_procedure_5', 'None'], ['Backcontact_stack_sequence_0', 'Au'], ['Backcontact_stack_sequence_1', 'None'], ['Backcontact_stack_sequence_2', 'None'], ['Backcontact_stack_sequence_3', 'None'], ['Backcontact_stack_sequence_4', 'None'], ['Backcontact_thickness_list_0', '0.5'], ['Backcontact_thickness_list_1', '0'], ['Backcontact_deposition_procedure_0', 'Evaporation'], ['Backcontact_deposition_procedure_1', 'None'], ['Encapsulation_bool', 'No']]
    value = preprocess(data)
    print(value)
