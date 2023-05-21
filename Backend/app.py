from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource
import couchdb
import json

app = Flask(__name__)
CORS(app)

# Number of people in each state (2018)
# data from https://www.abs.gov.au/ausstats/abs@.nsf/lookup/3101.0Media%20Release1Dec%202018
whole_people_state = {
    "NSW": 8046100,
    "VIC": 6526400,
    "QLD": 5052800,
    "SA": 1742700,
    "WA": 2606300,
    "NT": 245900,
    "ACT": 423800,
    "TAS": 531500,
}

# Dictionary for converting lower case state to upper case
state_short_to_long = {
    "NSW": "New South Wales",
    "VIC": "Victoria",
    "QLD": "Queensland",
    "SA": "South Australia",
    "WA": "Western Australia",
    "TAS": "Tasmania",
    "NT": "Northern Territory",
    "ACT": "Australian Capital Territory"
}

# remote hosts list, through read host_config.txt file to config
hosts = []
with open('host_config.txt', 'r') as f:
    for line in f:
        hosts.append(line.strip())


# This function is used to get the couchdb database of remote hosts
# if the remote host shut down, then it will find another host to get the same couchdb database
def get_database(database):
    for host in hosts:
        couch = couchdb.Server(host)
        try:
            target_database = couch[database]
            print("host:" + host + "had already connected")
            return target_database
        except:
            continue


# This function is used to get the couchdb view(Mapreduce) of remote hosts
# if the remote host shut down, then it will find another host to get the same couchdb view(MapReduce)
def get_view(database, path_view, level):
    for host in hosts:
        couch = couchdb.Server(host)
        try:
            target_database = couch[database]
            target_view = target_database.view(path_view, group_level=level)
            print("host:" + host + "had already connected")
            return target_view

        except:
            continue


# index interface
@app.route('/')
def root():
    return render_template('Index.html')


# Scenario general
# sudo data
# interface to return the numbers of people who caused by different kinds of death in sudo data
# return a list that contains the numbers of people who caused by different kinds of death
@app.route('/api/sudo_data_death_pie')
def sudo_data_death_pie():
    db_sudo_pie = get_database('sudo_data_death')

    # Mango Queries
    query = {
        "selector": {}
    }

    results = []

    # get death kind and death number one by one from the view
    for row in db_sudo_pie.find(query):
        print(row)
        results.append(row)

    # Return the results as JSON
    return jsonify(results)


# scenario general
# Twitter data
# interface to get the geo and display the data into the map
@app.route('/api/general_map')
def general_map():
    # View Check
    view = get_view('huge_twitter_update_emotion_state',
                    'regionCount/regionCount', 3)

    results = []

    # Execute the query
    if view is not None:
        for row in view:
            new_row = {
                "name": row["key"],
                "value": row["value"]
            }
            results.append(new_row)

    # Return the results as JSON
    return jsonify(results)


# scenario 1 cancer
# sudo data
@app.route('/api/sudo_data_cancer')
def sudo_data_cancer():
    db_sudo_bar = get_database('sudo_data')
    # Mango Queries
    query = {
        "selector": {}
    }

    results = []

    # calculate the number of deaths caused by different types of cancer among people
    for row in db_sudo_bar.find(query):
        rest = row["whole_cancer_death"] - row["breast_cancer_females_death"] - \
               row["colorectal_cancer_death"] - row["lung_cancer_death"]
        cancer = {
            "breast_cancer": row["breast_cancer_females_death"],
            "colorectal_cancer_death": row["colorectal_cancer_death"],
            "lung_cancer": row["lung_cancer_death"],
            "other_cancer": rest
        }
        results.append(cancer)

    # Return the results as JSON
    return app.response_class(
        response=json.dumps(results, sort_keys=False),
        status=200,
        mimetype='application/json'
    )


# scenario 1 cancer map related data get
# Twitter data
@app.route('/api/cancer_map')
def cancer_map():
    # # View Check
    view = get_view('huge_twitter_update_emotion_state',
                    'cancerCount/cancerCount', 1)

    # Execute the data
    results = []
    for row in view:
        new_row = {
            "name": row["key"],
            "value": row["value"]
        }
        results.append(new_row)

    # Return the results as JSON
    return jsonify(results)


# scenario2 car accident related data get
# sudo data
@app.route('/api/sudo_car_accident')
def sudo_data_car_accident():
    # get database
    db_sudo_car_accident = get_database('sudo_data')

    # Mango query
    query = {
        "selector": {
            "road_traffic_injuries_death": {"$exists": True}
        }
    }

    result = []

    # calculate road traffic death ratio in different states
    for row in db_sudo_car_accident.find(query):
        new_dic = {}
        new_dic["road_traffic_injuries_death"] = row["road_traffic_injuries_death"] / \
                                                 whole_people_state[row["state"]]
        new_dic["state"] = state_short_to_long[row["state"]]
        result.append(new_dic)

    # Return the results as JSON
    return jsonify(result)


# scenario2 car accident related data get
# Twitter data
@app.route('/api/car_accident_map')
def car_accident_map():
    # View Check
    view = get_view('huge_twitter_update_emotion_state',
                    'carAccidentCount/carAccidentCount', 1)

    # get number of tweets per state mentioning car accidents
    results = []
    for row in view:
        new_row = {
            "name": row["key"],
            "value": row["value"]
        }
        results.append(new_row)

    # Return the results as JSON
    return jsonify(results)


