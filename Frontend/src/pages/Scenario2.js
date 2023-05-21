import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import MapDensitySuicide from '../components/MapDensitySuicide';
import DIYMenu from '../components/DIYMenu';
import Title from 'antd/es/typography/Title';
import Navbar from '../components/Navbar';
import MainPic from '../components/MainPic';
import SuicidePic from '../assets/suicide.jpeg'
import Footer from '../components/Footer';

const { Content } = Layout;

const Scenario2 = () => {

    const [mapData, setMapData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
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
                heroImg={SuicidePic}
                title="Suicide"
                text="Tell a Story"
                textStyle="hero-text-mid"
            />

            <Layout>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <div className="data-analysis" style={{ margin: '20px', textAlign: 'center' }}>
                        <Title>Comparison of Suicide Attention and Real Death Toll</Title>

                        {loading ? (
                            <p>Loading map data...</p>
                        ) : (
                            <MapDensitySuicide />
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

export default Scenario2;
