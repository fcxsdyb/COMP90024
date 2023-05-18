import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, LinkOutlined, SettingOutlined, MailOutlined } from '@ant-design/icons';

const DIYMenu = () => {    
    const navigate = useNavigate();
    const location = useLocation();
    
    const navigateTo = (key) => {
        navigate(`/${key}`);
    }

    const handleMenuSelect = ({ key }) => navigateTo(key);

    const currentKey = location.pathname.split("/")[1];

    return (
        <Menu mode="inline" defaultSelectedKeys={[currentKey]} theme='dark' onSelect={handleMenuSelect}>
            <Menu.Item key="scenario1" icon={<SettingOutlined />}>Scenario 1</Menu.Item>
            <Menu.Item key="scenario2" icon={<LinkOutlined />}>Scenario 2</Menu.Item>
            <Menu.Item key="scenario3" icon={<AppstoreOutlined />}>Scenario 3</Menu.Item>
            <Menu.Item key="scenario4" icon={<MailOutlined />}>Scenario 4</Menu.Item>
        </Menu>
    );
}

export default DIYMenu;
