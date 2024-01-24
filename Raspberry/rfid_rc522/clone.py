import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import time

reader = SimpleMFRC522()

try:
        id, text = reader.read()
        # print(id)
        print(text)
        time.sleep(5)
        reader.write(text)
        print("Written")
finally:
        GPIO.cleanup()