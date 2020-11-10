import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import Section from 'components/section/section';
import ContentBox from 'components/content-box/content-box';
import { login } from 'actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email_address: '',
        password: ''
    });
    const { email_address, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(email_address, password);
    };

    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    return (
        <Section name="login-form">
            <Container>
                <ContentBox header="Sign in to your account">
                    <Form method="post" onSubmit={e => onSubmit(e)}>
                        <FormGroup>
                            <Label for="email_address">Email</Label>
                            <Input type="email" name="email_address" id="email_address" placeholder="Enter your email address" value={email_address} onChange={e => onChange(e)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Enter your password" value={password} onChange={e => onChange(e)} />
                        </FormGroup>
                        <Button color="success">Login</Button>
                    </Form>
                </ContentBox>
            </Container>
        </Section>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { login }
)(Login);