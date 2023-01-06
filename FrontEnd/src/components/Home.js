import React from "react";
import { useState } from "react";
import "./Home.css";

export const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [data, setData] = useState("");
  const [file, setFile] = useState();
  const [fname, setFname] = useState("");
  const [isLoading, setLoading] = useState(false);

  const setDefaultValues = () => {
    setIsFilePicked(false);
    setData("");
    setSelectedFile(null);
    setFile(null);
    setFname("");
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
      });
  };

  return (
    <div>
      <center>
        <form onSubmit={handleSubmit}>
          <div className="upload-box">
            <input
              type="file"
              onChange={changeHandler}
              disabled={isLoading}
              onClick={setDefaultValues}
              id="image"
              style={{ display: "none" }}
            />
            <label for="image">
              <i class="fa-solid fa-cloud-arrow-up"></i>
              <p style={{ fontSize: 20 }}>Upload the image</p>
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

          <div id="output">{data}</div>
        </form>
      </center>
    </div>
  );
};
