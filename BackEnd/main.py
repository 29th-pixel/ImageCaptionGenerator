import uvicorn
import os
from fastapi import FastAPI, status, responses, File, UploadFile, Form, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from predictor import predict

app = FastAPI(debug=True)

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


@app.post('/genCaption')
def captiongen(file: UploadFile = File(...)):
    pass


if __name__ == "__main__":
    uvicorn.run(app, port=5000)
