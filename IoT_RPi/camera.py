import cv2
import time

def detect_Extract(image):
    from ultralytics import YOLO
    import easyocr
    import cv2
    import imutils


    # Load a model

    detect = YOLO('./best.pt')  # load a custom model OCR
    # ocr = YOLO('./ocr.pt')  # load a custom model DETECTION
    # results = ocr(image) 
    results = detect(image)
    res_plotted = results[0].plot()
    # cv2.imshow(res_plotted)
    boxes = results[0].boxes
    box = boxes[0]  # returns one box

    # Getting current bounding box coordinates

    x_min, y_min = box.xyxy[0][0].item(), box.xyxy[0][1].item()
    box_width, box_height = box.xyxy[0][2].item(), box.xyxy[0][3].item()
    res_plotted = results[0].plot(conf=False)
    roi = res_plotted[int(y_min): int(box_height), int(x_min): int(box_width)]
    roi = imutils.resize(roi, width=700)
    cv2.imwrite('plate4.jpg', roi)

    reader = easyocr.Reader(['fr'])

    text = reader.readtext(roi)

    print(text)
    detected_text = [txt[1] for txt in text]

    print(detected_text)



    return detected_text


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
    

start_time = time.time()  # Get the current time
# Create an instance of PiCamera
camera = PiCamera(src=0, img_size=(640, 480), fps=36, rotate_180=False)

while True:    # Run the camera and capture an image
    image = camera.run()

    # Display the captured image
    cv2.imshow("Captured Image", image)

    # Call the detect_Extract function
    result = detect_Extract(image)

    # Print or use the result as needed
    print("License Plate:", result)

    if cv2.waitKey(1) == ord('q'):
        break


    if time.time() - start_time >= 20:  # Check if 20 seconds have elapsed
        print("Camera off")
        break  # Exit the loop if the time limit is reached

# Release the camera and close the window
camera.release()
cv2.destroyAllWindows()


