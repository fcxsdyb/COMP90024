import couchdb
import json

# Connect to CouchDB
admin = 'cccadmin'  # Change it to your admin account
password = 'whysohard24!'  # Change it to your password

# Send request to CouchDB
url = f'http://{admin}:{password}@172.26.135.17:5984/'
couch = couchdb.Server(url)

# Create a CouchDB database called 'sudo_data_health_care'
db_name = 'sudo_data_health_care'

if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]

# File containing Twitter data
twitter_filename = "../../file process/dese_sa4_mpy_by_ind_ts_nov_2021-5851274781721276183.json"

# Counters for state occurrences
state_count = {
    "VIC": 0,
    'NSW': 0,
    'QLD': 0,
    'SA': 0,
    'WA': 0,
    'TAS': 0,
    'NT': 0
}

# Dictionary to store aggregated data
dic = {}

# Open the Twitter data file
with open(twitter_filename, 'r', encoding='utf-8') as file:
    # First time read file to count the whole number of cancer in different states
    json_whole = json.load(file)
    for elements in json_whole['features']:
        element = elements['properties']

        state = element["state_name_abbr"]
        if state in state_count.keys():
            state_count[state] += 1

        if state in dic.keys():
            if "nov_16" in dic[state].keys():
                dic[state]["nov_16"] += element["nov_16"]
            else:
                dic[state]["nov_16"] = element["nov_16"]

            if "nov_21" in dic[state].keys():
                dic[state]["nov_21"] += element["nov_21"]
            else:
                dic[state]["nov_21"] = element["nov_21"]

            if "nov_20" in dic[state].keys():
                dic[state]["nov_20"] += element["nov_20"]
            else:
                dic[state]["nov_20"] = element["nov_20"]
        else:
            dic[state] = {}
            dic[state]["nov_16"] = element["nov_16"]
            dic[state]["nov_20"] = element["nov_20"]
            dic[state]["nov_21"] = element["nov_21"]

    print(state_count)

    # Save aggregated data to CouchDB
    for key, value in dic.items():
        value["state"] = key
        if key in state_count.keys():
            value["average_nov_16"] = int(value['nov_16'] / state_count[key])
            value["average_nov_21"] = int(value['nov_21'] / state_count[key])
            value["average_nov_20"] = int(value['nov_20'] / state_count[key])
            value["city_count"] = state_count[key]
        db.save(value)
        print(value)






