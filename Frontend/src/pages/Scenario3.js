import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Map from '../components/Map';

const { Header, Footer } = Layout;

const Scenario3 = () => {

    const [mapData, setMapData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://172.26.134.78:8080/api/diabetes_map');
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

    console.log(mapData)

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <Layout>
            <Header style={{ backgroundColor: '#1DA57A', textAlign: 'center' }} />

            <div className="data-analysis" style={{ margin: '20px', textAlign: 'center' }}>
                <h1>Comparison of diabetes attention and real death toll</h1>

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

export default Scenario3;
