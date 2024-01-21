import dlib
import numpy as np
import cv2
import time

duration = 3

# Load pre-trained face detector from dlib
detector = dlib.get_frontal_face_detector()

# Load pre-trained facial landmark predictor from dlib
predictor_path = "shape_predictor_68_face_landmarks.dat"
predictor = dlib.shape_predictor(predictor_path)

# Open video capture
cap = cv2.VideoCapture(0)

# Initialize variables for temporal consistency
prev_landmarks = None
start_time = time.time()
while True : #time.time() - start_time < duration:
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
        print(texture_score)
        # Set a threshold for texture analysis (you may need to adjust this based on your environment)
        texture_threshold = 0.8

        # Check temporal consistency and texture analysis
        if prev_landmarks is not None:
            landmarks_diff = sum(abs(x - y) for (x, y) in zip(prev_landmarks, mouth_landmarks.flatten()))
            landmarks_diff_mean = landmarks_diff / len(mouth_landmarks)
            #print(landmarks_diff_mean,texture_score)
            if texture_score < texture_threshold:
                # Facial landmarks and texture differ significantly, suggesting temporal consistency and liveness
                #landmarks_diff_mean > 5 and 
                    cv2.putText(frame, "Live", (face.left(), face.top() - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
            else:
                    cv2.putText(frame, "Not Live", (face.left(), face.top() - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

        # Store the current facial landmarks for the next iteration
        prev_landmarks = mouth_landmarks.flatten()

    # Display the resulting frame
    cv2.imshow('Liveness Detection', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release video capture and close all windows
cap.release()
cv2.destroyAllWindows()
