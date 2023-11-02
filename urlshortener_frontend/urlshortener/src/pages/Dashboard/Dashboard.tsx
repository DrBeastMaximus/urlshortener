import React, {useEffect, useState} from 'react';
import {Routes, Route, Link, useLocation, useNavigate} from 'react-router-dom';
import Shortener from '../../components/Shortener/Shortener';
import {Button, Layout, Menu} from 'antd';
import './Dashboard.scss';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LinkOutlined,
    KeyOutlined,
    HistoryOutlined, LogoutOutlined
} from "@ant-design/icons";
import URLBoard from "../../components/URLBoard/URLBoard";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const history = useNavigate()

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const logout = () => {
        localStorage.clear()
        window.location.reload();
    }

    let location = useLocation();
    const [current, setCurrent] = useState(location.pathname);

    useEffect(() => {
        if (location) {
            if( current !== location.pathname ) {
                setCurrent(location.pathname);
            }
        }
    }, [location, current]);

    function handleClick(e: any) {
        setCurrent(e.key);
    }


    return (
        <div>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <Menu onClick={handleClick} theme="dark" mode="inline" defaultSelectedKeys={['/']} selectedKeys={[current]}>
                        <Menu.Item key="/" icon={<LinkOutlined/>}>
                            <Link to={"/"}>Shorten your URL</Link>
                        </Menu.Item>
                        <Menu.Item key="/changepassword" icon={<KeyOutlined/>}>
                            <Link to={"/changepassword"}>Change Password</Link>
                        </Menu.Item>
                        <Menu.Item key="/history" icon={<HistoryOutlined/>}>
                            <Link to={"/history"}>Previous Link</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="header">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={toggle}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                                color: "white"
                            }}
                        />
                        <Button
                            type="text"
                            title={"Logout"}
                            icon={<LogoutOutlined />}
                            onClick={logout}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                                color: "white",
                                float: "right"
                            }}
                        />
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Routes>
                            <Route path="/" element={<Shortener />} />
                            <Route path="/changepassword" element={<ChangePasswordForm />} />
                            <Route path="/history" element={<URLBoard />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default Dashboard