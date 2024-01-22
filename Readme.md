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
   - navigate to the WebApp folder, api, and client subfolders, and run:

      ```bash
       npm start
## Dependencies

Before running the project, make sure to install the required dependencies:

- For Python dependencies, run the following command in the Raspbery and Server folders :

  ```bash
  pip install -r requirements.txt
- For WebApp dependencies, navigate to the WebApp folder, api, and client subfolders, and run:

   ```bash
   npm install
- Beware, as I have used conda environments in my .bat scripts therefore you might consider changing them !