import multiprocessing
import subprocess

def run_script(script_name):
    subprocess.run(["python", script_name])

p1 = multiprocessing.Process(target=run_script, args=("camera.py",))
p2 = multiprocessing.Process(target=run_script, args=("./rfid_rc522/read.py",))
p3 = multiprocessing.Process(target=run_script, args=("./ultrasonic/ultrasonic.py",))


p1.start()
p2.start()
p3.start()

p1.join()  # Wait for processes to finish (optional)
p2.join()
p3.join()