# scenario 3 suicide
# sudo data
@app.route('/api/sudo_suicide')
def sudo_data_suicide():
    db_sudo_car_accident = get_database('sudo_data')
    query = {
        "selector": {
            "suicide_and_self-inflicted_injuries_death": {"$exists": True}
        }
    }

    # calculate road traffic death ratio in different states
    result = []
    for row in db_sudo_car_accident.find(query):
        new_dic = {}
        new_dic["suicide"] = row["suicide_and_self-inflicted_injuries_death"] / \
                             whole_people_state[row['state']]
        new_dic["state"] = state_short_to_long[row["state"]]
        result.append(new_dic)

    # Return the results as JSON
    return jsonify(result)


# scenario 3 suicide
# Twitter data
# emotion related data get (negative emotion rate in different state)
@app.route('/api/emotion_count')
def emotion_count():
    # get the view which contains negative tweets in different states
    view = get_view('huge_twitter_update_emotion_state',
                    'emotionCount/emotionCount', 1)

    # get the view which contains numbers of tweets(negative, positive and neutral) in different state
    view2 = get_view('huge_twitter_update_emotion_state',
                     'emotionCount/count_state_emotion', 1)

    # get the view data of view2 and make them into an dictionary
    dict_state_whole = {}
    for row in view2:
        dict_state_whole[row["key"]] = row["value"]

    # calculate the negative tweets ratio in different state
    results = []
    for row in view:
        new_row = {
            "name": row["key"],
            "value": row["value"] / dict_state_whole[row["key"]]
        }
        results.append(new_row)

    # Return the results as JSON
    return jsonify(results)


# scenario 4 health care
# sudo data
# health care evaluation in different states.
# find the average health care employments numbers in different state and in different years
@app.route('/api/sudo_health_evaluation')
def sudo_data_health_evaluation():
    # get the database
    db_sudo_car_accident = get_database('sudo_data_health_care')

    # Mango query
    query = {
        "selector": {
            "average_nov_16": {"$exists": True}
        }
    }

    # get the average health care employments numbers in different state
    # and in different years
    result = []
    for row in db_sudo_car_accident.find(query):
        print(row)
        new_dic = {}
        new_dic["average_nov_16"] = row["average_nov_16"]
        new_dic["average_nov_21"] = row["average_nov_21"]
        new_dic["average_nov_20"] = row["average_nov_20"]
        new_dic["state"] = state_short_to_long[row["state"]]
        result.append(new_dic)

    # Return the results as JSON
    return jsonify(result)


# scenario 4 health care
# Twitter data
# find tweets that care about health care and analysis their emotion
@app.route('/api/health_evaluation_map')
def health_evaluation():
    # get view that contain the whole tweets that mention the health care in different state
    view = get_view('huge_twitter_update_emotion_state',
                    'Healthcare/Healthcare_whole', 1)

    # get view that contain the negative tweets that mention the health care in different state
    view2 = get_view('huge_twitter_update_emotion_state',
                     'Healthcare/Healthcare_negative', 1)

    # calculate the ratio in different state
    results = []

    dict_state_whole = {}
    for row in view:
        dict_state_whole[row["key"]] = row["value"]

    for row in view2:
        new_row = {
            "name": row["key"],
            "value": row["value"] / dict_state_whole[row["key"]]
        }
        results.append(new_row)

    # Return the results as JSON
    return jsonify(results)


#  scenario 3 suicide
#  mastodon servers data
@app.route("/api/mastodon_suicide")
def mastodon_suicide_data():
    # get the view map from the mastodon_au_social_final_with_emotion database
    # which get data from au.social server
    view = get_view('mastodon_au_social_final_with_emotion',
                    'suicide_mastodon/suicide_emotion', 1)

    # get the view map from the mastodon_au_final_with_emotion database
    # which get data from mastodon.au server
    view2 = get_view("mastodon_au_final_with_emotion",
                     'suicide_mastodon/suicide_emotion', 1)

    results = []

    # count dictionary
    mastodon_data_whole = {
        "Negative": 0,
        "Positive": 0,
        "Neutral": 0
    }

    # calculate the numbers of (positive, negative, or neutral)toot
    # in different view and merge them
    for row in view:
        mastodon_data_whole[row['key']] = mastodon_data_whole[row['key']] + row["value"]

    for row in view2:
        mastodon_data_whole[row['key']] = mastodon_data_whole[row['key']] + row["value"]

    for key, value in mastodon_data_whole.items():
        new_dic = {
            key: value
        }
        results.append(new_dic)

    # Return the results as JSON
    return jsonify(results)


# scenario 4 health care
# mastodon data
@app.route("/api/mastodon_health_care")
def mastodon_health_care_data():
    # get the view map from the mastodon_au_social_final_with_emotion database
    # which get data from au.social server
    view = get_view('mastodon_au_social_final_with_emotion',
                    'healthCount/health_emotion', 1)

    # get the view map from the mastodon_au_final_with_emotion database
    # which get data from mastodon.au serve
    view2 = get_view("mastodon_au_final_with_emotion",
                     'Healthcare/Healthcare_emotion', 1)

    # count dictionary
    results = []

    # calculate the numbers of (positive, negative, or neutral)toot which mentions health care
    # in different view and merge them
    mastodon_data_whole = {
        "Negative": 0,
        "Positive": 0,
        "Neutral": 0
    }

    for row in view:
        mastodon_data_whole[row['key']] = mastodon_data_whole[row['key']] + row["value"]

    for row in view2:
        mastodon_data_whole[row['key']] = mastodon_data_whole[row['key']] + row["value"]

    for key, value in mastodon_data_whole.items():
        new_dic = {
            key: value
        }
        results.append(new_dic)

    # Return the results as JSON
    return jsonify(results)


if __name__ == '__main__':
    # bind with localhost ip address
    # and expose the port 8080
    app.run(debug=True, host='0.0.0.0', port='8080')
