import React, { useState, useContext, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import Section from 'components/section/section';
import ContentBox from 'components/content-box/content-box';
import AuthContext from 'context/auth/auth.context';
import AlertContext from 'context/alert/alert.context';

export const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext; 
    
    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email_address: '',
        password: ''
    });

    const { email_address, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (email_address === '' || password === '') {
            setAlert('Please fill in all fields', 'danger');
        } else {
            login({
                email_address,
                password
            });
        }
    };

    return (
        <Section name="login-form">
            <Container>
                <ContentBox header="Sign in to your account">
                    <Form method="post" onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="email_address">Email</Label>
                            <Input type="email" name="email_address" id="email_address" placeholder="Enter your email address" value={email_address} onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Enter your password" value={password} onChange={onChange} />
                        </FormGroup>
                        <Button color="success">Login</Button>
                    </Form>
                </ContentBox>
            </Container>
        </Section>
    )
}