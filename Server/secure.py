
import json
import cv2
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from ultralytics import YOLO
import dlib
import numpy as np
import face_recognition
import os
import time
import imutils
import requests
from PIL import Image
import hashlib
import io

rfid = ""


duration = 3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def ExtractText(roi):
    roi = cv2.resize(roi, None,fx=6,fy=6, interpolation = cv2.INTER_CUBIC)
    ocr = YOLO("ocr.pt")
    text = ocr(roi)

    boxes = text[0].boxes


    labels = {
        0:'0',
        1:'1',
        2:'2',
        3:'3',
        4:'4',
        5:'5',
        6:'6',
        7:'7',
        8:'8',
        9:'9',
        10:'a',
        11:'b',
        12:'h',
        13:'d',
        14:'w',
        15:'t'
    }
    letter=[]
    plate=[]

    for box in boxes:
    
        letter = []
        for i in range(4):
            letter.append(box.xyxy[0][i].item())

        plate.append(labels[int(box.cls.item())])
    return plate

def detect_Extract(image):
    try:
        detect = YOLO('./best.pt') 
        results = detect(image)
        boxes = results[0].boxes
        if len(boxes) > 0:
            box = boxes[0]
            x_min, y_min = box.xyxy[0][0].item(), box.xyxy[0][1].item()
            box_width, box_height = box.xyxy[0][2].item(), box.xyxy[0][3].item()
            res_plotted = results[0].plot(conf=False)
            roi = res_plotted[int(y_min): int(box_height), int(x_min): int(box_width)]
            roi = imutils.resize(roi, width=700)
            cv2.imwrite('plate.jpg', roi)
            plate = ExtractText(roi)
            return plate
        else:
            print("No boxes detected in the image.")
            return ["Couldn't Detect a License Plate !"]
    except IndexError as e:
        print(f"IndexError: {e}. No License Plate was detected !") 
        return ["Couldn't Detect a License Plate !"]
      

        
@app.post('/rfid')
async def LicensePlate(data: dict):
    global rfid
    rfid = data['rfid']
    rfid = rfid[:3]
    print("received RFID : ", rfid)
    print("received RFIDlength : ", len(rfid))


def custom_sort(item):
    if item.isdigit():
        return (0, int(item))
    else:
        return (1, item)

cap = cv2.VideoCapture(0)


@app.get('/licenseplate')
def LicensePlate():
    model = YOLO("best.pt")
    start_time = time.time()
    final_plate = ""

    Permission = False
    while True:
        _, frame = cap.read()

        if time.time() - start_time <= 5:

            res = model(frame)

            try:
                confidence = res[0].boxes.conf.item()
                print(confidence)

                if confidence > 0.45:
                    print("License Plate Detected !")
                    plate = detect_Extract(frame)
                    sorted_plate = sorted(plate, key=custom_sort)
                    final_plate = ''.join(sorted_plate)
                    

                    

            except:
                print("No boxes detected in the image.")
  
        else:
            Permission = checkPermission(final_plate,rfid)
            return Permission

        
def fetch_data_from_server(params):
    try:
        response = requests.get("http://localhost:3000/api/parkingusers/fetchUserData", params=params)
        response.raise_for_status()
        return json.loads(response.text)
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch data from the server: {e}")
        return None

def fetch_data_from_file(file_path, filter_key, filter_value):
    try:
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
            
            # Filter data based on the provided key and value
            filtered_data = [entry for entry in data if entry.get(filter_key) == filter_value]

            return filtered_data
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return None
    except json.JSONDecodeError as e:
        print(f"Failed to decode JSON from file: {e}")
        return None

