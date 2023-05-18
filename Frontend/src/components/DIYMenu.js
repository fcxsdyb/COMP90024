import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, LinkOutlined, SettingOutlined, MailOutlined } from '@ant-design/icons';

const DIYMenu = () => {    
    const navigate = useNavigate();
    const navigateTo = (key) => {
        navigate(`/${key}`);
    }

    return (
        <Menu mode="inline" defaultSelectedKeys={['1']} theme='dark'>
            <Menu.Item key="1" icon={<SettingOutlined />} onClick={() => navigateTo('scenario1')}>Scenario 1</Menu.Item>
            <Menu.Item key="2" icon={<LinkOutlined />} onClick={() => navigateTo('scenario2')}>Scenario 2</Menu.Item>
            <Menu.Item key="3" icon={<AppstoreOutlined />} onClick={() => navigateTo('scenario3')}>Scenario 3</Menu.Item>
            <Menu.Item key="4" icon={<MailOutlined />} onClick={() => navigateTo('scenario4')}>Scenario 4</Menu.Item>
        </Menu>
    );
}

export default DIYMenu;
