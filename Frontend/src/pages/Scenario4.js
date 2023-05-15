import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import * as echarts from 'echarts';
import Map from '../components/Map';

const { Header, Footer } = Layout;

const Scenario4 = () => {

    const [barData, setBarData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://172.26.134.78:8080/api/emotion_count');
            const jsonData = await response.json();
            setBarData(jsonData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    console.log(barData);

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/');
    };

    const chartRef = useRef(null);

    useEffect(() => {
        // Add this inside useEffect
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    top: '5%',
                    left: 'center',
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['45%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 20,
                            borderColor: '#fff',
                            borderWidth: 2,
                        },
                        label: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 30,
                                fontWeight: 'bold',
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: barData,
                    },
                ],
            });

            window.addEventListener('resize', myChart.resize);
        }
    }, [chartRef, barData]);

    return (
        <Layout>
            <Header style={{ backgroundColor: '#1DA57A', textAlign: 'center' }} />

            <div className="data-analysis" style={{ margin: '20px', textAlign: 'center' }}>
                <h1>Data Analysis</h1>

                <div
                    ref={chartRef}
                    style={{ width: '100%', height: '400px', margin: '0 auto' }}
                ></div>

                {/* {loading ? (
                    <p>Loading map data...</p>
                ) : (
                    <Map dataPoints={barData} />
                )} */}
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

export default Scenario4;
