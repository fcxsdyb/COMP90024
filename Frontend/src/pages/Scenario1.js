//  COMP90024 GROUP48
//  Yuhang Zhou     ID:1243037
//  Jitao Feng      ID:1265994
//  Hui Liu         ID:1336645
//  Jihang Yu       ID:1341312
//  Xinran Ren      ID:1309373

// Import necessary modules and components
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import * as echarts from 'echarts';
import MapDensityCancer from '../components/MapDensityCancer';
import Navbar from '../components/Navbar';
import MainPic from '../components/MainPic';
import CancerPic from '../assets/cancer.jpeg'
import Footer from '../components/Footer';

// Destructuring Content from Layout
const { Content } = Layout;

// Functional component definition
const Scenario1 = () => {

    // Using useState for handling component state
    const [barData, setBarData] = useState([]);
    const [mapData, setMapData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Using useRef to hold constant data structure for bar chart
    const barFinalRef = useRef([
        { name: 'Breast Cancer Death', type: 'bar', stack: 'total', label: { show: false }, emphasis: { focus: 'series' }, data: [] },
        { name: 'Colorectal Cancer Death', type: 'bar', stack: 'total', label: { show: false }, emphasis: { focus: 'series' }, data: [] },
        { name: 'Lung Cancer Death', type: 'bar', stack: 'total', label: { show: false }, emphasis: { focus: 'series' }, data: [] },
        { name: 'Other Cancer Death', type: 'bar', stack: 'total', label: { show: false }, emphasis: { focus: 'series' }, data: [] }
    ]);

    // Fetch data from APIs when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseBar = await fetch('http://172.26.132.174:8080/api/sudo_data_cancer');
                const jsonBarData = await responseBar.json();
                setBarData(jsonBarData);

                const responseMap = await fetch('http://172.26.132.174:8080/api/cancer_map');
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

    // Populate barFinalRef with data from barData when it changes
    useEffect(() => {
        barData.forEach(item => {
            barFinalRef.current[0].data.push(item.breast_cancer);
            barFinalRef.current[1].data.push(item.colorectal_cancer_death);
            barFinalRef.current[2].data.push(item.lung_cancer);
            barFinalRef.current[3].data.push(item.other_cancer);
        });
    }, [barData]);

    // Handle navigation back to home page
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/');
    };

    // Ref to bar chart
    let chartRef = useRef(null);

    // Initialize and update bar chart when chartRef or barData changes
    useEffect(() => {
        if (chartRef.current && barData.length > 0) {
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

            return () => window.removeEventListener('resize', myChart.resize);
        }
    }, [chartRef, barData]);

    // Component rendering
    return (
        <>
            <Navbar />

            <MainPic
                cName="hero-mid"
                heroImg={CancerPic}
                title="Cancer"
                textStyle="hero-text-mid"
            />

            <Layout>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <div className="data-analysis" style={{ margin: '20px', textAlign: 'center' }}>
                        <h1>The number of deaths caused by different types of cancer in Australia</h1>
                        <div
                            ref={chartRef}
                            style={{ margin: '30px', width: '100%', height: '400px', textAlign: 'center' }}>
                        </div>

                        {loading ? (
                            <p>Loading map data...</p>
                        ) : (
                            <MapDensityCancer mapData={mapData} />
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

// Exporting the Scenario1 component
export default Scenario1;
