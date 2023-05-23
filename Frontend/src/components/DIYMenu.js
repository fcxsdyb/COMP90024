import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, LinkOutlined, SettingOutlined, MailOutlined } from '@ant-design/icons';

// DIYMenu component that renders a customized menu using the Ant Design library
const DIYMenu = () => {
    // Access the navigate and location functions from the react-router-dom library
    const navigate = useNavigate();
    const location = useLocation();

    // Function to navigate to the selected menu item
    const navigateTo = (key) => {
        navigate(`/${key}`);
    }

    // Event handler for menu item selection
    const handleMenuSelect = ({ key }) => navigateTo(key);

    // Get the current key by extracting it from the location pathname
    const currentKey = location.pathname.split("/")[1];

    return (
        <Menu mode="inline" defaultSelectedKeys={[currentKey]} theme='dark' onSelect={handleMenuSelect}>
            <Menu.Item key="general" icon={<SettingOutlined />}>General</Menu.Item>
            <Menu.Item key="scenario1" icon={<SettingOutlined />}>Scenario 1</Menu.Item>
            <Menu.Item key="scenario2" icon={<LinkOutlined />}>Scenario 2</Menu.Item>
            <Menu.Item key="scenario3" icon={<AppstoreOutlined />}>Scenario 3</Menu.Item>
            <Menu.Item key="scenario4" icon={<MailOutlined />}>Scenario 4</Menu.Item>
        </Menu>
    );
}

export default DIYMenu;
