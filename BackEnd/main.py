import uvicorn
import os
from fastapi import FastAPI, status, responses, File, UploadFile, Form, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from predictor import predict
import cv2
import numpy as np

app = FastAPI(title='Captioning API',
              description="API for generating captions of an image", version="1.0", debug=True)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    "http://192.168.1.41:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

vocabPath = os.path.dirname(os.getcwd()).replace(
    '\\', '/') + '/ImageCaptionGenerator/BackEnd/Model/vocab.npy'
weightPath = os.path.dirname(os.getcwd()).replace(
    '\\', '/') + '/ImageCaptionGenerator/BackEnd/Model/mine_model_weights.h5'

predictor = predict(vocabPath, weightPath)


def load_image_into_numpy_array(data):
    npimg = np.frombuffer(data, np.uint8)
    frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    return cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)


@app.post('/genCaption')
async def captiongen(file: UploadFile = File(...)):
    image = load_image_into_numpy_array(await file.read())
    caption = predictor.prediction(image)
    print(caption)
    # return {"Caption - ": caption}
    return responses.JSONResponse(content={"caption": caption})


if __name__ == "__main__":
    uvicorn.run(app, port=5000)
