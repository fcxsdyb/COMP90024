# COMP90024 GROUP48
# Yuhang Zhou     ID:1243037
# Jitao Feng      ID:1265994
# Hui Liu         ID:1336645
# Jihang Yu       ID:1341312
# Xinran Ren      ID:1309373

# Import necessary libraries
import couchdb
import json
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
db_name = 'sudo_data_raw'

# Check if the database exists, if not, create one; if yes, connect to it
if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]

# Define the filename for the data
sudo_filename = "phidu_premature_mortality_by_cause_phn_2014_18-443978920740005408(1).json"

# Open the data file
with open(sudo_filename, 'r', encoding='utf-8') as file:

    # Load the entire JSON file
    json_whole = json.load(file)

    # Initialize an empty list to store the elements to be inserted into the database
    best_new = []
    # Initialize count for tracking the number of processed elements
    count = 0

    # Iterate over each feature in the JSON object
    for element in json_whole["features"]:

        # If the count is less than 5000, append the properties of the current feature to the list
        if count < 5000:
            best_new.append(element['properties'])
            count += 1
        else:
            # If the count reaches 5000, perform a batch update to the database and reset the list and count
            db.update(best_new)
            best_new = []
            count = 0

    # If there are any remaining elements not inserted into the database after finishing processing, insert them now
    if count != 0:
        db.update(best_new)


