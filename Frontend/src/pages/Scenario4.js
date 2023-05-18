import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import * as echarts from 'echarts';
import DIYMenu from '../components/DIYMenu';
import Title from 'antd/es/typography/Title';

const { Sider, Content } = Layout;

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
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 3,
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
            <Sider width={200} style={{ overflow: "auto" }}>
                <DIYMenu />
            </Sider>

            <Layout>
                <Content style={{
                    minHeight: 280,
                    maxWidth: 'calc(100% - 200px)',
                    margin: 'auto'
                }}>
                    <div className="data-analysis" style={{ margin: '20px', textAlign: 'center' }}>
                        <Title>Comparison of Suicide Attention and Real Death Toll</Title>
                    </div>

                    <div
                        ref={chartRef}
                        style={{
                            width: '100%',
                            height: '400px',
                        }}>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                        <Button type="primary" onClick={handleGoBack} style={{ width: '20%', textAlign: 'center' }}>
                            Go Back to Homepage
                        </Button>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Scenario4;
