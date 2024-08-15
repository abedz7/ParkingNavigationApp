from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import cv2
import numpy as np
import pytesseract
from pytesseract import Output
import os

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  # Update path if needed

app = FastAPI()

@app.post("/upload-image/")
async def upload_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        nparr = np.fromstring(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if image is None:
            raise HTTPException(status_code=400, detail="Invalid image file")

        # Convert image to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        gray = cv2.GaussianBlur(gray, (5, 5), 0)
        edged = cv2.Canny(gray, 30, 200)

        contours, _ = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]

        license_plate_contour = None
        for contour in contours:
            approx = cv2.approxPolyDP(contour, 10, True)
            if len(approx) == 4:
                license_plate_contour = approx
                break

        if license_plate_contour is not None:
            mask = np.zeros(gray.shape, np.uint8)
            cv2.drawContours(mask, [license_plate_contour], 0, 255, -1)
            license_plate = cv2.bitwise_and(image, image, mask=mask)

            (x, y) = np.where(mask == 255)
            (topX, topY) = (np.min(x), np.min(y))
            (bottomX, bottomY) = (np.max(x), np.max(y))
            cropped = gray[topX:bottomX + 1, topY:bottomY + 1]

            _, cropped = cv2.threshold(cropped, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

            text = pytesseract.image_to_string(cropped, config='--psm 8')
            return JSONResponse(content={"Detected License Plate Text": text})

        else:
            raise HTTPException(status_code=404, detail="No license plate contour found")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
