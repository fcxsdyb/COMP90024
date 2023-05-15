import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import * as echarts from 'echarts';
import Map from '../components/Map';

const { Header, Footer } = Layout;

const Scenario1 = () => {

    const [barData, setBarData] = useState([]);
    const [mapData, setMapData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Use useRef to prevent unnecessary re-renders of barFinal.
    const barFinalRef = useRef([
        { name: 'All Cancer Death', type: 'bar', stack: 'total', label: { show: true }, emphasis: { focus: 'series' }, data: [] },
        { name: 'Breast Cancer Death', type: 'bar', stack: 'total', label: { show: true }, emphasis: { focus: 'series' }, data: [] },
        { name: 'Colorectal Cancer Death', type: 'bar', stack: 'total', label: { show: true }, emphasis: { focus: 'series' }, data: [] },
        { name: 'Lung Cancer Death', type: 'bar', stack: 'total', label: { show: true }, emphasis: { focus: 'series' }, data: [] },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseBar = await fetch('http://172.26.134.78:8080/api/sudo_data_cancer');
                const jsonBarData = await responseBar.json();
                const responseMap = await fetch('http://172.26.134.78:8080/api/cancer_map');
                const jsonMapData = await responseMap.json();
                setBarData(jsonBarData);
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
            barFinalRef.current[0].data.push(item.all_cancer);
            barFinalRef.current[1].data.push(item.breast_cancer);
            barFinalRef.current[2].data.push(item.colorectal_cancer_death);
            barFinalRef.current[3].data.push(item.lung_cancer);
        });
    }, [barData]);

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/');
    };

    const chartRef = useRef(null);

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
