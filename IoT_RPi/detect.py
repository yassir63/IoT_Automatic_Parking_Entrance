def detect_Extract(image):
    from ultralytics import YOLO
    import easyocr
    import cv2
    import matplotlib.pyplot as plt
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

   



import cv2

# Load your image
image = cv2.imread('./train/AR-687-FF.jpg')

# Call the detect_Extract function
result = detect_Extract(image)

# Print or use the result as needed
print("License Plate:", result)