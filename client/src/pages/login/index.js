import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Alert, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

import Section from 'components/section/section';
import ContentBox from 'components/content-box/content-box';
import UserContext from 'contexts/user';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = {
                email_address: email,
                password: password
            };
            const login = await axios.post('/api/auth/login', data);
            setUserData({
                token: login.data.token,
                user: login.data.user,
            });
            localStorage.setItem('auth-token', login.data.token);
            history.push('/');
        } catch (error) {
            setError(error.response.data.msg);
        }
    }
    return (
        <Section name="login-form">
            <Container>
                <ContentBox header="Sign in to your account">
                    {error && (
                        <Alert color="danger">{error}</Alert>
                    )}
                    <Form method="post" onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                        </FormGroup>
                        <Button color="success">Login</Button>
                    </Form>
                </ContentBox>
            </Container>
        </Section>
    )
}