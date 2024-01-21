import cv2
import pyzbar.pyzbar as pyzbar

def read_qr_code_from_webcam():
    # Start the webcam
    capture = cv2.VideoCapture(0)

    while True:
        # Capture the frame from the webcam
        success, frame = capture.read()

        if not success:
            break

        # Decode QR codes in the frame
        decoded = pyzbar.decode(frame)

        # Print the decoded data
        if len(decoded) > 0:
            for barcode in decoded:
                print(barcode.data.decode("utf-8"))
                
            break   

        # Display the frame
        cv2.imshow("QR Code Scanner", frame)

        # Wait for a key press before reading the next frame
        key = cv2.waitKey(1)

        if key == 27:
            break

    # Release the webcam and close the windows
    capture.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    read_qr_code_from_webcam()