import React, { useState } from 'react';
import {Alert, Button, Form, Input} from 'antd';
import './RegisterForm.scss'
import {AuthService} from "../../services/AuthService";

interface Props{
    isRegister: () => void;
}

const RegisterForm = (props: Props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [ error, setError ] = useState();
    const [visible, setVisible] = useState(false);
    const authService= new AuthService();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const a = await authService.register(username, password, email);
            window.location.href = '/';
        } catch (error: any) {
            setError(error.response.data)
            setVisible(true)
        }
    };

    return(
        <div className={"wrapper"}>
            <div className={"reg-container"}>
                <h2>Register</h2>
                <Form onSubmitCapture={handleSubmit}>
                    <Form.Item label="Username">
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input.Password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Item>
                    <Form.Item label="Confirm Password">
                        <Input.Password
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Item>
                    <Form.Item className={"button-group"}>
                        <Button className={"button"} type="primary" htmlType="submit">
                            Register
                        </Button>
                        <Button className={"button"} type="primary" onClick={props.isRegister}>
                            Back To Login
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
    );
}

export default RegisterForm;