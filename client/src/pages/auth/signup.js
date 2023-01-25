import { Typography, Button, Form, Input, message, Select } from 'antd';
import React from 'react';
import axios from 'axios';
import { FirstNameBusinessSchema, LastNameBusinessSchema } from '../../validation/index.js';
import Layout, { Header } from 'antd/es/layout/layout.js';
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const { Title } = Typography;

const App = () => {
    const [role, setRole] = React.useState('Individual');
    const formRef = React.useRef(null);
    const onGenderChange = (value) => {
        switch (value) {
            case 'male':
                formRef.current?.setFieldsValue({
                    note: 'Hi, man!',
                });
                break;
            case 'female':
                formRef.current?.setFieldsValue({
                    note: 'Hi, lady!',
                });
                break;
            case 'other':
                formRef.current?.setFieldsValue({
                    note: 'Hi there!',
                });
                break;
            default:
                break;
        }
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        if (email.includes('@gmail.com')) {
            setRole('Individual');
        } else if (email.includes('@company.com')) {
            setRole('Business');
        };
    }
    const onChangeBirthday = (value) => {
        const theBirthday = value;
        const birthDate = new Date(theBirthday);
        const year = birthDate.getFullYear();
        const dateNow = new Date().getUTCFullYear();
        const eighteenYearsAgo = dateNow - 18;
        if (year > eighteenYearsAgo) {
            return false;
        }
        return true;
    }

    const onFinish = async (values) => {
        try {
            const res = await axios.post('/api/v1/signup', values);
            if (res.status === 200) {
                message.success('Sign up successfully');
            }
        } catch (error) {
            message.error(error.response.data.message);
        }
    };
    const onReset = () => {
        formRef.current?.resetFields();
    };
    return (
        <Layout>
            <Header>
                <Title level={2} style={{ color: '#fff', display: 'flex', marginTop: '13px', justifyContent: 'center' }}>Sign Up</Title>
            </Header>

            <Form
                {...layout}
                ref={formRef}
                name="control-ref"
                onFinish={onFinish}
                style={{
                    maxWidth: '1200px',
                    marginTop: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Layout>
                    <Form.Item
                        name="email"
                        label="Email"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                whitespace: true,
                                message: 'Please input a valid email address',
                            },
                        ]}
                    >
                        <Input onChange={onChangeEmail} />
                    </Form.Item>
                    <Form.Item
                        name="first_name"
                        label="First Name"
                        hasFeedback
                        rules={role === 'Business' ? FirstNameBusinessSchema :
                            [{
                                required: true,
                                type: 'string',
                                whitespace: true,
                                message: 'Please input a valid First name',
                            }
                            ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="last_name"
                        label="Last Name"
                        hasFeedback
                        rules={role === 'Business' ? LastNameBusinessSchema :
                            [{
                                required: true,
                                type: 'string',
                                whitespace: true,
                                message: 'Please input a valid First name',
                            }
                            ]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        name="password"
                        label="Password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                type: 'string',
                                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                message: 'At least 8 char and have one of (number, special char, upper case)',
                                whitespace: true
                            },
                        ]}
                    >
                        <Input
                            placeholder="At least 8 char and have one of (number, special char, upper case)"
                            type='password'
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm_password"
                        label="Confirm Password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input
                            type='password'
                        />
                    </Form.Item>
                </Layout>
                <Layout>

                    <Form.Item
                        name="phone_number"
                        label="Phone Number"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please input a valid Phone number',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="birthday"
                        label="Birthday"
                        hasFeedback
                        rules={
                            [
                                {
                                    message: 'Please input a valid Birthday',
                                }, () => ({
                                    validator(_, value) {
                                        const isValid = onChangeBirthday(value);
                                        if (!value || isValid) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('You must be 18 years old to register'));
                                    },
                                })]
                        }

                    >
                        <Input
                            type='date'
                            placeholder="Birthday must be at this pattern: YYYY-MM-DD"
                        />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                        hasFeedback
                        rules={[
                            {
                                required: false,
                                whitespace: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Address"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please input a valid Address',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    {
                        role === 'Business' && <Form.Item
                            name="company_name"
                            label="Company Name"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input a valid Company Name',
                                },
                            ]}
                        >
                            <Input
                                placeholder='Just for business account'
                            />
                        </Form.Item>
                    }
                    <Form.Item
                        {...tailLayout}>
                        <Layout
                            style={{
                                marginTop: '10px',
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <Button type="primary" htmlType="submit" style={{ marginRight: '15px' }}>
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Layout>
                    </Form.Item>
                </Layout>

            </Form >
        </Layout>

    );
};
export default App;