def checkPermission(final_plate=None,rfid=None,qrCode=None):
    params = {
                        'licensePlateNumber': final_plate,
                        'rfidCode': rfid,
                        'QrCode': qrCode,
                    }

    output_file_path = 'cache.json'

    # Try fetching data from the server
    server_data = fetch_data_from_server(params)

    # If fetching from the server fails or returns None, try fetching from the file
    if server_data is None:
        file_data = fetch_data_from_file(output_file_path,"rfidCode",rfid)

        if file_data is not None and len(file_data) > 0:
            # Data fetched from the file successfully
            print(file_data[0])
            print("Using data from the file as a fallback.")
            DBrfid = file_data[0].get("rfidCode", "")
            DBPlate = file_data[0].get("licensePlateNumber", "")
            Permissions = file_data[0].get("sites", [])[0].get("sitePermission", "")
            Name = file_data[0].get("name", "")
            UserType = file_data[0].get("type", "")
            Site = file_data[0].get("sites", [])[0].get("siteName", "")
            CarBrand = file_data[0].get("vehicles", [])[0].get("brand", "")
            QrCode = file_data[0].get("QrCode", "")

            print(f"RFID Code: {DBrfid}")
            print(f"License Plate Number: {DBPlate}")
            print(f"Permissions: {Permissions}")
            print(f"Name: {Name}")
            print(f"User Type: {UserType}")
            print(f"Site: {Site}")
            print(f"Car Brand: {CarBrand}")
            print(f"QR Code: {QrCode}")
        else:
            file_data = fetch_data_from_file(output_file_path,"QrCode",qrCode)
            if file_data is not None and len(file_data) > 0:
                # Data fetched from the file successfully
                print(file_data[0])
                DBrfid = file_data[0].get("rfidCode", "")
                DBPlate = file_data[0].get("licensePlateNumber", "")
                Permissions = file_data[0].get("sites", [])[0].get("sitePermission", "")
                Name = file_data[0].get("name", "")
                UserType = file_data[0].get("type", "")
                Site = file_data[0].get("sites", [])[0].get("siteName", "")
                CarBrand = file_data[0].get("vehicles", [])[0].get("brand", "")
                QrCode = file_data[0].get("QrCode", "")

                print(f"RFID Code: {DBrfid}")
                print(f"License  Plate Number: {DBPlate}")
                print(f"Permissions: {Permissions}")
                print(f"Name: {Name}")
                print(f"User Type: {UserType}")
                print(f"Site: {Site}")
                print(f"Car Brand: {CarBrand}")
                print(f"QR Code: {QrCode}")
            else:
                file_data = fetch_data_from_file(output_file_path,"licensePlateNumber",final_plate)
                if file_data is not None and len(file_data) > 0:
                    # Data fetched from the file successfully
                    print(file_data[0])
                    DBrfid = file_data[0].get("rfidCode", "")
                    DBPlate = file_data[0].get("licensePlateNumber", "")
                    Permissions = file_data[0].get("sites", [])[0].get("sitePermission", "")
                    Name = file_data[0].get("name", "")
                    Type = file_data[0].get("type", "")
                    Site = file_data[0].get("sites", [])[0].get("siteName", "")
                    CarBrand = file_data[0].get("vehicles", [])[0].get("brand", "")
                    QrCode = file_data[0].get("QrCode", "")

                    print(f"RFID Code: {DBrfid}")
                    print(f"License  Plate Number: {DBPlate}")
                    print(f"Permissions: {Permissions}")
                    print(f"Name: {Name}")
                    print(f"User Type: {Type}")
                    print(f"Site: {Site}")
                    print(f"Car Brand: {CarBrand}")
                    print(f"QR Code: {QrCode}")
                else:
                    print("No data available.")
                    Permission = False
                    return Permission

            if Type == "Visitor":
                print("Visitor detected. Checking QR Code, Scan in Camera ...")
                qrcodevalue = read_qr_code_from_webcam()
                if qrcodevalue == "":
                    print("QR Code not found. Raising Notif to Security Team !")
                    Permission = False
                    return Permission
                elif   qrCode == qrcodevalue and DBPlate != final_plate:
                    print("QR Code found. Checking permissions...")
                    Permission = has_access(Permissions)
                    print("Permission : ", Permission)
                    print("Credentials Matched but raising Notif to Security Team for License Plate and sending photo of license plate !")
                    print("Opening the gate !")
                    return Permission
                elif   qrCode == qrcodevalue and DBPlate == final_plate:
                    print("QR Code found. Checking permissions...")
                    Permission = has_access(Permissions)
                    print("Permission : ", Permission)
                    return Permission
            elif Type == "Employee":
                print("Employee detected. Checking Face Detection, Look at the Camera ...")
                reconstructed_image = reconstruct_image(facePicture)
                faceid = Face_Recognition(reconstructed_image)
                print("Faceid : ", faceid)





        if rfid == DBrfid and final_plate == DBPlate and faceid == True:
            print("Credentials Matched !")
            Permission  = has_access(Permissions)
            print("Permission : ", Permission)
            return Permission
        elif rfid == DBrfid and final_plate != DBPlate and faceid == True:
            print("Credentials Matched but raising Notif to Security Team for License Plate and sending photo of license plate !")
            Permission  = has_access(Permissions)
            print("Permission : ", Permission)
            return Permission
        elif rfid == DBrfid and final_plate == DBPlate and faceid != True:
            print("Credentials Matched but raising Notif to Security Team for Face Detection and sending photo of detected face !")
            Permission  = has_access(Permissions)
            print("Permission : ", Permission)
            # Actuallly we should give the control to the security team
            return Permission
        else:
            print("Credentials didn't match !")
            print("Raising Notif to Security Team !")
            Permission = False
            return Permission
            # keep gate closed       
            
        
    else:
        if server_data is not None and len(server_data) > 0:

            # Data fetched from the server successfully
            Type = server_data.get("type", "")
            DBrfid = server_data["Employee"].get("rfidCode", "") if server_data.get("Employee") else ""
            DBPlate = server_data["Vehicles"][0].get("licensePlateNumber", "") if server_data.get("Vehicles") else ""
            Permissions = server_data["Permissions"][0].get("AccessPeriods", "") if server_data.get("Permissions") else ""
            qrCode = server_data.get("Visitor", {}).get("QrCode", "") if server_data.get("Visitor") else ""
            facePicture = server_data.get("Employee", {}).get("facepicture").get("data") if server_data.get("Employee") else ""
            print("PLATE : ", final_plate)
            print("RFID : ", rfid)
            print("rfidCode from DB : ", DBrfid)
            print("licensePlateNumber from DB : ", DBPlate)
            print("Permissions : ", Permissions)
            print("Type", Type)
            print("qrCode", qrCode)
            qrcodevalue = ""

            if Type == "Visitor":
                print("Visitor detected. Checking QR Code, Scan in Camera ...")
                qrcodevalue = read_qr_code_from_webcam()
                if qrcodevalue == "":
                    print("QR Code not found. Raising Notif to Security Team !")
                    Permission = False
                    return Permission
                elif   qrCode == qrcodevalue and DBPlate != final_plate:
                    print("QR Code found. Checking permissions...")
                    Permission = has_access(Permissions)
                    print("Permission : ", Permission)
                    print("Credentials Matched but raising Notif to Security Team for License Plate and sending photo of license plate !")
                    print("Opening the gate !")
                    return Permission
                elif   qrCode == qrcodevalue and DBPlate == final_plate:
                    print("QR Code found. Checking permissions...")
                    Permission = has_access(Permissions)
                    print("Permission : ", Permission)
                    return Permission
            elif Type == "Employee":
                print("Employee detected. Checking Face Detection, Look at the Camera ...")
                reconstructed_image = reconstruct_image(facePicture)
                faceid = Face_Recognition(reconstructed_image)
                print("Faceid : ", faceid)





            if rfid == DBrfid and final_plate == DBPlate and faceid == True:
                print("Credentials Matched !")
                Permission  = has_access(Permissions)
                print("Permission : ", Permission)
                return Permission
            elif rfid == DBrfid and final_plate != DBPlate and faceid == True:
                print("Credentials Matched but raising Notif to Security Team for License Plate and sending photo of license plate !")
                Permission  = has_access(Permissions)
                print("Permission : ", Permission)
                return Permission
            elif rfid != DBrfid and final_plate == DBPlate and faceid == True:
                print("Credentials Matched but raising Notif to Security Team for RFID !")
                Permission  = has_access(Permissions)
                print("Permission : ", Permission)
                return Permission
            elif rfid == DBrfid and final_plate == DBPlate and faceid != True:
                print("Credentials Matched but raising Notif to Security Team for Face Detection and sending photo of detected face !")
                Permission  = has_access(Permissions)
                print("Permission : ", Permission)
                return Permission
            elif rfid != DBrfid and final_plate == DBPlate and faceid != True:
                print("Credentials Matched but raising Notif to Security Team for RFID and waiting for decision for face verification !")
                Permission  = has_access(Permissions)
                print("Permission : ", Permission)
                Permission = False
            else:
                print("Credentials didn't match !")
                print("Raising Notif to Security Team !")
                Permission = False
                return Permission
                # keep gate closed
        else:
                print("No data available.")
                Permission = False
                return Permission

