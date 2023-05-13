import React, { useRef } from 'react';
import { Layout, Typography, Carousel, Button } from 'antd';
import { Link } from 'react-router-dom';
import cancerImage from '../images/cancer.jpeg';
import car_accidentImage from '../images/car_accident.jpeg';
import diabetesImage from '../images/diabetes.png';
import suicideImage from '../images/suicide.jpeg';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const HomePage = () => {
    const ref = useRef();

    return (
        <Layout>
            <Header style={{ marginTop: '10px', backgroundColor: '#1DA57A', textAlign: 'center' }} />

            <Content style={{ padding: '20px', marginBottom: '10px', textAlign: 'center' }}>
                <Title level={2}>Group 48 Scenario Presentation</Title>

                <Carousel
                    style={{ height: '600px', display: 'flex', alignItems: 'center' }}
                    autoplay
                    dots={true}
                    dotPosition="bottom"
                    effect="scrollx"
                    pauseOnHover={true}
                    pauseonDotsHoverECtruzy
                    draggable
                    ref={ref}
                >
                    {/* Add a custom style attribute for each <img> tag */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                        <Link to="/scenario1" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <h1>Scenario 1</h1>
                            <h3>Comparison of cancer attention and real death toll</h3>
                            <img
                                src={cancerImage}
                                alt="cancer"
                                style={{
                                    width: '450px',
                                    height: '387px',
                                    objectFit: 'contain',
                                }}
                            />
                        </Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                        <Link to="/scenario2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <h1>Scenario 2</h1>
                            <h3>Comparison of car accident attention and real death toll</h3>
                            <img
                                src={car_accidentImage}
                                alt="car accident"
                                style={{
                                    width: '500px',
                                    height: '387px',
                                    objectFit: 'contain',
                                }}
                            />
                        </Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                        <Link to="/scenario3" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <h1>Scenario 3</h1>
                            <h3>Comparison of diabetes attention and real death toll</h3>
                            <img
                                src={diabetesImage}
                                alt="diabetes"
                                style={{
                                    width: '500px',
                                    height: '387px',
                                    objectFit: 'contain',
                                }}
                            />
                        </Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                        <Link to="/scenario4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <h1>Scenario 4</h1>
                            <h3>Comparison of suicide attention and real death toll</h3>
                            <img
                                src={suicideImage}
                                alt="suicide"
                                style={{
                                    width: '500px',
                                    height: '387px',
                                    objectFit: 'contain',
                                }}
                            />
                        </Link>
                    </div>
                </Carousel>
                <Button onClick={() => { ref.current?.prev(); }}>Prev</Button>
                <Button onClick={() => { ref.current?.next(); }}>Next</Button>

            </Content>

            <Footer style={{ backgroundColor: '#1DA57A', textAlign: 'center' }}>COMP90024 Project 2 ©2023 Created by Group 48</Footer>
        </Layout>
    );
}

export default HomePage;
