import React from 'react';
import Navbar from '../components/Navbar';
import MainPic from '../components/MainPic';
import HomePagePic from '../assets/Homepage.png'

const HomePage = () => {
    return (
        <>
            <Navbar />
            <MainPic
                cName="hero"
                heroImg={HomePagePic}
                title="COMP90024 GROUP48"
                text="Data Analysis from Twitter, Sudo Library, Mastodon Server"
                textStyle="hero-text"
            />
        </>
    );
}

export default HomePage;
