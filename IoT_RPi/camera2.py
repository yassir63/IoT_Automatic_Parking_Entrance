import cv2

# Access the camera (usually 0 for USB cameras)
camera = cv2.VideoCapture(0)

while True:
    # Capture a frame-by-frame
    ret, frame = camera.read()

    # Display the resulting frame
    cv2.imshow('Camera Output', frame)

    # Exit when 'q' is pressed
    if cv2.waitKey(1) == ord('q'):
        break

# Release the camera and close the window
camera.release()
cv2.destroyAllWindows()