import pyzbar.pyzbar as pyzbar

def read_qr_code_from_webcam():
    time.sleep(3)

    while True:
        success, frame = cap.read()

        if not success:
            break

        decoded = pyzbar.decode(frame)

        if len(decoded) > 0:
            for barcode in decoded:
                print(barcode.data.decode("utf-8"))
            
            break

    return barcode.data.decode("utf-8")

from datetime import datetime, timedelta

def has_access(permission_table):

    permission_table = json.loads(permission_table)
     # Get the current day and time
    current_datetime = datetime.now()

    # Get the day of the week (Monday is 0, Sunday is 6)
    current_day = current_datetime.weekday()

    # Get the current time in hours
    current_time = current_datetime.hour

    # Check the permission for the current day
    current_day_permission = permission_table[current_day]
    print("current_day_permision : ",current_day_permission)

    # Check if the user has access based on the permission for the current day
    if isinstance(current_day_permission, list):
        # If permission is represented by a list, check each time range
        for time_range in current_day_permission:
            if isinstance(time_range, list):
                # If the time_range is a list, check each specific hour
                if str(current_time) in time_range:
                    return True
            else:
                # If the time_range is a single value or a range, handle appropriately
                if '-' in time_range:
                    start_time, end_time = map(int, time_range.split("-"))
                    if start_time <= current_time < end_time:
                        return True
                elif str(time_range) == '0':
                    return False
                elif str(time_range) == '5':
                    return True
                elif str(time_range) == '1' and (0 <= current_time < 6):
                    return True
                elif str(time_range) == '2' and (6 <= current_time < 12):
                    return True
                elif str(time_range) == '3' and (12 <= current_time < 18):
                    return True
                elif str(time_range) == '4' and (18 <= current_time < 24):
                    return True
    else:
        # If permission is represented by a single value or a range, handle appropriately
        if str(current_day_permission) == '0':
            return False
        elif str(current_day_permission) == '5':
            return True
        elif '-' in str(current_day_permission):
            start_time, end_time = map(int, str(current_day_permission).split("-"))
            if start_time <= current_time < end_time:
                return True
        elif str(current_day_permission) == '1' and (0 <= current_time < 6):
            return True
        elif str(current_day_permission) == '2' and (6 <= current_time < 12):
            return True
        elif str(current_day_permission) == '3' and (12 <= current_time < 18):
            return True
        elif str(current_day_permission) == '4' and (18 <= current_time < 24):
            return True

    return False


