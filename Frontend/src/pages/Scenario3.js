import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import MapDensityCarAccident from '../components/MapDensityCarAccident';
import Title from 'antd/es/typography/Title';
import Navbar from '../components/Navbar';
import MainPic from '../components/MainPic';
import CarAccidentPic from '../assets/caraccident.jpeg'
import Footer from '../components/Footer';

const { Content } = Layout;

const Scenario3 = () => {

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

    const data = [
        { name: 'A', value: 400 },
        { name: 'B', value: 300 },
        { name: 'C', value: 200 },
        { name: 'D', value: 100 },
    ];

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
                text="Tell a Story"
                textStyle="hero-text-mid"
            />

            <Layout>

                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <div className="data-analysis" style={{ margin: '20px', textAlign: 'center' }}>
                        <Title>Comparison of Car Accident and Real Death Toll</Title>

                        <div className="bar-chart">
                            <h2>Bar Chart</h2>
                            <BarChart width={600} height={300} data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </div>

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
