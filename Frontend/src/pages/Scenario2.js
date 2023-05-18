import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import Map from '../components/Map';

const { Header, Footer } = Layout;

const Scenario2 = () => {

    const [mapData, setMapData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://172.26.134.78:8080/api/car_accident_map');
            const jsonData = await response.json();
            setMapData(jsonData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    console.log(mapData)

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <Layout>
            <Header style={{ backgroundColor: '#1DA57A', textAlign: 'center' }} />

            <div className="data-analysis" style={{ margin: '20px', textAlign: 'center' }}>
                <h1>Comparison of car accident attention and real death toll</h1>

                {loading ? (
                    <p>Loading map data...</p>
                ) : (
                    <Map dataPoints={mapData} />
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <Button type="primary" onClick={handleGoBack} style={{ width: '15%', textAlign: 'center' }}>
                    Go Back to Homepage
                </Button>
            </div>

            <Footer style={{ backgroundColor: '#1DA57A', textAlign: 'center' }}>COMP90024 Project 2 ©2023 Created by Group 48</Footer>
        </Layout>
    );


};

export default Scenario2;
