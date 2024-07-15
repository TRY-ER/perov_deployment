
feature_dict = [{
    "Cell Data": [
        'Cell_area_measured_numeric',
        'Cell_architecture_cat',
    ]
}, {
    "Substrate Data": [
        'Substrate_stack_sequence_0',
        'Substrate_stack_sequence_1',
        'Substrate_stack_sequence_2',
        'Substrate_stack_sequence_3',
        'Substrate_stack_sequence_4',
    ]
}, {
    "ETL Data": [
        'ETL_stack_sequence_0', 'ETL_stack_sequence_1', 'ETL_stack_sequence_2',
        'ETL_stack_sequence_3', 'ETL_stack_sequence_4', 'ETL_stack_sequence_5',
        'ETL_stack_sequence_6', 'ETL_deposition_procedure_0',
        'ETL_deposition_procedure_1', 'ETL_deposition_procedure_2',
        'ETL_deposition_procedure_3', 'ETL_deposition_procedure_4',
        'ETL_deposition_procedure_5', 'ETL_deposition_procedure_6'
    ]
}, {
    "Perovskite Data": [
        'Perovskite_composition_a_ions_0', 'Perovskite_composition_a_ions_1',
        'Perovskite_composition_a_ions_2', 'Perovskite_composition_a_ions_3',
        'Perovskite_composition_a_ions_coefficients_0',
        'Perovskite_composition_a_ions_coefficients_1',
        'Perovskite_composition_a_ions_coefficients_2',
        'Perovskite_composition_a_ions_coefficients_3',
        'Perovskite_composition_b_ions_0', 'Perovskite_composition_b_ions_1',
        'Perovskite_composition_b_ions_2', 'Perovskite_composition_b_ions_3',
        'Perovskite_composition_b_ions_coefficients_0',
        'Perovskite_composition_b_ions_coefficients_1',
        'Perovskite_composition_b_ions_coefficients_2',
        'Perovskite_composition_b_ions_coefficients_3',
        'Perovskite_composition_c_ions_0', 'Perovskite_composition_c_ions_1',
        'Perovskite_composition_c_ions_2', 'Perovskite_composition_c_ions_3',
        'Perovskite_composition_c_ions_coefficients_0',
        'Perovskite_composition_c_ions_coefficients_1',
        'Perovskite_composition_c_ions_coefficients_2',
        'Perovskite_composition_c_ions_coefficients_3',
        'Perovskite_composition_leadfree_bool',
        'Perovskite_band_gap_graded_bool',
        'Perovskite_deposition_number_of_deposition_steps_numeric',
        'Perovskite_deposition_procedure_0',
        'Perovskite_deposition_procedure_1',
        'Perovskite_deposition_procedure_2',
        'Perovskite_deposition_procedure_3',
        'Perovskite_deposition_procedure_4',
        'Perovskite_deposition_procedure_5',
        'Perovskite_deposition_aggregation_state_of_reactants_0',
        'Perovskite_deposition_aggregation_state_of_reactants_1',
        'Perovskite_deposition_aggregation_state_of_reactants_2',
        'Perovskite_deposition_aggregation_state_of_reactants_3',
        'Perovskite_deposition_aggregation_state_of_reactants_4',
        'Perovskite_deposition_aggregation_state_of_reactants_5',
        'Perovskite_deposition_synthesis_atmosphere_0',
        'Perovskite_deposition_synthesis_atmosphere_1'
    ]
}, {
    "Perovskite Reaction Data": [
        'Perovskite_deposition_solvents_0',
        'Perovskite_deposition_solvents_1',
        'Perovskite_deposition_solvents_2',
        'Perovskite_deposition_solvents_3',
        'Perovskite_deposition_solvents_4',
        'Perovskite_deposition_solvents_5',
        'Perovskite_deposition_solvents_mixing_ratios_0',
        'Perovskite_deposition_solvents_mixing_ratios_1',
        'Perovskite_deposition_solvents_mixing_ratios_2',
        'Perovskite_deposition_solvents_mixing_ratios_3',
        'Perovskite_deposition_solvents_mixing_ratios_4',
        'Perovskite_deposition_solvents_mixing_ratios_5',
        'Perovskite_deposition_quenching_induced_crystallisation_bool',
        'Perovskite_deposition_thermal_annealing_temperature_0',
        'Perovskite_deposition_thermal_annealing_temperature_1',
        'Perovskite_deposition_thermal_annealing_time_0',
        'Perovskite_deposition_thermal_annealing_time_1',
    ]
}, {
    "HTL Data": [
        'HTL_stack_sequence_0', 'HTL_stack_sequence_1', 'HTL_stack_sequence_2',
        'HTL_additives_compounds_0', 'HTL_additives_compounds_1',
        'HTL_additives_compounds_2', 'HTL_additives_compounds_3',
        'HTL_additives_compounds_4', 'HTL_deposition_procedure_0',
        'HTL_deposition_procedure_1', 'HTL_deposition_procedure_2',
        'HTL_deposition_procedure_3', 'HTL_deposition_procedure_4',
        'HTL_deposition_procedure_5'
    ]
}, {
    "Backcontact Layer Data": [
        'Backcontact_stack_sequence_0', 'Backcontact_stack_sequence_1',
        'Backcontact_stack_sequence_2', 'Backcontact_stack_sequence_3',
        'Backcontact_stack_sequence_4', 'Backcontact_thickness_list_0',
        'Backcontact_thickness_list_1', 'Backcontact_deposition_procedure_0',
        'Backcontact_deposition_procedure_1'
    ]
}, {
    "Encapsulation Data": ['Encapsulation_bool']
}]

def get_all_param_list(param_list = feature_dict):
    all_param_list = []
    # Iterate through each dictionary in the list
    for category in feature_dict:
        # For each dictionary, iterate through its items
        for key, value in category.items():
            # Extend the all_parameters list with the values (which are lists of strings)
            all_param_list.extend(value)
    return all_param_list 