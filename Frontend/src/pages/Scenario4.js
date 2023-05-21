import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import LineChart from '../components/LineHealth'
import MapDensityHealth from '../components/MapDensityHealth'
import HealthPieMastodon from '../components/HealthPieMastodon'
import Navbar from '../components/Navbar';
import MainPic from '../components/MainPic';
import HospitalPic from '../assets/hospital.avif'
import Footer from '../components/Footer';

const { Content } = Layout;

const Scenario4 = () => {

    const [lineData, setLineData] = useState([]);
    const [mapData, setMapData] = useState([]);
    const [pieData, setPieData] = useState([]);
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
                data: [item.average_nov_16, item.average_nov_20, item.average_nov_21]
            }));

            setLineData(data);

            const responseMap = await fetch('http://172.26.132.174:8080/api/health_evaluation_map');
            const jsonMapData = await responseMap.json();
            setMapData(jsonMapData);

            const responsePie = await fetch('http://172.26.132.174:8080/api/mastodon_health_care');
            const jsonPieData = await responsePie.json();
            const pieDataFormat = jsonPieData.map(item => {
                const name = Object.keys(item)[0]; // Get the key
                const value = item[name]; // Get the value using the key
                return { name, value };
            });
            setPieData(pieDataFormat);
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
                textStyle="hero-text-mid"
            />

            <Layout>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <div className="data-analysis" style={{ margin: '20px', textAlign: 'center' }}>
                        <h1>Average Healthcare Employment Per City in each State in Australia</h1>
                        <LineChart lineData={lineData} />

                        {loading ? (
                            <p>Loading map data...</p>
                        ) : (
                            <MapDensityHealth mapData={mapData} />
                        )}

                        <h1>Mastodon Healthcare Related Sentiment Analysis</h1>
                        <HealthPieMastodon data={pieData} />
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
