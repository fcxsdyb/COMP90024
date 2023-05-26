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
from textblob import TextBlob

# Establish connection to the couchdb
# Insert your admin account and password here
admin = 'cccadmin'
password = 'whysohard24!'

# Form the connection URL and establish connection to couchDB server
url = f'http://{admin}:{password}@172.26.135.17:5984/'
couch = couchdb.Server(url)

# Define the couchdb database name
# If the database doesn't exist, create one; if it does, use it
db_name = 'huge_twitter_update_emotion_state'

# Define the dictionary stateDensity to store the counts of tweets per state
stateDensity = {
    "New South Wales": 0,
    "Victoria": 0,
    "Queensland": 0,
    "South Australia": 0,
    "Western Australia": 0,
    "Tasmania": 0,
    "Northern Territory": 0,
    "Australian Capital Territory": 0
}

# Check if the database exists, if not, create one; if yes, connect to it
if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]

# Define the filename for the twitter data
twitter_filename = "twitter-huge.json"

# Open the twitter file
with open(twitter_filename, 'r', encoding='utf-8') as file:

    # Initialize count for tracking line numbers
    count = 0

    # Initialize an empty list to store processed tweets
    best_new = []

    # Iterate over each line in the file
    for line in file:

        # Remove trailing commas from each line
        line_element = line.strip()[0:-1]

        # Attempt to parse each line as a JSON object
        try:
            # Convert string to json
            json_element = json.loads(line_element)
            count += 1

            # Prepare new dictionary to store relevant data from each tweet
            new = {}
            new['author_id'] = json_element['doc']['data']['author_id']
            new['created_at'] = json_element['doc']['data']['created_at']
            new['text'] = json_element['doc']['data']['text']
            new['language'] = json_element['doc']['data']['lang']
            new['position'] = json_element['doc']['includes']['places'][0]['full_name']
            new['geo'] = json_element['doc']['includes']['places'][0]['geo']

            # Check if the coordinates are within certain bounds; if not, continue to next iteration
            if new["geo"]["bbox"][1] < -43.38 or new["geo"]["bbox"][1] > -10.41 or \
                    new["geo"]["bbox"][0] < 113.09 or new["geo"]["bbox"][0] > 153.38:
                continue

            # Use TextBlob to perform sentiment analysis on the tweet text
            analysis = TextBlob(json_element['doc']['data']['text'])
            sentiment = analysis.sentiment.polarity

            # Based on sentiment score, assign an emotion label to the tweet
            if sentiment > 0:
                new["emotion"] = "Positive"
            elif sentiment < 0:
                new["emotion"] = "Negative"
            else:
                new["emotion"] = "Neutral"

            # Parse state from the position and assign it to the tweet if the state is valid
            if count < 5000:
                state = new['position'].split(",")[1][1:]
                if state in stateDensity.keys():
                    new['state'] = state
                    best_new.append(new)
                    count += 1
            else:
                state = new['position'].split(",")[1][1:]
                if state in stateDensity.keys():
                    new['state'] = state
                    best_new.append(new)
                    best_new.append(new)

                # If the count reaches 5000, perform a batch update to the database and reset the list and count
                db.update(best_new)
                best_new = []
                count = 0
        except:
            # If an error occurs during processing a tweet, ignore it and move to the next
            continue

    # If there are any remaining tweets not inserted into the database after finishing the file, insert them now
    if count != 0:
        db.update(best_new)
        # count += 1



