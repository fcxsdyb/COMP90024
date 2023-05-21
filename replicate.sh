#!/bin/bash
  while true
  do
    curl -X POST 'http://cccadmin:whysohard24!@172.26.135.17:5984/_replicate' \
      -H "Content-Type: application/json" \
      -d '{ "source": "http://cccadmin:whysohard24!@172.26.135.17:5984/sudo_data_death", "target": "http://Bob:CCCansible48@172.26.131.156:5984/sudo_data_death" }'

    sleep 5
  done