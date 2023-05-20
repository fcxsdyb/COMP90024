import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import Map from '../components/Map';
import DIYMenu from '../components/DIYMenu';
import Title from 'antd/es/typography/Title';

const { Sider, Content } = Layout;

const Scenario2 = () => {

    const [mapData, setMapData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://172.26.132.174:8080/api/car_accident_map');
            const jsonData = await response.json();
            setMapData(jsonData);
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

    return (
        <Layout>
            <Sider width={200} style={{ overflow: "auto" }}>
                <DIYMenu />
            </Sider>

            <Layout>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <div className="data-analysis" style={{ margin: '20px', textAlign: 'center' }}>
                        <Title>Comparison of Car Accident Attention and Real Death Toll</Title>

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

export default Scenario2;
