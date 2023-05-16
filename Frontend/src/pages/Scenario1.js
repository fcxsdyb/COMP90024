import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import * as echarts from 'echarts';
import Map from '../components/Map';

const { Header, Footer } = Layout;

const Scenario1 = () => {

    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [mapData, setMapData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Use useRef to prevent unnecessary re-renders of barFinal.
    const barFinalRef = useRef([
        { name: 'Breast Cancer Death', type: 'bar', stack: 'total', label: { show: false }, emphasis: { focus: 'series' }, data: [] },
        { name: 'Colorectal Cancer Death', type: 'bar', stack: 'total', label: { show: false }, emphasis: { focus: 'series' }, data: [] },
        { name: 'Lung Cancer Death', type: 'bar', stack: 'total', label: { show: false }, emphasis: { focus: 'series' }, data: [] },
        { name: 'Other Cancer Death', type: 'bar', stack: 'total', label: { show: false }, emphasis: { focus: 'series' }, data: [] }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePie = await fetch('http://172.26.134.78:8080/api/sudo_data_cancer_pie');
                let jsonPieData = await responsePie.json();

                // Assume jsonPieData is an array
                jsonPieData = jsonPieData.map(item => {
                    const totalDeaths = item.total_death;
                    let newArray = [];
    
                    // Iterate over the keys and values of each item
                    for (const [key, value] of Object.entries(item)) {
                        if (key !== 'total_death' && key !== '_id' && key !== '_rev') {
                            // Remove "death_of_" prefix, replace underscores with spaces, and capitalize each word
                            let newKey = key.replace('death_of_', '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                            // Append "%" to the value and convert it to a string
                            let newValue = `${((value / totalDeaths) * 100).toFixed(2)}`;
                            newArray.push({value: newValue, name: newKey});
                        }
                    }
    
                    // Sort array by value in descending order
                    newArray.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
                    return newArray;
                });
                setPieData(jsonPieData);                  

                const responseBar = await fetch('http://172.26.134.78:8080/api/sudo_data_cancer');
                const jsonBarData = await responseBar.json();
                setBarData(jsonBarData);

                const responseMap = await fetch('http://172.26.134.78:8080/api/cancer_map');
                const jsonMapData = await responseMap.json();
                setMapData(jsonMapData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        barData.forEach(item => {
            barFinalRef.current[0].data.push(item.breast_cancer);
            barFinalRef.current[1].data.push(item.colorectal_cancer_death);
            barFinalRef.current[2].data.push(item.lung_cancer);
            barFinalRef.current[3].data.push(item.other_cancer);
        });
    }, [barData]);

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/');
    };

    let pieChartRef = useRef(null);

    useEffect(() => {
        if (pieChartRef.current && pieData.length > 0) { // Ensure pieChartRef and pieData are available before initializing the chart.
            const myChart = echarts.init(pieChartRef.current);

            const option = {
                legend: {
                    top: 'bottom'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: 'Death Causes Chart',
                        type: 'pie',
                        radius: [50, 200],
                        center: ['50%', '50%'],
                        roseType: 'radius',
                        itemStyle: {
                            borderRadius: 10
                        },
                        data: pieData[0]
                    }
                ]
            };
            myChart.setOption(option);

            // Cleanup function to remove event listener on component unmount.
            return () => window.removeEventListener('resize', myChart.resize);
        }
    }, [pieChartRef, pieData]);

    let chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current && barData.length > 0) { // Ensure chartRef and barData are available before initializing the chart.
            const myChart = echarts.init(chartRef.current);

            const option = {
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                legend: {},
                grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
                xAxis: { type: 'value' },
                yAxis: { type: 'category', data: ['SA', 'ACT', 'QLD', 'NSW', 'NT', 'WA', 'TAS', 'VIC'] },
                series: barFinalRef.current
            };
            myChart.setOption(option);

            // Cleanup function to remove event listener on component unmount.
            return () => window.removeEventListener('resize', myChart.resize);
        }
    }, [chartRef, barData]);

    return (
        <Layout>
            <Header style={{ backgroundColor: '#1DA57A', textAlign: 'center' }} />

            <div className="data-analysis" style={{ margin: '20px', textAlign: 'center' }}>
                <h1>Data Analysis</h1>

                <div ref={chartRef} style={{ width: '100%', height: '500px' }}></div>

                <div ref={pieChartRef} style={{ width: '100%', height: '500px' }}></div>

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

export default Scenario1;
