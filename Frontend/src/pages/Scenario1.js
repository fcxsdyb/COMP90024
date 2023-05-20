import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import * as echarts from 'echarts';
import Map from '../components/Map';
import DIYMenu from '../components/DIYMenu';
import Title from 'antd/es/typography/Title';

const { Sider, Content } = Layout;

const Scenario1 = () => {

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
            <Sider width={200} style={{ overflow: "auto" }}>
                <DIYMenu />
            </Sider>

            <Layout>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <div className="data-analysis" style={{ margin: '20px', textAlign: 'center' }}>
                        <Title>Comparison of Cancer Attention and Real Death Toll</Title>

                        <div
                            ref={chartRef}
                            style={{ margin: '30px', width: '100%', height: '400px', textAlign: 'center' }}>
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
        </Layout>
    );
};

export default Scenario1;
