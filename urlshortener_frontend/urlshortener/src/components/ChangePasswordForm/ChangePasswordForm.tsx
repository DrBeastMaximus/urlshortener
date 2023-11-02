import React, { useState } from 'react';
import {Alert, Button, Form, Input} from 'antd';
import './ChangePasswordForm.scss'
import {AuthService} from "../../services/AuthService";

const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [ error, setError ] = useState();
    const [visible, setVisible] = useState(false);
    const authService= new AuthService();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            await authService.changePass(oldPassword, newPassword, confirmPassword);
            window.location.href = '/';
        } catch (error: any) {
            setError(error.response.data)
            setVisible(true)
        }
    };

    return(
        <div className={"wrapper"}>
            <div className={"reg-wrapper"}>
                <div className={"reg-container"}>
                    <h2>Change Your Password</h2>
                    <Form onSubmitCapture={handleSubmit}>
                        <Form.Item label="Old Password">
                            <Input.Password
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                        </Form.Item>
                        <Form.Item label="New Password">
                            <Input.Password
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </Form.Item>
                        <Form.Item label="Confirm New Password">
                            <Input.Password
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Item>
                        <Form.Item className={"button-group"}>
                            <Button className={"button"} type="primary" htmlType="submit">
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                {visible && <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    closable={true}
                    onClose={() => setVisible(false)}
                    className={"alert"}
                />}
            </div>
        </div>
    );
}

export default ChangePasswordForm;