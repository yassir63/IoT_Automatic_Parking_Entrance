import cv2
import time
from gpiozero import DistanceSensor
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import multiprocessing
import requests

ultrasonicread = DistanceSensor(echo=17, trigger=4, threshold_distance=0.2, max_distance=2)

def RFID():
    reader = SimpleMFRC522()
    
    time.sleep(1)

    try:
        id, text = reader.read_no_block()
        print(id)
        print(text)
        data = {"rfid": text, "id": id}
        if data is not None:
            url = 'http://192.168.137.1:3000/rfid'
            requests.post(url, json=data)
        return data
    except Exception as e:
        print(f"RFID Error: {e}")
        return None

def TriggerLicenseOnPC(queue):
    print("Initiating License Plate Detection")
    url = 'http://192.168.137.1:3000/licenseplate'
    response = requests.get(url)
    print('License Detection running on Laptop !')
    queue.put(response.text)

def ultrasonic(ultrasonic):
    previous_states = ["out", "out"]

    while True:
        current_distance = ultrasonic.distance
        print(ultrasonic.distance)

        if current_distance <= ultrasonic.threshold_distance:
            current_state = "in"
            print('in')
        else:
            current_state = "out"
            print("out")

        if previous_states == ["in", "in"] and current_state == "in":
            print("Car Detected !")
            result_queue = multiprocessing.Queue()
            p1 = multiprocessing.Process(target=RFID)
            p2 = multiprocessing.Process(target=TriggerLicenseOnPC, args=(result_queue,))

            p1.start()
            p2.start()

            p1.join()
            p2.join()

            permission = result_queue.get()
            if permission == "false":
                print("Permission not Granted !")
            else:
                print("Permission Granted !")
            break

        if previous_states == ["in", "out"] and current_state == "in":
            print("Alert! Back-to-back cars detected!")
            break

        previous_states.pop(0)
        previous_states.append(current_state)

        time.sleep(0.4)

GPIO.setmode(GPIO.BCM)


def ultrasonicvirtual():
    result_queue = multiprocessing.Queue()
    p1 = multiprocessing.Process(target=RFID)
    p2 = multiprocessing.Process(target=TriggerLicenseOnPC, args=(result_queue,))

    p1.start()
    p2.start()

    p1.join()
    p2.join()

    permission = result_queue.get()
    if permission == "false":
        print("Permission not Granted !")
    else:
        print("Permission Granted !")


try:
    while True:

        # ultrasonic(ultrasonicread)
        ultrasonicvirtual()
        time.sleep(15)
        # print("Sensing again !")
        print("Detected a car Virtually !")

except KeyboardInterrupt:
    print("Interrupted by user")
finally:
    GPIO.cleanup()
