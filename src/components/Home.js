import React, {useEffect, useState} from 'react';
import "../index.css"
import ImgTitleSection from "../Data/Image/ImgHomeTitleSection.png"
import {FaEnvelope, FaGithub} from "react-icons/fa";
import foods from '../Data/JSON/foodInput.json';
import foods2 from '../Data/JSON/foodInput2.json';
import foods3 from '../Data/JSON/foodInput3.json';
import DynamicPieChart from "./Chart";


function HomePage() {

    console.log(localStorage.getItem('currentUser'));

    function TitleSection() {
        return (
            <div className='webTitleSection'>
                <img
                    className='webTitleImg'
                    src={ImgTitleSection}
                    alt="ImgTitleSection"
                />
                <h1 className='webTitleHeader'>NutriGenius</h1>
                <span className="links-Titlesection">
                        <a href="https://github.com/RandolphTang/NutriGenius" target="_blank"
                           rel="noopener noreferrer">
                        <FaGithub/>
                        </a>

                        <a href="mailto:y031125k@gmail.com?subject=Subject Text&body=Body Content" target="_blank"
                           rel="noopener noreferrer">
                        <FaEnvelope/>
                        </a>
            </span>
            </div>
        )
    }

    function CarouselComponent() {

        const datasets = [foods, foods2, foods3];

        const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % datasets.length);
            }, 3000);

            return () => clearInterval(interval);
        }, []);

        const handleDotClick = index => {
            setCurrentIndex(index);
        };

        return (
            <div className="disPlaySection">

                <div className="carouselDots">
                    {datasets.map((_, index) => (
                        <span
                            key={index}
                            style={{
                                height: '20px',
                                width: '20px',
                                backgroundColor: currentIndex === index ? 'grey' : 'transparent',
                                border: '1px solid rgba(128, 128, 128, 0.3)',
                                borderRadius: '50%',
                                margin: '5px 0',
                                cursor: 'pointer',
                                marginLeft: '20%'

                            }}
                            onClick={() => handleDotClick(index)}
                        ></span>
                    ))}
                </div>

                <div className="disPlaySectionGuide">
                    <h1>NutriGenius</h1>
                    <p>NutriGenius helps you analyze<br/>
                        daily food source intake<br/>
                        based on nutrition content.
                    </p>

                    <button onClick={() => window.open("https://github.com/RandolphTang/NutriGenius", "_blank")}>
                        <FaGithub />
                        follow our update on GitHub
                    </button>

                </div>

                <DynamicPieChart data={datasets[currentIndex]}/>
            </div>
        );
    }


    return (
        <div>
            <TitleSection/>
            <CarouselComponent/>

        </div>
    )

}

export default HomePage;
