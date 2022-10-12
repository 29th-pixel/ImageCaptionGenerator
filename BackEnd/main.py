import uvicorn
from fastapi import FastAPI, status, responses, File, UploadFile, Form, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware

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


@app.post('/genCaption')
def captiongen():
    pass


if __name__ == "__main__":
    uvicorn.run(app, port=5000)
