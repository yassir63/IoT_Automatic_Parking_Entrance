import cv2
import time
from gpiozero import DistanceSensor
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
from ultralytics import YOLO
import easyocr
import imutils
import multiprocessing
import requests

class PiCamera():
    def __init__(self, src=0, img_size=(640,480), fps=36, rotate_180=False):
        self.img_size = img_size
        self.fps = fps
        self.cap = cv2.VideoCapture(src)
        #self.cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
        #self.cap.set(cv2.CAP_PROP_FPS, self.fps)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, self.img_size[0])
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, self.img_size[1])
        self.rotate_180 = rotate_180
    def run(self):       
        # read the frame
        ret, image = self.cap.read()
        if self.rotate_180:
            image = cv2.rotate(image, cv2.ROTATE_180)
        if not ret:
            raise RuntimeError("failed to read frame")
        return image 

    def video(self):
        while True:
            # Capture frame-by-frame
            ret, frame = self.cap.read()

            # Check if frame was successfully captured
            if not ret:
                print("Unable to capture frame")
                break

            # # Display the resulting frame
            # frame = model(frame)
            cv2.imshow('Video', frame)

def ExtractText(roi):
    roi = cv2.resize(roi, None,fx=6,fy=6, interpolation = cv2.INTER_CUBIC)
    ocr = YOLO("ocr.pt")
    text = ocr(roi)
    # res_plotted = text[0].plot()
    # cv2.imshow(res_plotted)

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

        plate.append(letter)

    sorted_boxes = sorted(boxes, key=lambda x: x[0].xyxy[0][i],reverse=True)
    final_plate = []
    for let in sorted_boxes:
        final_plate.append(labels[int(let.cls.item())])


    final_final_plate = ''.join(final_plate)

    print(final_final_plate)
    return final_final_plate

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
            # reader = easyocr.Reader(['fr'])
            # text = reader.readtext(roi)

            # print(text)
            # detected_text = [txt[1] for txt in text]

            # print(detected_text)
            # return detected_text
            plate = ExtractText(roi)
            return plate
        else:
            print("No boxes detected in the image.")
            return ["Couldn't Detect a License Plate !"]
    except IndexError as e:
        print(f"IndexError: {e}. No License Plate was detected !") 
        return ["Couldn't Detect a License Plate !"]
      
    
def PostInfo():
    url = 'http://192.168.192.4:3000/test'
    response = requests.get(url)

    if response.status_code == 200:
        print('Request was successful!')
        print('Response content:', response.text)
    else:
        print('Request failed with status code:', response.status_code)

    
def LicensePlate():

    start_time = time.time()
    camera = PiCamera(src=0, img_size=(640, 480), fps=36, rotate_180=False)

    image = camera.run()
    result = detect_Extract(image)
    if(result[0] != "Couldn't Detect a License Plate !"):
        img = cv2.imread("plate.jpg", cv2.IMREAD_ANYCOLOR)
        cv2.imshow("License Plate : "+str(result[0]),img)

    time.sleep(3)

    if time.time() - start_time >= 20:
        print("Camera off")
        cv2.destroyAllWindows()
        

def RFID():
    reader = SimpleMFRC522()

    try:
            id, text = reader.read()
            print(id)
            print(text)
    finally:
            GPIO.cleanup()



def ultrasonic():

    start_time = time.time()
    ultrasonic = DistanceSensor(echo=17, trigger=4, threshold_distance=0.5, max_distance=2)

    previous_states = ["out", "out"]

    while True:
        current_distance = ultrasonic.distance

        if current_distance <= ultrasonic.threshold_distance:
            current_state = "in"
            print('in')
        else:
            current_state = "out"
            print("out")

      
        if previous_states == ["in", "in"] and current_state == "in":
            print("Car Detected !")
            p1 = multiprocessing.Process(target=RFID)
            p2 = multiprocessing.Process(target=LicensePlate)

            p1.start()
            p2.start()

            p1.join()
            p2.join()

            print("Car Granted Access !")
            break

        if previous_states == ["in", "out"] and current_state == "in":
            print("Alert! Back-to-back cars detected!")
            break

        previous_states.pop(0)
        previous_states.append(current_state)

        if time.time() - start_time >= 20:
            print("ultrasonic off")
            break

        time.sleep(0.4)
        

ultrasonic()
# PostInfo()