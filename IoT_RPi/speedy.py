
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
import io

rfid = ""

site = "Site 1" # change this to Site 2 if you want to test the other site


duration = 3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# def detect():

#     cap = cv2.VideoCapture(0)
#     model = YOLO("best.pt")

#     while True:
#         success, frame = cap.read()


#         res = model(frame)

#         res_plotted = res[0].plot(line_width=2, font_size=14)
#         ret,buffer=cv2.imencode('.jpg',res_plotted)
#         frame=buffer.tobytes()


#         yield(b'--frame\r\n'
#             b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


#     cap.release()



# import time

# last_detection_time = 0
# cooldown_duration = 5 

# def detect2():

#     cap = cv2.VideoCapture(0)
#     model = YOLO("best.pt")

#     while True:
#         _, frame = cap.read()

#         res = model(frame)

#         res_plotted = res[0].plot(line_width=2, font_size=14)
#         try:
#             confidence = res[0].boxes.conf.item()
#             print(confidence)

#             global last_detection_time

#             if confidence > 0.45 and time.time() - last_detection_time > cooldown_duration:
#                 print("License Plate Detected !")
#                 plate = detect_Extract(frame)
#                 print("PLATE : ", plate)

#                 last_detection_time = time.time()

#         except:
#             print("No boxes detected in the image.")

#         ret, buffer = cv2.imencode('.jpg', res_plotted)
#         frame = buffer.tobytes()

#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


#     cap.release()


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

        # plate.append(letter)
        plate.append(labels[int(box.cls.item())])

    # sorted_boxes = sorted(boxes, key=lambda x: x[0].xyxy[0][i],reverse=True)
    # final_plate = []
    # for let in sorted_boxes:
    #     final_plate.append(labels[int(let.cls.item())])


    # final_final_plate = ''.join(plate)

    # print(final_final_plate)
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
      

# @app.get('/licenseplate')
# def LicensePlate():

#     start_time = time.time()
#     camera = cv2.VideoCapture(0)


#     _, frame = camera.read()
#     plate = detect_Extract(frame)
#     sorted_plate = sorted(plate, key=custom_sort)
#     final_plate = ''.join(sorted_plate)
#     print("PLATE : ", final_plate)
#     print("RFID : ",rfid)
#     # if(result[0] != "Couldn't Detect a License Plate !"):
#     img = cv2.imread("plate.jpg", cv2.IMREAD_ANYCOLOR)
#     cv2.imshow("License Plate : "+str(plate[0]),img)

#     time.sleep(3)

#     if time.time() - start_time >= 20:
#         print("Camera off")
#         cv2.destroyAllWindows()
        
@app.post('/rfid')
async def LicensePlate(data: dict):
    global rfid
    rfid = data['rfid']
    rfid = rfid[:3]




def custom_sort(item):
    if item.isdigit():
        return (0, int(item))
    else:
        return (1, item)

cap = cv2.VideoCapture(0)


@app.get('/licenseplate')
def LicensePlate():

    # cap = cv2.VideoCapture(0)
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
            # return False

        #     ret, buffer = cv2.imencode('.jpg', res[0].plot(line_width=2, font_size=14))
        #     frame = buffer.tobytes()

        #     yield (b'--frame\r\n'
        #            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        # else:

        #     ret, buffer = cv2.imencode('.jpg', frame)
        #     frame = buffer.tobytes()

        #     yield (b'--frame\r\n'
        #            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# def checkPermission(final_plate=None,rfid=None,qrCode=None):
#     # print("final_plate : ",final_plate)
#     # print("rfid : ",rfid)
#     # print("qrCode : ",qrCode)
#     params = {
#                         'licensePlateNumber': final_plate,
#                         'rfidCode': rfid,
#                         'QrCode': qrCode,
#                     }

#     response = requests.get("http://localhost:3000/api/parkingusers/fetchUserData",params=params)
#     response_data = json.loads(response.text)
#     DBrfid = response_data["Employee"]["rfidCode"]
#     DBPlate = response_data["Vehicles"][0]["licensePlateNumber"]
#     Permissions = response_data["Permissions"][0]["AccessPeriods"]
#     print("PLATE : ", final_plate)
#     print("RFID : ",rfid)
#     print("rfidCode from DB : ",DBrfid)
#     print("licensePlateNumber from DB : ",DBPlate)
#     print("Permissions : ",Permissions)

