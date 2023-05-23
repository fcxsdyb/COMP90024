# COMP90024 GROUP48 Assignment2
This document describes the main components of the project and their roles. The project has three main directories, each containing different parts of the application. 

## Directory Structure
The main directories include:
- `./Backend`: Contains the backend code of the application.
- `./Frontend`: Contains the frontend code of the application.
- `./Harvester`: Contains Ansible scripts for automatically creating harvesters for Mastodon servers.
- `./DataProcessor`: Contains all the Python code used to clean the Twitter corpus and SUDO data.

### Backend

This directory includes all the backend code that drives the logic and core operations of our application. This includes database interactions, business logic, and server-side calculations.

### Frontend

This directory houses all the frontend code for our application, which includes the user interface and client-side scripting. It makes use of modern web technologies to provide a seamless user experience.

### Harvester

The Harvester directory contains Ansible scripts that are used for creating harvesters for Mastodon servers. These harvesters are utilized to gather and process data from these servers.

### DataProcessor

This directory contains all the Python codes used for reading large Twitter corpus and select the data with useful information and transferring the SUDO library data into useful format.
---
