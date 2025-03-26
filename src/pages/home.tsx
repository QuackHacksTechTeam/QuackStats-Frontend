
import React from 'react';
import UrlsInUse from "../components/urls_in_use";
import SwapChartButton from '../components/swap_chart_button';
import { CHART_OPTIONS } from '../data/chart_options';
import "./css/homepage.css"


const HomePage: React.FC = () => {

    return (
        <>

            <SwapChartButton menuOptions={CHART_OPTIONS} label="Charts"/> 
            <div id="intro-container">
                <h1>QuackStats</h1> 
                <h2>View the Github data of QuackHacks contestents</h2> 
            </div> 
            <div id="url-inputs">
                <UrlsInUse /> 
            </div> 
        </>
    );
}

export default HomePage; 