#     if rfid == DBrfid and final_plate == DBPlate:
#         print("Credentials Matched !")
#         print("Opening the gate !")
#         # Permission  = has_access(Permissions)
#         Permission = True
#         return Permission
#         # send request to open door
#     elif rfid == DBrfid and final_plate != DBPlate:
#         print("Credentials Matched but raising Notif to Security Team for License Plate and sending photo of license plate !") # implement sending photo to the security team
#         print("Opening the gate !")
#         # Permission  = has_access(Permissions)
#         Permission = True
#         return Permission
#         # send request to open door
#     elif rfid != DBrfid and final_plate == DBPlate:
#         print("Credentials Matched but raising Notif to Security Team for RFID !")
#         print("Opening the gate !")
#         # Permission  = has_access(Permissions)
#         Permission = True
#         return Permission
#         # send request to open door
#         # ?????????????????????????????????????????????????????
#     else:
#         print("Credentials didn't match !")
#         print("Raising Notif to Security Team !")
#         Permission = False
#         return Permission
#         # keep gate closed
        
def fetch_data_from_server(params):
    try:
        response = requests.get("http://localhost:3000/api/parkingusers/fetchUserData", params=params)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx or 5xx)
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
            # Access the relevant information from the file_data[0]
            DBrfid = file_data[0].get("rfidCode", "")
            DBPlate = file_data[0].get("licensePlateNumber", "")
            Permissions = file_data[0].get("sites", [])[0].get("sitePermission", "")
            Name = file_data[0].get("name", "")
            UserType = file_data[0].get("type", "")
            Site = file_data[0].get("sites", [])[0].get("siteName", "")
            CarBrand = file_data[0].get("vehicles", [])[0].get("brand", "")
            QrCode = file_data[0].get("QrCode", "")

            # Use the extracted information as needed
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
                # Access the relevant information from the file_data[0]
                DBrfid = file_data[0].get("rfidCode", "")
                DBPlate = file_data[0].get("licensePlateNumber", "")
                Permissions = file_data[0].get("sites", [])[0].get("sitePermission", "")
                Name = file_data[0].get("name", "")
                UserType = file_data[0].get("type", "")
                Site = file_data[0].get("sites", [])[0].get("siteName", "")
                CarBrand = file_data[0].get("vehicles", [])[0].get("brand", "")
                QrCode = file_data[0].get("QrCode", "")

                # Use the extracted information as needed
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
                    # Access the relevant information from the file_data[0]
                    DBrfid = file_data[0].get("rfidCode", "")
                    DBPlate = file_data[0].get("licensePlateNumber", "")
                    Permissions = file_data[0].get("sites", [])[0].get("sitePermission", "")
                    Name = file_data[0].get("name", "")
                    Type = file_data[0].get("type", "")
                    Site = file_data[0].get("sites", [])[0].get("siteName", "")
                    CarBrand = file_data[0].get("vehicles", [])[0].get("brand", "")
                    QrCode = file_data[0].get("QrCode", "")

                    # Use the extracted information as needed
                    print(f"RFID Code: {DBrfid}")
                    print(f"License  Plate Number: {DBPlate}")
                    print(f"Permissions: {Permissions}")
                    print(f"Name: {Name}")
                    print(f"User Type: {Type}")
                    print(f"Site: {Site}")
                    print(f"Car Brand: {CarBrand}")
                    print(f"QR Code: {QrCode}")
                else:
                    # No data available
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

        if rfid == DBrfid and final_plate == DBPlate:
            print("Credentials Matched !")
            # print("Opening the gate !")
            Permission  = has_access(Permissions)
            print("Permission : ", Permission)
            # Permission = True
            return Permission
            # send request to open door
        elif rfid == DBrfid and final_plate != DBPlate:
            print("Credentials Matched but raising Notif to Security Team for License Plate and sending photo of license plate !")
            # print("Opening the gate !")
            Permission  = has_access(Permissions)
            print("Permission : ", Permission)

            # Permission = True
            return Permission
            # send request to open door
        elif rfid != DBrfid and final_plate == DBPlate:
            print("Credentials Matched but raising Notif to Security Team for RFID !")
            # print("Opening the gate !")
            Permission  = has_access(Permissions)
            print("Permission : ", Permission)

            # Permission = True
            return Permission
            # send request to open door
            # ?????????????????????????????????????????????????????
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

            print("PLATE : ", final_plate)
            print("RFID : ", rfid)
            print("rfidCode from DB : ", DBrfid)
            print("licensePlateNumber from DB : ", DBPlate)
            print("Permissions : ", Permissions)
            print("Type", Type)
            print("qrCode", qrCode)
            qrcodevalue = ""

        #     if Type == "Visitor":
        #         print("Visitor detected. Checking QR Code, Scan in Camera ...")
        #         qrcodevalue = read_qr_code_from_webcam()
        #         if qrcodevalue == "":
        #             print("QR Code not found. Raising Notif to Security Team !")
        #             Permission = False
        #             return Permission
        #         elif   qrCode == qrcodevalue and DBPlate != final_plate:
        #             print("QR Code found. Checking permissions...")
        #             Permission = has_access(Permissions)
        #             print("Permission : ", Permission)
        #             print("Credentials Matched but raising Notif to Security Team for License Plate and sending photo of license plate !")
        #             print("Opening the gate !")
        #             return Permission
        #         elif   qrCode == qrcodevalue and DBPlate == final_plate:
        #             print("QR Code found. Checking permissions...")
        #             Permission = has_access(Permissions)
        #             print("Permission : ", Permission)
        #             return Permission

        #     if rfid == DBrfid and final_plate == DBPlate:
        #         print("Credentials Matched !")
        #         # print("Opening the gate !")
        #         Permission  = has_access(Permissions)
        #         print("Permission : ", Permission)
        #         # Permission = True
        #         return Permission
        #         # send request to open door
        #     elif rfid == DBrfid and final_plate != DBPlate:
        #         print("Credentials Matched but raising Notif to Security Team for License Plate and sending photo of license plate !")
        #         # print("Opening the gate !")
        #         Permission  = has_access(Permissions)
        #         print("Permission : ", Permission)

        #         # Permission = True
        #         return Permission
        #         # send request to open door
        #     elif rfid != DBrfid and final_plate == DBPlate:
        #         print("Credentials Matched but raising Notif to Security Team for RFID !")
        #         # print("Opening the gate !")
        #         Permission  = has_access(Permissions)
        #         print("Permission : ", Permission)

        #         # Permission = True
        #         return Permission
        #         # send request to open door
        #         # ?????????????????????????????????????????????????????
        #     else:
        #         print("Credentials didn't match !")
        #         print("Raising Notif to Security Team !")
        #         Permission = False
        #         return Permission
        #         # keep gate closed
        # else:
        #     # No data available
        #     print("No data available.")
        #     Permission = False
        #     return Permission
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
                    if Permission == True:
                        print("Credentials Matched and permission is granted but raising Notif to Security Team for License Plate and waiting for a decision !")
                    return False
                elif   qrCode == qrcodevalue and DBPlate == final_plate:
                    print("QR Code found. Checking permissions...")
                    Permission = has_access(Permissions)
                    print("Permission : ", Permission)
                    return Permission

            if rfid == DBrfid and final_plate == DBPlate:
                print("Credentials Matched !")
                # print("Opening the gate !")
                Permission  = has_access(Permissions)
                print("Permission : ", Permission)
                # Permission = True
                return Permission
                # send request to open door
            elif rfid == DBrfid and final_plate != DBPlate:
                print("Credentials Matched but raising Notif to Security Team for License Plate and waiting for a decision !")
                # print("Opening the gate !")
                Permission  = has_access(Permissions)
                print("Permission : ", Permission)
                if Permission == True:
                    print("Credentials Matched and permission is granted but raising Notif to Security Team for License Plate and waiting for a decision !")
                return False
                # send request to open door
            elif rfid != DBrfid and final_plate == DBPlate:
                print("Credentials Matched but raising Notif to Security Team for RFID !")
                Permission  = has_access(Permissions)
                print("Permission : ", Permission)
                if Permission == True:
                    print("Credentials Matched and permission is granted but raising Notif to Security Team for RFID and waiting for a decision !")
                return False
            else:
                print("Credentials didn't match !")
                print("Raising Notif to Security Team !")
                Permission = False
                return Permission
        else:
            # No data available
            print("No data available.")
            Permission = False
            return Permission

import pyzbar.pyzbar as pyzbar

def read_qr_code_from_webcam():
    # Start the webcam
    time.sleep(3)

    while True:
        # Capture the frame from the webcam
        success, frame = cap.read()

        if not success:
            break

        # Decode QR codes in the frame
        decoded = pyzbar.decode(frame)

        # Print the decoded data
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



import hashlib

def hash_string(input_string):
    sha256_hash = hashlib.sha256()
    sha256_hash.update(input_string.encode('utf-8'))
    hashed_string = sha256_hash.hexdigest()
    return hashed_string

# Example usage:
# permission_table = [5, 2, 3, 4, 1, 0, [1, 2]]
# if has_access(permission_table):
#     print("User has access at the current moment.")
# else:
#     print("User does not have access at the current moment.")

def LicensePlate2():

    # cap = cv2.VideoCapture(0)
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



# @app.get('/licenseplate')
# def video():
#     # return StreamingResponse(detect(),media_type ='multipart/x-mixed-replace; boundary=frame')
#     # return StreamingResponse(detect2(),media_type ='multipart/x-mixed-replace; boundary=frame')
#     return StreamingResponse(LicensePlate(),media_type ='multipart/x-mixed-replace; boundary=frame')

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

