from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource
import couchdb, json

app = Flask(__name__)
CORS(app)

couch = couchdb.Server('http://cccadmin:whysohard24!@172.26.135.17:5984/')
db_geo = couch['huge_twitter_geo']
db_emo = couch['huge_twitter_update_emotion']
db_sudo_bar = couch['sudo_data']
db_sudo_pie = couch['sudo_data_death']

@app.route('/')
def root():
    return render_template('Index.html')


# cancer related data get
@app.route('/api/cancer_map')
def cancer_map():
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

    # View Check
    view = db_geo.view('cancerCount/cancerRows')
    # Execute the query

    # (10°41) 43°38' south longitudes 113°09' eaand 153°38' east
    results = []
    for row in view:
        if row["value"]["geo"]["bbox"][1] < -43.38 or row["value"]["geo"]["bbox"][1] > -10.41 or row["value"]["geo"]["bbox"][0] < 113.09 or row["value"]["geo"]["bbox"][0] > 153.38:
            continue

        ifExists = False
        for res in results:
            if row["value"]["geo"]["bbox"][1] == res["lat"] and row["value"]["geo"]["bbox"][0] == res["lng"]:
                res["count"] += 1
                ifExists = True
                break

        if not ifExists:
            new_geo = {
                "lat": row["value"]["geo"]["bbox"][1],
                "lng": row["value"]["geo"]["bbox"][0],
                "position": row["value"]["position"],
                "count": 1
            }
            results.append(new_geo)

    # Return the results as JSON
    return results

# car accident related data get
@app.route('/api/car_accident_map')
def car_accident_map():

    # View Check
    view = db_geo.view('carAccidentCount/carAccidentRows')
    # Execute the query

    # (10°41) 43°38' south longitudes 113°09' eaand 153°38' east
    results = []
    for row in view:
        if row["value"]["geo"]["bbox"][1] < -43.38 or row["value"]["geo"]["bbox"][1] > -10.41 or row["value"]["geo"]["bbox"][0] < 113.09 or row["value"]["geo"]["bbox"][0] > 153.38:
            continue

        ifExists = False
        for res in results:
            if row["value"]["geo"]["bbox"][1] == res["lat"] and row["value"]["geo"]["bbox"][0] == res["lng"]:
                res["count"] += 1
                ifExists = True
                break

        if not ifExists:
            new_geo = {
                "lat": row["value"]["geo"]["bbox"][1],
                "lng": row["value"]["geo"]["bbox"][0],
                "position": row["value"]["position"],
                "count": 1
            }
            results.append(new_geo)

    # Return the results as JSON
    return results

# diabetes related data get
@app.route('/api/diabetes_map')
def diabetes_map():

    # View Check
    view = db_geo.view('diabetesCount/diabetesRows')
    # Execute the query

    # (10°41) 43°38' south longitudes 113°09' eaand 153°38' east
    results = []
    for row in view:
        if row["value"]["geo"]["bbox"][1] < -43.38 or row["value"]["geo"]["bbox"][1] > -10.41 or row["value"]["geo"]["bbox"][0] < 113.09 or row["value"]["geo"]["bbox"][0] > 153.38:
            continue

        ifExists = False
        for res in results:
            if row["value"]["geo"]["bbox"][1] == res["lat"] and row["value"]["geo"]["bbox"][0] == res["lng"]:
                res["count"] += 1
                ifExists = True
                break

        if not ifExists:
            new_geo = {
                "lat": row["value"]["geo"]["bbox"][1],
                "lng": row["value"]["geo"]["bbox"][0],
                "position": row["value"]["position"],
                "count": 1
            }
            results.append(new_geo)

    # Return the results as JSON
    return results

# emotion related data get
@app.route('/api/emotion_count')
def emotion_count():

    # View Check
    view = db_emo.view('emotionCount/emotionCount', group_level = 1)
    # Execute the query

    # (10°41) 43°38' south longitudes 113°09' eaand 153°38' east
    results = []
    for row in view:
        new_row = {
            "name": row["key"],
            "value": row["value"]
        }
        results.append(new_row)

    # Return the results as JSON
    return results

# sudo data bar get
@app.route('/api/sudo_data_cancer')
def sudo_data_cancer():
    # Mango Queries
    query = {
        "selector": {}
    }

    results = []
    for row in db_sudo_bar.find(query):
        rest = row["whole_cancer_death"] - row["breast_cancer_females_death"] - row["colorectal_cancer_death"] - row["lung_cancer_death"]
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

# sudo data bar get
@app.route('/api/sudo_data_cancer_pie')
def sudo_data_cancer_pie():
    # Mango Queries
    query = {
        "selector": {}
    }

    results = []
    for row in db_sudo_pie.find(query):
        results.append(row)
    # Return the results as JSON
    return results

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='8080')
