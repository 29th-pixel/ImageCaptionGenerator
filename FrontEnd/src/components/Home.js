import React, { Component } from 'react';

import './Home.css';
export class Home extends Component {

    state = {
        previewImg: ""
    }

    imgSelectHandler(e) {

        if (e.target.files.length !== 0) {
            this.setState({
                previewImg: URL.createObjectURL(e.target.files[0])
            })
        }
    }
    render() {
        return (
            <>
                <center>
                    <h1>Upload the image</h1>
                    <hr />
                    <input type="file" onChange={this.imgSelectHandler.bind(this)} />
                    <hr />
                    <img src={this.state.previewImg} alt="preview" height="250" width="250" />
                </center>


            </>
        );
    }
}
export default Home;