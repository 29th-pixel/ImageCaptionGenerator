import React, { Component } from 'react';
// import './background2.css';
import img1 from './images/img1.PNG';
import img2 from './images/img2.PNG';
import img3 from './images/img3.PNG';
import './About.css';
export class About extends Component {
    render() {
        return (
            <>

                <div className='main-content'>
                    <div className='heading'>
                        <h1>
                            Image caption Generator
                        </h1>
                        <p>
                            Aim to build
                            an optimal system which can generate semantically and grammatically accurate
                            captions for an image.
                        </p>  
                    </div>
                </div>

                <div className='information-content'>
                    <h2>Visualisation</h2>
                    <div className='cards'>
                        <div className='card1'>
                            <img src={img1} alt="man in black shirt is playing guitar"/>
                            <p>"man in black shirt is playing guitar"</p>
                        </div>
                        <div className='card1'>
                            <img src={img2} alt="construction worker in orange safety vest is working on road"/>
                            <p>"construction worker in orange safety vest is working on road"</p>
                        </div>
                        <div className='card1'>
                            <img src={img3} alt="two young girls are playing with lego toy" />
                            <p>"two young girls are playing with lego toy"</p>
                        </div>
                    </div>
                </div>

                <div className='footercontent'>
                    <p>Image Caption Generator</p>
                </div>
            </>
        );

    }
}
export default About;

