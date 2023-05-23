// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import MapDensitySuicide from '../components/MapDensitySuicide';
import BarSuicide from '../components/BarSuicide'
import PieMastodon from '../components/PieMastodon'
import Navbar from '../components/Navbar';
import MainPic from '../components/MainPic';
import SuicidePic from '../assets/suicide.jpeg'
import Footer from '../components/Footer';

// Destructuring Content from Layout
const { Content } = Layout;

// Functional component definition
const Scenario2 = () => {

    // Using useState for handling component state
    const [barData, setBarData] = useState([]);
    const [mapData, setMapData] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from APIs when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Function to fetch data from APIs
    const fetchData = async () => {
        try {
            const responseBar = await fetch('http://172.26.132.174:8080/api/sudo_suicide');
            const jsonBarData = await responseBar.json();
            setBarData(jsonBarData);

            const response = await fetch('http://172.26.132.174:8080/api/emotion_count');
            const jsonData = await response.json();
            setMapData(jsonData);

            const responsePie = await fetch('http://172.26.132.174:8080/api/mastodon_suicide');
            const jsonPieData = await responsePie.json();
            // Reformat pie data into a form suitable for charting
            const pieDataFormat = jsonPieData.map(item => {
                const name = Object.keys(item)[0]; // Get the key
                const value = item[name]; // Get the value using the key
                return { name, value };
            });
            setPieData(pieDataFormat);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    // Function to handle navigation back to home page
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/');
    };

    // Component rendering
    return (
        <>
            <Navbar />

            <MainPic
                cName="hero-mid"
                heroImg={SuicidePic}
                title="Suicide"
                textStyle="hero-text-mid"
            />

            <Layout>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <div className="data-analysis" style={{ marginTop: '20px', textAlign: 'center' }}>
                        <h1>Death Ratio Caused by Suicide for each State in Australia</h1>
                        <BarSuicide data={barData} />

                        {loading ? (
                            <p>Loading map data...</p>
                        ) : (
                            <MapDensitySuicide mapData={mapData} />
                        )}

                        <h1>Mastodon Sentiment Analysis</h1>
                        <PieMastodon data={pieData} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                        <Button type="primary" onClick={handleGoBack} style={{ width: '15%', textAlign: 'center' }}>
                            Go Back to Homepage
                        </Button>
                    </div>
                </Content>
            </Layout>

            <Footer />
        </>
    );
};

// Exporting the Scenario2 component
export default Scenario2;
