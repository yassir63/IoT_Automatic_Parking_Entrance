# Automated Parking Entrance Solution

## Description

This repository hosts the code for the demo part of our Automated Parking Solution developed for the IoT course at Polytech Nice Sophia Antipolis. The solution includes code stored in the Raspberry, Server, and the code to the WebApp.

## Project Structure

- **Raspberry**: Contains the logic for ultrasonic and RFID reading in `system.py`. Run `start.sh` in this folder to start the Raspberry part.

- **Server**: Houses the server-side logic.
  - `secure.py`: Logic for the secure pack of the solution.
  - `speedy.py`: Logic for the speedy pack of the solution.

- **WebApp**: This folder contains two subfolders `api` and `client` harnessing the backend and frontend of our webapp.

- `startsecure.bat`: Script to start the secure version of the solution.

- `startspeedy.bat`: Script to start the speedy version of the solution.

## Getting Started

1. **Raspberry Setup**:
   - Navigate to the `Raspberry` folder.
   - Run `start.sh` to initiate the Raspberry part of the solution.

2. **Server Startup**:
   - Choose either `startsecure.bat` or `startspeedy.bat` based on your requirements.
   - Execute the chosen script to run the program :

      ```bash
       ./startspeedy.bat
2. **Web Startup**:
   - navigate to the WebApp folder, api, and client subfolders, and run: ("npm i" for Dependencies)

   For the api:(Mandatoryfor the project)
      - first you must have SQL DATABASE then create one named "dbIOT"
      - second uncomment the code in "WebApp/api/src/index.js" and run the api to create all the tables.(for the first time)
      To Run api: Run "npm start" in "WebApp/api"
      - Then Run "npx sequelize-cli db:seed:all" in "WebApp/api" to insert some test data.
      - comment the code and restart the api.
   
   For the client:(optional)
      - Run "npm run dev" in "WebApp/client"

      
## Dependencies

Before running the project, make sure to install the required dependencies:

- For Python dependencies, run the following command in the Raspbery and Server folders :

  ```bash
  pip install -r requirements.txt
- For WebApp dependencies, navigate to the WebApp folder, api, and client subfolders, and run:

   ```bash
   npm install
- Beware, as I have used conda environments in my .bat scripts therefore you might consider changing them !