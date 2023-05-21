from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource
import couchdb
import json

app = Flask(__name__)
CORS(app)

hosts = []
with open('host_config.txt', 'r') as f:
    for line in f:
        hosts.append(line.strip())


def get_database(database):
    for host in hosts:
        couch = couchdb.Server(host)
        try:
            target_database = couch[database]
            print("host:" + host + "had already connected")
            return target_database
        except:
            continue

def get_view(database, path_view, level):
    for host in hosts:
        couch = couchdb.Server(host)
        try:
            target_database = couch[database]
            target_view = target_database.view(path_view, group_level = level)
            print("host:" + host + "had already connected")
            return target_view
        except:
            continue

# def get_view(database, path_view):
#     for host in hosts:
#         couch = couchdb.Server(host)
#         try:
#             target_database = couch[database]
#             target_view = target_database.view(path_view)
#             return target_view
#         except:
#             continue

# couch = couchdb.Server('http://cccadmin:whysohard24!@172.26.135.17:5984/')


@app.route('/')
def root():
    return render_template('Index.html')

# Mango Queries
# query = {
#     "selector": {
#         "text": {
#             "$regex": "(?i)cancer"
#         }
#     },
#     "fields": ["_id", "geo", "position"],
#     "limit": 5000
# }
#     results = []
# for row in db.find(query):
#     results.append(row)
# # Return the results as JSON
# return results

# General part pie chart data
@app.route('/api/sudo_data_death_pie')
def sudo_data_death_pie():

    db_sudo_pie = get_database('sudo_data_death')

    # Mango Queries
    query = {
        "selector": {}
    }

    results = []
    for row in db_sudo_pie.find(query):
        print(row)
        results.append(row)
    # Return the results as JSON
    print(results)
    return jsonify(results)

# emotion related data get
@app.route('/api/general_map')
def general_map():

    # db_emo = get_database('huge_twitter_update_emotion_state')
    # # View Check
    # view = db_emo.view('regionCount/regionCount', group_level=1)
    # # Execute the query
    view = get_view('huge_twitter_update_emotion_state', 'regionCount/regionCount', 1)

    results = []

    if view is not None:
        for row in view:
            new_row = {
                "name": row["key"],
                "value": row["value"]
            }
            results.append(new_row)

    # Return the results as JSON
    return jsonify(results)

# sudo cancer data bar get (scenario 1 cancer sudo data)
@app.route('/api/sudo_data_cancer')
def sudo_data_cancer():

    db_sudo_bar = get_database('sudo_data')
    # Mango Queries
    query = {
        "selector": {}
    }

    results = []
    for row in db_sudo_bar.find(query):
        rest = row["whole_cancer_death"] - row["breast_cancer_females_death"] - \
            row["colorectal_cancer_death"] - row["lung_cancer_death"]
        cancer = {
            "breast_cancer": row["breast_cancer_females_death"],
            "colorectal_cancer_death": row["colorectal_cancer_death"],
            "lung_cancer": row["lung_cancer_death"],
            "other_cancer": rest
        }
        print(cancer)
        results.append(cancer)

    # Return the results as JSON
    return app.response_class(
        response=json.dumps(results, sort_keys=False),
        status=200,
        mimetype='application/json'
    )

# cancer map related data get (scenario 1 Cancer twitter data)
@app.route('/api/cancer_map')
def cancer_map():

    # db_emo = get_database('huge_twitter_update_emotion_state')
    # # View Check
    # view = db_emo.view('cancerCount/cancerCount', group_level=1)
    # # Execute the query
    view = get_view('huge_twitter_update_emotion_state', 'cancerCount/cancerCount', 1)

    # (10°41) 43°38' south longitudes 113°09' eaand 153°38' east
    results = []
    for row in view:
        new_row = {
            "name": row["key"],
            "value": row["value"]
        }
        results.append(new_row)

    # Return the results as JSON
    return jsonify(results)

# car accident related data get (scenario2 sudo data)
# 得到的json数据是八个洲的因车祸死亡的人数, 通过柱状图显示八个洲车祸死亡的信息
# [{"road_traffic_injuries_death":382,"state":"SA"},
# {"road_traffic_injuries_death":52,"state":"ACT"},
# {"road_traffic_injuries_death":1041,"state":"QLD"},
# {"road_traffic_injuries_death":1129,"state":"NSW"},
# {"road_traffic_injuries_death":232,"state":"NT"},
# {"road_traffic_injuries_death":174,"state":"WA"},
# {"road_traffic_injuries_death":185,"state":"TAS"},
# {"road_traffic_injuries_death":124,"state":"VIC"}]

@app.route('/api/sudo_car_accident')
def sudo_data_car_accident():
    db_sudo_car_accident = get_database('sudo_data')
    query = {
        "selector": {
            "road_traffic_injuries_death": {"$exists": True}
        }
    }

    result = []
    for row in db_sudo_car_accident.find(query):
        new_dic = {}
        new_dic["road_traffic_injuries_death"] = row["road_traffic_injuries_death"]
        new_dic["state"] = row["state"]
        result.append(new_dic)


    return jsonify(result)



# car accident related data get (scenario2 twitter data)
@app.route('/api/car_accident_map')
def car_accident_map():

    # db_emo = get_database('huge_twitter_update_emotion_state')
    # # View Check
    # view = db_emo.view('carAccidentCount/carAccidentCount', group_level=1)
    # # Execute the query
    view = get_view('huge_twitter_update_emotion_state', 'cancerCount/cancerCount', 1)

    # (10°41) 43°38' south longitudes 113°09' eaand 153°38' east
    results = []
    for row in view:
        new_row = {
            "name": row["key"],
            "value": row["value"]
        }
        results.append(new_row)

    # Return the results as JSON

    return jsonify(results)

# emotion related data get
@app.route('/api/emotion_count')
def emotion_count():

    # db_emo = get_database('huge_twitter_update_emotion_state')
    # # View Check
    # view = db_emo.view('emotionCount/emotionCount', group_level=1)
    # # Execute the query
    view = get_view('huge_twitter_update_emotion_state', 'emotionCount/emotionCount', 1)

    # (10°41) 43°38' south longitudes 113°09' eaand 153°38' east
    results = []

    for row in view:
        new_row = {
            "name": row["key"],
            "value": row["value"]
        }
        results.append(new_row)


    # Return the results as JSON
    return jsonify(results)



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='8080')
