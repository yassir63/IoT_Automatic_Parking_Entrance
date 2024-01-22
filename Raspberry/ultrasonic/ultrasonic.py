from gpiozero import DistanceSensor
import time

start_time = time.time()

ultrasonic = DistanceSensor(echo=17, trigger=4, threshold_distance=0.5, max_distance=2)

previous_states = ["out", "out"]  # Track the two most recent states

while True:
    current_distance = ultrasonic.distance

    if current_distance <= ultrasonic.threshold_distance:
        current_state = "in"
        print('in')
    else:
        current_state = "out"
        print("out")

    if previous_states == ["in", "out"] and current_state == "in":
        print("Alert! Back-to-back cars detected!")  # Raise the alert
        break

    previous_states.pop(0)
    previous_states.append(current_state) 

    if time.time() - start_time >= 20: 
        print("ultrasonic off")
        break 

    time.sleep(0.4)
