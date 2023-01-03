import React, { Component } from 'react';
import './Contact.css';
export class Contact extends Component {
    render() {
        return (
            <>
                <div className='header'>
                    <h1><u>Contact the Developers👨🏻‍💻</u></h1>
                </div>
                <div className='developers'>
                    <ul className='devlist'>
                        <li>
                            <p>Gurman Singh</p>
                            
                        </li>
                        <li>
                            
                            <p>Harneet Singh</p>
                        </li>
                        <li>
                            
                            <p>Kuldeep Singh</p>
                        </li>
                        <li>
                            
                            <p>Sahibjot Singh</p>
                        </li>

                    </ul>
                </div>
                
            </>

        );
    }
}

export default Contact;