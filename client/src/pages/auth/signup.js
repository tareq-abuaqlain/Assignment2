import { Button, Form, Input, Select } from 'antd';
import React from 'react';
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
const App = () => {
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
    const onFinish = (values) => {
        console.log(values);
    };
    const onReset = () => {
        formRef.current?.resetFields();
    };
    const onFill = () => {
        formRef.current?.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };
    return (
        <Form
            {...layout}
            ref={formRef}
            name="control-ref"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
        >
            <Form.Item
                name="fName"
                label="First Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input
                    placeholder="At least 8 char and have one of (number, special char, upper case)"
                />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="birthday"
                label="Birthday"
                rules={[
                    {
                        required: false,
                    },
                ]}
            >
                <Input
                    placeholder="Birthday must be at this pattern: YYYY-MM-DD"
                />
            </Form.Item>
            <Form.Item
                name="gender"
                label="Gender"
                rules={[
                    {
                        required: false,
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
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {({ getFieldValue }) =>
                    getFieldValue('gender') === 'other' ? (
                        <Form.Item
                            name="customizeGender"
                            label="Customize Gender"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    ) : null
                }
            </Form.Item>
            <Form.Item
                name="address"
                label="Address"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            {/* {let require = false;
            if (email.includes('@company.com')) {
                require = true;
                } */}
                
            <Form.Item
                name="company"
                label="Company Name"
                rules={[
                    {
                        required: false,
                    },
                ]}
            >
                <Input
                    placeholder='Just for business account'
                />
            </Form.Item>


            <Form.Item {...tailLayout}>






                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
                <Button type="link" htmlType="button" onClick={onFill}>
                    Fill form
                </Button>
            </Form.Item>
        </Form>
    );
};
export default App;