def hash_string(input_string):
    sha256_hash = hashlib.sha256()
    sha256_hash.update(input_string.encode('utf-8'))
    hashed_string = sha256_hash.hexdigest()
    return hashed_string


def LicensePlate2():
    model = YOLO("best.pt")


    global processing_enabled
    while True:
        _, frame = cap.read()
        res = model(frame)
        res_plotted = res[0].plot(line_width=2, font_size=14)
        ret, buffer = cv2.imencode('.jpg', res_plotted)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.get('/video')
def video2():
    return StreamingResponse(LicensePlate2(),media_type ='multipart/x-mixed-replace; boundary=frame')


@app.get('/testdb')
def process_and_store_data():
    output_file_path = 'cache.json'

    params = {
            'include': '{ "all":true,"nested":true}'
        }

    response = requests.get("http://localhost:3000/api/parkingusers", params=params)
    response_data = json.loads(response.text)
    extracted_data = []

    for row in response_data.get("rows", []):
        data = {
            "rfidCode": row.get("Employee", {}).get("rfidCode") if row.get("Employee") else "",
            "licensePlateNumber": row.get("Vehicles", [{}])[0].get("licensePlateNumber"),
            "name": row.get("name"),
            "type": row.get("type"),
        }

        sites = []
        for permission in row.get("Permissions", []):
            for site in permission.get("Sites", []):
                site_info = {
                    "siteName": site.get("name"),
                    "siteAddress": site.get("address"),
                    "sitePermission": permission.get("AccessPeriods"),
                }
                sites.append(site_info)

        data["sites"] = sites

        vehicles = []
        for vehicle in row.get("Vehicles", []):
            vehicle_info = {
                "brand": vehicle.get("brand"),
            }
            vehicles.append(vehicle_info)

        data["vehicles"] = vehicles

        data["QrCode"] = row.get("Visitor", {}).get("QrCode") if row.get("Visitor") else ""

        extracted_data.append(data)

    # Store the processed data in a JSON file
    with open(output_file_path, 'w') as json_file:
        json.dump(extracted_data, json_file, indent=2)


faceid = False

