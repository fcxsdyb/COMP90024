# COMP90024 GROUP48 Assignment2
This repository contains the source code for assignment 2 of the COMP90024 Cluster and Cloud Computing course at the University of Melbourne.

### [Scenario Introduction](https://www.youtube.com/watch?v=7E1voOXxBNA)
### [Ansible Usage](https://youtu.be/9gILq-gpIdc)

### Team Members:
- Yuhang Zhou (Student ID: 1243037)
- Jitao Feng (Student ID: 1265994)
- Hui Liu (Student ID: 1336645)
- Jihang Yu (Student ID: 1341312)
- Xinran Ren (Student ID: 1309373)

## Project Structure
The main directories include:
- `./Backend`: Contains the backend code of the application.
- `./Frontend`: Contains the frontend code of the application.
- `./Harvester`: Contains Ansible scripts for automatically creating harvesters for Mastodon servers.
- `./DataProcessor`: Contains all the Python code used to clean the Twitter corpus and SUDO data.

### Backend

This directory includes all the backend code that drives the logic and core operations of our application. This includes database interactions, business logic, and server-side calculations. Using Docker to deploy backend image.

### Frontend

This directory houses all the frontend code for our application, which includes the user interface and client-side scripting. It makes use of modern web technologies to provide a seamless user experience. Using Docker to deploy frontend image.

### Harvester

The Harvester directory contains Ansible scripts that are used for creating instances and harvesters for Mastodon servers. These harvesters are utilized to gather and process data from these servers.

### DataProcessor

This directory contains all the Python codes used for reading large Twitter corpus and select the data with useful information and transferring the SUDO library data into useful format.

---
