import couchdb
import json
import ijson
import re

# Establish connection to the couchdb
# Insert your admin account and password here
admin = 'cccadmin'
password = 'whysohard24!'

# Form the connection URL and establish connection to couchDB server
url = f'http://{admin}:{password}@172.26.135.17:5984/'
couch = couchdb.Server(url)

# Define the couchdb database name
# If the database doesn't exist, create one; if it does, use it
db_name = 'sudo_data_death'

if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]

# Function to construct a dictionary for count of a certain disease for different states
def construct_count_cancer_dic(state_name, state_list, element, dic, kind, type):
    # If the given phn_code is in the state list, update the dictionary
    if element['properties']["phn_code"] in state_list:
        if state_name in dic.keys():
            if type in dic[state_name].keys():
                dic[state_name][type] = dic[state_name][type] + int(element['properties'][kind])
            else:
                dic[state_name][type] = int(element['properties'][kind])
        else:
            dic[state_name] = {}
            dic[state_name][type] = int(element['properties'][kind])


twitter_filename = "phidu_premature_mortality_by_cause_phn_2014_18-443978920740005408.json"

# Define lists for each state's PHN codes
ACT = ["PHN801"]
NSW = ["PHN101", "PHN102", "PHN103", "PHN104", "PHN105", "PHN106", "PHN107", "PHN108"]
NT = ["PHN201"]
QLD = ["PHN301", "PHN302", "PHN303", "PHN304", "PHN305", "PHN306", "PHN307", "PHN308", "PHN309", "PHN310"]
SA = ["PHN401", "PHN402", "PHN403"]
TAS = ["PHN501"]
VIC = ["PHN601", "PHN602", "PHN603", "PHN604", "PHN605", "PHN606"]
WA = ["PHN701", "PHN702", "PHN703"]

# Define death type list
death_type = ["dths_chrnc_obstrctve_plmnry_dsse_0_74_yrs_2013_to_2017_nmbr",
"dths_rsprtry_systm_dsss_0_74_yrs_2014_to_2018_nmbr",
"dths_scde_slf_inflctd_injrs_0_74_yrs_2014_to_2018_nmbr",
"deaths_from_cancer_0_to_74_years_2014_to_2018_number",
"deaths_cerebrovascular_diseases_0_74_years_2014_to_2018_number",
"deaths_from_external_causes_0_to_74_years_2014_to_2018_number",
"deaths_road_traffic_injuries_0_74_years_2014_to_2018_number",
"deaths_from_diabetes_0_to_74_years_2014_to_2018_number",
"dths_crcltry_systm_dsss_0_74_yrs_2014_to_2018_nmbr",
"deaths_ischaemic_heart_disease_0_74_years_2014_to_2018_number",
]

# Define a dictionary mapping the death types to their respective string labels
death_type_single = {
    "dths_chrnc_obstrctve_plmnry_dsse_0_74_yrs_2013_to_2017_nmbr": "death_of_chronic_obstructive_pulmonary_disease",
    "dths_rsprtry_systm_dsss_0_74_yrs_2014_to_2018_nmbr" : "death_of_respiratory_system_diseases",
    "dths_scde_slf_inflctd_injrs_0_74_yrs_2014_to_2018_nmbr": "death_of_self-inflicted_or_injuries",
    "deaths_from_cancer_0_to_74_years_2014_to_2018_number": "death_of_cancer",
    "deaths_cerebrovascular_diseases_0_74_years_2014_to_2018_number": "death_of_cerebrovascular_diseases",
    "deaths_from_external_causes_0_to_74_years_2014_to_2018_number": "death_of_external_causes",
    "deaths_road_traffic_injuries_0_74_years_2014_to_2018_number": "death_of_road_traffic_injuries",
    "deaths_from_diabetes_0_to_74_years_2014_to_2018_number": "death_of_diabetes",
    "dths_crcltry_systm_dsss_0_74_yrs_2014_to_2018_nmbr": "death_of_circulatory_system_diseases",
    "deaths_ischaemic_heart_disease_0_74_years_2014_to_2018_number": "death_of_ischaemic_heart_disease"
}

# Initialize the total number of deaths and a dictionary to store counts of each death type
whole_number = 0
count_whole_death = {}

for item in death_type:
    count_whole_death[death_type_single[item]] = 0

# Open the data file and load the entire JSON file
with open(twitter_filename, 'r', encoding='utf-8') as file:
    json_whole = json.load(file)
    # Iterate over each feature in the JSON object and add the count of each death type to the respective dictionary entry
    for element in json_whole["features"]:
        for item in death_type:
            count_whole_death[death_type_single[item]] = int(count_whole_death[death_type_single[item]]) + int(
                element['properties'][item])
            whole_number = whole_number + int(element["properties"][item])

    # After finishing processing, add the total count of all deaths to the dictionary and save the dictionary to the database
    count_whole_death["total_death"] = whole_number
    db.save(count_whole_death)