def Face_Recognition(image):
    # Load pre-trained face detector from dlib
    unknown_image = None

    detector = dlib.get_frontal_face_detector()

    # Load pre-trained facial landmark predictor from dlib
    predictor_path = "./Face_Recognition/shape_predictor_68_face_landmarks.dat"
    predictor = dlib.shape_predictor(predictor_path)

    # Open video capture
    # cap = cv2.VideoCapture(0)

    # Initialize variables for temporal consistency
    prev_landmarks = None
    start_time = time.time()
    score_live = 0.1
    score_not_live = 0.1
    while time.time() - start_time < duration:
        ret, frame = cap.read()

        if not ret:
            break

        # Perform face detection
        faces = detector(frame)

        for face in faces:
            # Perform facial landmarks detection
            shape = predictor(frame, face)

            # Extract mouth region for liveness detection (you may need to adjust the coordinates)
            mouth_points = list(range(48, 61))
            mouth_landmarks = np.array([(shape.part(i).x, shape.part(i).y) for i in mouth_points])

            # Calculate the aspect ratio of the mouth
            mouth_width = abs(mouth_landmarks[6][0] - mouth_landmarks[0][0])
            mouth_height = abs(mouth_landmarks[3][1] - mouth_landmarks[9][1])
            aspect_ratio = mouth_width / mouth_height
            # Perform basic texture analysis using histogram of pixel intensities in the mouth region
            #print(mouth_landmarks[3][1],mouth_landmarks[9][1],mouth_landmarks[0][0],mouth_landmarks[6][0])
            mouth_region = frame[mouth_landmarks[3][1]:mouth_landmarks[9][1], mouth_landmarks[0][0]:mouth_landmarks[6][0]]
            #print(mouth_region)
            hist = cv2.calcHist([mouth_region], [0], None, [256], [0, 256])
            texture_score = np.sum(hist[50:200]) / np.sum(hist)
            # Set a threshold for texture analysis (you may need to adjust this based on your environment)
            texture_threshold = 0.9
            
            # Check temporal consistency and texture analysis
            if prev_landmarks is not None:
                landmarks_diff = sum(abs(x - y) for (x, y) in zip(prev_landmarks, mouth_landmarks.flatten()))
                landmarks_diff_mean = landmarks_diff / len(mouth_landmarks)
                #print(landmarks_diff_mean,texture_score)
                if texture_score < texture_threshold:
                    # Facial landmarks and texture differ significantly, suggesting temporal consistency and liveness
                    #landmarks_diff_mean > 5 and 
                        cv2.putText(frame, "Live", (face.left(), face.top() - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
                        score_live += 1
                        unknown_image = frame
                else:
                        cv2.putText(frame, "Not Live", (face.left(), face.top() - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
                        score_not_live += 1

            # Store the current facial landmarks for the next iteration
            prev_landmarks = mouth_landmarks.flatten()
            
        # Display the resulting frame
        cv2.imshow('Liveness Detection', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    if unknown_image is not None:
        cv2.imwrite('unknown_image.jpg', unknown_image)    
    print(score_live)
    print(score_not_live)
    if score_not_live ==0 and score_live > 0 :
        print('LIVE')
        Live = True
    elif score_not_live > 0 and score_live ==0 :
        print('NOT LIVE')
        Live = False
    elif score_live / score_not_live >= 0.7 :
        print('LIVE')
        Live = True
    elif score_live / score_not_live < 0.7 :
        print('NOT LIVE')
        Live = False
    # Live =  (score_not_live ==0 and score_live > 0) or (score_not_live / score_live <= 0.2)
    # print(Live)
    if Live :
        known_image = face_recognition.load_image_file("reconstructed_face_image.jpg")
        if unknown_image is not None:
            unknown_image = face_recognition.load_image_file("unknown_image.jpg")
        else:
            print("No face detected")
            return False    

        known_encoding = face_recognition.face_encodings(known_image)[0]
        if unknown_image is not None:
            unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

        results = face_recognition.compare_faces([known_encoding], unknown_encoding)
        print(results)
        os.remove("unknown_image.jpg")
        os.remove("reconstructed_face_image.jpg")
        return results[0]
    # Release video capture and close all windows
    cap.release()
    cv2.destroyAllWindows()

def reconstruct_image(image_data):
    image_bytes = bytes(image_data)

    # Reconstruct the image using PIL
    image = Image.open(io.BytesIO(image_bytes))

    # Save the reconstructed image
    image.save('reconstructed_face_image.jpg')


# uvicorn realtimefeed:app --reload --host 0.0.0.0 --port 3000