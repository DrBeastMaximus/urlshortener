import React, { useState } from 'react';
import {Form, Input, Button, Modal, FormInstance} from 'antd';
import './Shortener.scss'
import {URLService} from "../../services/URLService";

const Shortener = () => {
    const [shortCode, setShortCode] = useState('');
    const [originalUrl, setOriginalUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ error, setError ] = useState();
    const URLShortenService = new URLService();
    const BASE_URL = "http://localhost:8080/url/s/";

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const code = await URLShortenService.getCode(originalUrl);
            console.log(code)
            setShortCode(code)
            setIsModalOpen(true)
            form.resetFields();

        } catch (error: any) {
            setError(error.response.data)
        }
    };


    return (
        <div className={'wrapper'}>
            <div className={'shortener-wrapper'}>
                <h1>Welcome to Url Shortener!</h1>
                <Form form={form}>
                    <Form.Item label="Url" name="url">
                        <Input placeholder={"Put your longest link here!"}
                               required
                               onChange={(e) => setOriginalUrl(e.target.value)}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                            Shorten
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <Modal title="Your link is ready"
                   open={isModalOpen}
                   onOk={handleOk}
                   footer={[
                       <Button type="primary" key="ok" onClick={handleOk}>
                           Ok
                       </Button>,
                   ]}>
                <a href={BASE_URL+shortCode}>{BASE_URL+shortCode}</a>
            </Modal>
        </div>
    );
};

export default Shortener;