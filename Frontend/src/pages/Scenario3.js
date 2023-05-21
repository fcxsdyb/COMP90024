import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import MapDensityCarAccident from '../components/MapDensityCarAccident';
import BarCarAccident from '../components/BarCarAccident'
import Navbar from '../components/Navbar';
import MainPic from '../components/MainPic';
import CarAccidentPic from '../assets/caraccident.jpeg'
import Footer from '../components/Footer';

const { Content } = Layout;

const Scenario3 = () => {

    const [barData, setBarData] = useState([]);
    const [mapData, setMapData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responseBar = await fetch('http://172.26.132.174:8080/api/sudo_car_accident');
            const jsonBarData = await responseBar.json();
            setBarData(jsonBarData);

            const response = await fetch('http://172.26.132.174:8080/api/car_accident_map');
            const jsonData = await response.json();
            setMapData(jsonData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <>
            <Navbar />

            <MainPic
                cName="hero-mid"
                heroImg={CarAccidentPic}
                title="Car Accident"
                textStyle="hero-text-mid"
            />

            <Layout>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <div className="data-analysis" style={{ margin: '20px', textAlign: 'center' }}>
                        <h1>Comparison of Car Accident and Real Death Toll</h1>

                        <BarCarAccident data={barData}/>

                        {loading ? (
                            <p>Loading map data...</p>
                        ) : (
                            <MapDensityCarAccident mapData={mapData} />
                        )}
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

export default Scenario3;
