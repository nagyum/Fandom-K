import React from 'react';
import './Sections.css';
import '../styles/color.scss';
import '../styles/font.scss';

function Section({donate, title, bgimg, screenimg}){
    return (
        <div className="section">
            <div className="section-header">
                <p>{donate}</p>
                <h1>{title}</h1>
            </div>
         <div className="image-container1">
            <div className="background-image">
                <img src={bgimg} alt={title} />
            </div> 
            <div className="foreground-image">
                <img src={screenimg} alt={title} />
            </div>
         </div> 
        </div>



    )

}

export default Section;