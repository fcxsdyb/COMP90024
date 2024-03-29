//  COMP90024 GROUP48
//  Yuhang Zhou     ID:1243037
//  Jitao Feng      ID:1265994
//  Hui Liu         ID:1336645
//  Jihang Yu       ID:1341312
//  Xinran Ren      ID:1309373

// Import necessary modules and components from react and your files
import React from 'react';
import Navbar from '../components/Navbar';
import MainPic from '../components/MainPic';
import HomePagePic from '../assets/homepage.avif'

// Functional component definition
const HomePage = () => {
    // Component rendering
    return (
        <>
            <Navbar />
            
            <MainPic
                cName="hero"  // prop for CSS class name
                heroImg={HomePagePic}  // prop for the image source
                title="COMP90024 GROUP48"  // prop for the title
                text="Data Analysis from Twitter, Sudo Library, Mastodon Server"  // prop for the description text
                textStyle="hero-text"  // prop for text CSS class name
            /> 
        </>
    );
}

// Exporting the HomePage component
export default HomePage;
