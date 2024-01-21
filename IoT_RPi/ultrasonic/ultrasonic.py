from gpiozero import DistanceSensor


# ultrasonic = DistanceSensor(echo=17, trigger=4)


# while True:
#     # print(ultrasonic.distance)
#     if(ultrasonic.distance < 0.5):
#         print("True")
#     else:
#         print("False")



# ultrasonic = DistanceSensor(echo=17, trigger=4, threshold_distance=0.5,max_distance=2)

# while True:
#     ultrasonic.wait_for_in_range()
#     print("In range")
#     ultrasonic.wait_for_out_of_range()
#     print("Out of range")


# import time
# threshold_distance = 0.5
# ultrasonic = DistanceSensor(echo=17, trigger=4, threshold_distance=threshold_distance, max_distance=2)

# previous_state = None

# while True:
#     current_distance = ultrasonic.distance # Get the current distance

#     current_state = "In range" if current_distance <= threshold_distance else "Out of range"

#     if current_state != previous_state:  # Check for state change
#         print(current_state)
#         # Perform your desired actions based on the state change

#     previous_state = current_state

#     time.sleep(0.1)  # Adjust delay as needed


import time

start_time = time.time()  # Get the current time

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

    # Check for the specific sequence of events
    if previous_states == ["in", "out"] and current_state == "in":
        print("Alert! Back-to-back cars detected!")  # Raise the alert
        break

    previous_states.pop(0)  # Remove the oldest state
    previous_states.append(current_state)  # Add the current state

    if time.time() - start_time >= 20:  # Check if 20 seconds have elapsed
        print("ultrasonic off")
        break  # Exit the loop if the time limit is reached

    time.sleep(0.4)
