//  COMP90024 GROUP48
//  Yuhang Zhou     ID:1243037
//  Jitao Feng      ID:1265994
//  Hui Liu         ID:1336645
//  Jihang Yu       ID:1341312
//  Xinran Ren      ID:1309373

// Import necessary modules from react, react-router-dom and antd.
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import * as echarts from 'echarts'; // Import echarts for data visualization

// Import necessary components and assets
import Map from '../components/Map';
import Navbar from '../components/Navbar';
import MainPic from '../components/MainPic';
import GeneralPic from '../assets/general.png'
import Footer from '../components/Footer';

// Destructure the 'Content' property from 'Layout'
const { Content } = Layout;

// Functional component definition
const General = () => {

    // Define states for pie chart data, map data and loading status
    const [pieData, setPieData] = useState([]);
    const [mapData, setMapData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetching data from the API when component is mounted
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching map data
                const responseMap = await fetch('http://172.26.132.174:8080/api/general_map');
                const jsonMapData = await responseMap.json();
                setMapData(jsonMapData);

                // Fetching pie chart data
                const responsePie = await fetch('http://172.26.132.174:8080/api/sudo_data_death_pie');
                let jsonPieData = await responsePie.json();

                // Data processing for pie chart
                // Transforming raw data to the form of {name: key, value: percentage} for each cause of death
                jsonPieData = jsonPieData.map(item => {
                    const totalDeaths = item.total_death;
                    let newArray = [];

                    for (const [key, value] of Object.entries(item)) {
                        if (key !== 'total_death' && key !== '_id' && key !== '_rev') {
                            let newKey = key.replace('death_of_', '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                            let newValue = `${((value / totalDeaths) * 100).toFixed(2)}`;
                            newArray.push({ value: newValue, name: newKey });
                        }
                    }

                    newArray.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
                    return newArray;
                });
                setPieData(jsonPieData);
                setLoading(false);
            } catch (error) {
                // Error handling: log the error and stop loading
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        // Call fetchData function
        fetchData();
    }, []);

    // Hook to programmatically navigate
    const navigate = useNavigate();
    // Navigate back to homepage
    const handleGoBack = () => {
        navigate('/');
    };

    // Reference to the DOM node for the pie chart
    let pieChartRef = useRef(null);

    // Initialize and update the pie chart when pieData or pieChartRef changes
    useEffect(() => {
        if (pieChartRef.current && pieData.length > 0) {
            const myChart = echarts.init(pieChartRef.current);

            const option = {
                title: {
                    text: 'The ten leading causes of human death in 2014 to 2018',
                    subtext: 'Data from SUDO dataset PHIDU - Premature Mortality - Cause (PHN) 2014-2018',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '45%',
                        data: pieData[0],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);

            return () => window.removeEventListener('resize', myChart.resize);
        }
    }, [pieChartRef, pieData]);

    // Component rendering
    return (
        <>
            <Navbar />
            <MainPic
                cName="hero-mid"
                heroImg={GeneralPic}
                title="General"
                textStyle="hero-text-mid"
            />
            <Layout>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <div className="data-analysis" style={{ margin: '20px', textAlign: 'center' }}>
                        <div
                            ref={pieChartRef}
                            style={{ marginTop: '20px', width: '100%', height: '500px' }}>
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
                </Content>
            </Layout>
            <Footer />
        </>
    );
};

// Exporting the General component
export default General;
