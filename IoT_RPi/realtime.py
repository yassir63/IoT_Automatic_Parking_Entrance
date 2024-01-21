import os
import cv2
from ultralytics import YOLO
import imutils

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
            # roi = imutils.resize(roi, width=700)
            # cv2.imwrite('plate.jpg', roi)
            # reader = easyocr.Reader(['fr'])
            # text = reader.readtext(roi)

            # print(text)
            # detected_text = [txt[1] for txt in text]

            # print(detected_text)
            # return detected_text
            # plate = ExtractText(roi)
            os.system("yolo predict model=best.pt source=0 conf=.25 show=True")
            return None
        else:
            print("No boxes detected in the image.")
            return ["Couldn't Detect a License Plate !"]
    except IndexError as e:
        print(f"IndexError: {e}. No License Plate was detected !") 
        return ["Couldn't Detect a License Plate !"]
      

def capture():
    import cv2
    from ultralytics import YOLO

    # Load the YOLOv8 model
    model = YOLO('best.pt')

    # Open the video file
    # video_path = "path/to/your/video/file.mp4"
    # cap = cv2.VideoCapture(video_path)
    cap = cv2.VideoCapture(0)


    # Loop through the video frames
    while cap.isOpened():
        # Read a frame from the video
        success, frame = cap.read()

        if success:
            # Run YOLOv8 inference on the frame
            results = model(frame)

            # Visualize the results on the frame
            annotated_frame = results[0].plot()

            # Display the annotated frame
            cv2.imshow("License Plate Detection", annotated_frame)

            # Break the loop if 'q' is pressed
            if cv2.waitKey(1) & 0xFF == ord("q"):
                break
        else:
            # Break the loop if the end of the video is reached
            break

    # Release the video capture object and close the display window
    cap.release()
    cv2.destroyAllWindows()

    
capture()