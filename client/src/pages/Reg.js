import React from 'react';
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


function Reg() {

    const onFinish = async (values) => {
        console.log("values", values);
        try {
            const response = await axios.post("http://localhost:5000/api/patient/register", values);
            if (response.data.success) {
                toast.success(response.data.message);
                // navigate("/login");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (
        <div className="authentication">
            <div className="authentication-form card p-3">
                <h1 className="card-title">Nice To Meet U</h1>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Name" name="name">
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input placeholder="Password" type="password" />
                    </Form.Item>

                    <Button
                        className="primary-button my-2 full-width-button"
                        htmlType="submit"
                    >
                        REGISTER
                    </Button>

                    <Link to="/login" className="anchor mt-2">
                        CLICK HERE TO LOGIN
                    </Link>
                </Form>
            </div>
        </div>
    )
}

export default Reg