import React, { Component } from 'react';
// import './background2.css';
import face from './images/logo192.png';
import './Contact.css';
export class Contact extends Component {
    render() {
        return (
            <>
                <div className='header'>
                    <h1>Contact the Developers👨🏻‍💻</h1>
                </div>
                <div className='developers'>
                    <ul className='devlist'>
                        <li>
                            <img src={face} alt="face" />
                            <p>Gurman Singh</p>
                        </li>
                        <li>
                            <img src={face} alt="face" />
                            <p>Harneet Singh</p>
                        </li>
                        <li>
                            <img src={face} alt="face" />
                            <p>Kuldeep Singh</p>
                        </li>
                        <li>
                            <img src={face} alt="face" />
                            <p>Sahibjot Singh</p>
                        </li>

                    </ul>
                </div>
                
            </>

        );
    }
}

export default Contact;