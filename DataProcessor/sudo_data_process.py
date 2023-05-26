# COMP90024 GROUP48
# Yuhang Zhou     ID:1243037
# Jitao Feng      ID:1265994
# Hui Liu         ID:1336645
# Jihang Yu       ID:1341312
# Xinran Ren      ID:1309373

# need to install couchdb
import couchdb
import json
import ijson
import re

import couchdb
import json
import ijson
import re

# Connect to the CouchDB server
admin = 'cccadmin'  # Admin account
password = 'whysohard24!'  # Password for the account
url = f'http://{admin}:{password}@172.26.135.17:5984/'  # URL to the CouchDB server
couch = couchdb.Server(url)  # Connect to the CouchDB server

# Define the database name
db_name = 'sudo_data'

# Check if the database exists. If not, create it.
if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]

# Function to update the count dictionary based on the kind and type of death
def construct_count_cancer_dic(state_name, state_list, element, dic, kind, type):
    if element['properties']["phn_code"] in state_list:
        if state_name in dic.keys():
            if type in dic[state_name].keys():
                dic[state_name][type] = dic[state_name][type] + int(element['properties'][kind])
            else:
                dic[state_name][type] = int(element['properties'][kind])
        else:
            dic[state_name] = {}
            dic[state_name][type] = int(element['properties'][kind])

# File containing the data
twitter_filename = "phidu_premature_mortality_by_cause_phn_2014_18-443978920740005408.json"

# Define the area codes for each state

ACT = ["PHN801"]
NSW = ["PHN101", "PHN102", "PHN103", "PHN104", "PHN105", "PHN106", "PHN107", "PHN108"]
NT = ["PHN201"]
QLD = ["PHN301", "PHN302", "PHN303", "PHN304", "PHN305", "PHN306", "PHN307", "PHN308", "PHN309", "PHN310"]
SA = ["PHN401", "PHN402", "PHN403"]
TAS = ["PHN501"]
VIC = ["PHN601", "PHN602", "PHN603", "PHN604", "PHN605", "PHN606"]
WA = ["PHN701", "PHN702", "PHN703"]


def construct_whole_dic(element, dic_whole, kind, type):
    construct_count_cancer_dic("ACT", ACT, element, dic_whole, kind, type)
    construct_count_cancer_dic("NSW", NSW, element, dic_whole, kind, type)
    construct_count_cancer_dic("NT", NT, element, dic_whole, kind, type)
    construct_count_cancer_dic("QLD", QLD, element, dic_whole, kind, type)
    construct_count_cancer_dic("SA", SA, element, dic_whole, kind, type)
    construct_count_cancer_dic("TAS", TAS, element, dic_whole, kind, type)
    construct_count_cancer_dic("VIC", VIC, element, dic_whole, kind, type)
    construct_count_cancer_dic("WA", WA, element, dic_whole, kind, type)


def cancer_whole(element, count_whole_cancer):
    kind_v1 = "deaths_from_cancer_0_to_74_years_2014_to_2018_number"
    type_v1 = "whole_cancer_death"
    construct_whole_dic(element, count_whole_cancer, kind_v1, type_v1)

    kind_v2 = "deaths_breast_cancer_females_0_74_years_2014_to_2018_number"
    type_v2 = "breast_cancer_females_death"
    construct_whole_dic(element, count_whole_cancer, kind_v2, type_v2)

    kind_v3 = "deaths_from_colorectal_cancer_0_to_74_years_2014_to_2018_number"
    type_v3 = "colorectal_cancer_death"
    construct_whole_dic(element, count_whole_cancer, kind_v3, type_v3)

    kind_v4 = "deaths_from_lung_cancer_0_to_74_years_2014_to_2018_number"
    type_v4 = "lung_cancer_death"
    construct_whole_dic(element, count_whole_cancer, kind_v4, type_v4)

def traffic_whole_death(element, count_whole_cancer):
    kind_v1 = "deaths_road_traffic_injuries_0_74_years_2014_to_2018_number"
    type_v1 = "road_traffic_injuries_death"
    construct_whole_dic(element, count_whole_cancer, kind_v1, type_v1)

def diabetes_whole_death(element, count_whole_cancer):
    kind_v1 = "deaths_from_diabetes_0_to_74_years_2014_to_2018_number"
    type_v1 = "diabetes_death"
    construct_whole_dic(element, count_whole_cancer, kind_v1, type_v1)

def suicide_whole_death(element, count_whole_cancer):
    kind_v1 = "dths_scde_slf_inflctd_injrs_0_74_yrs_2014_to_2018_nmbr"
    type_v1 = "suicide_and_self-inflicted_injuries_death"
    construct_whole_dic(element, count_whole_cancer, kind_v1, type_v1)


count_whole_cancer = {}


with open(twitter_filename, 'r', encoding='utf-8') as file:
    # first time read file, to count the whole number of cancer in different state
    json_whole = json.load(file)
    for element in json_whole["features"]:
        cancer_whole(element, count_whole_cancer)
        traffic_whole_death(element, count_whole_cancer)
        diabetes_whole_death(element, count_whole_cancer)
        suicide_whole_death(element, count_whole_cancer)


    for key, value in count_whole_cancer.items():
        value["state"] = key
        db.save(value)
