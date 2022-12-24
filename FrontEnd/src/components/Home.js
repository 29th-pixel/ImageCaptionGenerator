import React from 'react';
import {useState} from 'react'
import './Home.css';


export const Home = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [data, setData] = useState('');

    
    

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const formData2 = new FormData();
        formData2.append(
            "file",
            selectedFile,
        );

        const requestOptions = {
            method: 'POST',
            body: formData2
        };
        
        fetch('http://127.0.0.1:5000/genCaption', requestOptions)
            .then(response => response.json())
            .then(function (response) {
                    // console.log('response')
                    // console.log(response)
                    
                    let a = response;
                    console.log(a);
                    setData(response.caption);
                    
                    // document.getElementById("output").innerHTML = response;
            });
        
        
        
    }

    return (
            <>
            {/* <script language="Javascript">
             function showInput() {
            a = {{caption}};
            document.getElementById("display").innerHTML = a;
            }
            </script> */}
                <center>
                    <h1>Upload the image</h1>
                    <hr />
                    <form onSubmit={handleSubmit}>
                    <input type="file" onChange={changeHandler}/>
                    <hr />
                    <button type="submit" >SUBMIT</button>
                    <hr />
                    <div id="output">{data}</div>
                    </form>
                </center>


            </>
    );
} 