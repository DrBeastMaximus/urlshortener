import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Form } from 'antd';
import moment from 'moment';
import { UrlDataItem } from '../../api/UrlShortenerApi/types'
import './URLBoard.scss'
import {URLService} from "../../services/URLService";

const URLBoard = () => {
    const BASE_URL = "http://localhost:8080/url/s/";
    const [data, setData] = useState<UrlDataItem[]>([]);
    const [loading, setLoading] = useState(false);

    const URLShortenService = new URLService();

    const columns = [
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
            title: 'Original Link',
            dataIndex: 'originalUrl',
            key: 'originalUrl',
            render: (originalUrl: string) => (
                <span><a href={originalUrl}>{originalUrl}</a></span>
            ),
        },
        {
            title: 'Shorten Link',
            dataIndex: 'shortCode',
            key: 'shortCode',
            render: (shortCode: string) => (
                <span><a href={BASE_URL+shortCode}>{BASE_URL+shortCode}</a></span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: UrlDataItem) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                    <Button>Delete</Button>
                </Popconfirm>
            ),
        },
    ];

    useEffect(() => {
        setLoading(true);
        URLShortenService.getAllLinks()
            .then(response => {
                setData(response);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (key: string) => {
        URLShortenService.removeLink(key);
        const newData = data.filter(item => item.id !== key);
        setData(newData);
    };

    return (
        <div className={"wrapper"}>
            <div className={"table-wrapper"}>
                <Table
                    dataSource={data}
                    columns={columns}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </div>
    );
};

export default URLBoard;