import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Map from '../components/Map';

const { Header, Footer } = Layout;

const DataAnalysis = () => {

    const [mapData, setMapData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/api/cancer_map');
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

    return (
        <Layout>
            <Header style={{ backgroundColor: '#1DA57A', textAlign: 'center' }} />

            <div className="data-analysis" style={{ margin: '20px', textAlign: 'center' }}>
                <h1>Data Analysis</h1>

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

            <Footer style={{ backgroundColor: '#1DA57A', textAlign: 'center' }}>COMP90024 Project 2 ©2023 Created by Group 48</Footer>
        </Layout>
    );
};

export default DataAnalysis;