import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import LineChart from '../components/LineHealth'
import MapDensityHealth from '../components/MapDensityHealth'
import Title from 'antd/es/typography/Title';
import Navbar from '../components/Navbar';
import MainPic from '../components/MainPic';
import HospitalPic from '../assets/hospital.avif'
import Footer from '../components/Footer';

const { Content } = Layout;

const Scenario4 = () => {

    const [lineData, setLineData] = useState([]);
    const [mapData, setMapData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://172.26.132.174:8080/api/sudo_health_evaluation');
            const jsonData = await response.json();

            const data = jsonData.map(item => ({
                name: item.state,
                type: 'line',
                stack: 'Total',
                data: [item.average_nov_16, item.average_nov_20, item.average_nov_21]
            }));

            setLineData(data);

            const responseMap = await fetch('http://172.26.132.174:8080/api/health_evaluation_map');
            const jsonMapData = await responseMap.json();
            setMapData(jsonMapData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/');
    };

    console.log(lineData)

    return (
        <>
            <Navbar />

            <MainPic
                cName="hero-mid"
                heroImg={HospitalPic}
                title="Hospital"
                text="Tell a Story"
                textStyle="hero-text-mid"
            />

            <Layout>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <div className="data-analysis" style={{ margin: '20px', textAlign: 'center' }}>
                        <Title>Comparison of Health Care and Real Death Toll</Title>

                        <LineChart lineData={lineData}/>

                        {loading ? (
                            <p>Loading map data...</p>
                        ) : (
                            <MapDensityHealth mapData={mapData} />
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

export default Scenario4;
