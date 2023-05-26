# COMP90024 GROUP48
# Yuhang Zhou     ID:1243037
# Jitao Feng      ID:1265994
# Hui Liu         ID:1336645
# Jihang Yu       ID:1341312
# Xinran Ren      ID:1309373

FROM python:3.9
LABEL authors="Eighteen"

COPY  . .

RUN pip install couchdb;\
    pip install flask;\
    pip install flask-restful;\
    pip install flask_script;\
    pip install flask_migrate;\
    pip install flask-cors;\
    pip install textblob


EXPOSE 8080

CMD ["python3", "app.py"]