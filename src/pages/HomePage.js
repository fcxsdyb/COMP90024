import React from 'react';
import { Layout, Typography, Carousel } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const HomePage = () => {
    return (
        <Layout>
            <Header style={{ backgroundColor: '#1DA57A', textAlign: 'center' }} />
            
            <Content style={{ padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
                <Title level={2} style={{ marginBottom: '20px' }}>Group 48 Scenario Presentation</Title>

                <Carousel style={{ height: '100px' }} autoplay>
                    <div>
                        <Link to="/scenario1"><h1>Scenario 1</h1></Link>
                    </div>
                    <div>
                        <h1>Scenario 2</h1>
                    </div>
                    <div>
                        <h1>Scenario 3</h1>
                    </div>
                    <div>
                        <h1>Scenario 4</h1>
                    </div>
                </Carousel>
            </Content>

            <Footer style={{ backgroundColor: '#1DA57A', textAlign: 'center' }}>COMP90024 Project 2 ©2023 Created by Group 48</Footer>
        </Layout>
    );
};

export default HomePage;
