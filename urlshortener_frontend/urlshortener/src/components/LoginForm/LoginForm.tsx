import React, {useState} from 'react';
import {Alert, Button, Form, Input} from "antd";
import './LoginForm.scss'
import { AuthService } from '../../services/AuthService'

interface Props{
    isRegister: () => void;
}

const LoginForm = (props: Props) => {
    const [ error, setError ] = useState();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const authService= new AuthService();

    const handleSubmit = async () => {
        try {
            await authService.login(username, password);
            window.location.href = '/';
        } catch (error: any) {
            setError(error.response.data)
            setVisible(true)
        }
    };


    return (
        <div className={"wrapper"}>
            <div className={"login-container"}>
                <h2>Login</h2>
                <Form onSubmitCapture={handleSubmit}>
                    <Form.Item label="Username">
                        <Input
                            placeholder={"Username"}
                            required
                            onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input.Password
                            placeholder={"Password"}
                            required
                            onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Item>
                    <Form.Item className={"button-group"}>
                        <Button className={"button"} htmlType="submit" type={"primary"}>
                            Login
                        </Button>
                        <Button className={"button"} type={"primary"} onClick={props.isRegister}>
                            Register
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


export default LoginForm;