import React, { useState, useCallback } from "react";
import Lottie from "react-lottie";
import Loading from "../assets/Loading.json";
import { useDropzone } from "react-dropzone";
import "./Home.css";

export const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [data, setData] = useState("");
  const [file, setFile] = useState();
  const [fname, setFname] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
    setFname(acceptedFiles[0].name);
    setIsFilePicked(true);
    setFile(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });
  const setDefaultValues = () => {
    setIsFilePicked(false);
    setData("");
    setSelectedFile(null);
    setFile(null);
    setFname("");
  };

  const defaultOptionsLoading = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setFname(event.target.files[0].name);
    setIsFilePicked(true);
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setData("");
    setLoading(true);
    const formData2 = new FormData();
    formData2.append("file", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formData2,
    };

    fetch("http://127.0.0.1:5000/genCaption", requestOptions)
      .then((response) => response.json())
      .then(function (response) {
        let a = response;
        console.log(a);
        setData(response.caption);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setData(
          "Error occured!! Please check your connection or upload a valid image."
        );
      });
  };

  return (
    <div>
      <center>
        {!isLoading ? (
          <>
            <form onSubmit={handleSubmit}>
              <div className="upload-box" {...getRootProps()}>
                <input
                  type="file"
                  disabled={isLoading}
                  id="image"
                  style={{ display: "none" }}
                  {...getInputProps()}
                  onChange={changeHandler}
                  onClick={setDefaultValues}
                />
                <label for="image">
                  <i class="fa-solid fa-cloud-arrow-up"></i>
                  <p style={{ fontSize: 20 }}>
                    Click to Upload an image / Drag & Drop image here
                  </p>
                </label>
              </div>

              {isFilePicked ? (
                <div className="image-box">
                  <div className="image-preview">
                    <img src={file} />
                    <p>{fname}</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    class="btn btn-outline-secondary submit-buttion"
                  >
                    SUBMIT
                  </button>
                </div>
              ) : null}
            </form>
            <div class="output">{data}</div>
          </>
        ) : (
          <>
            <Lottie options={defaultOptionsLoading} height={400} width={400} />
            <div className="output">Generating Caption, Please wait ...</div>
          </>
        )}
      </center>
    </div>
  );
};
