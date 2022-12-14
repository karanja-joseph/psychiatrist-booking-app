import { Button, Col, Form, Input, Row, Typography } from "antd";
import React from "react";

const { Paragraph, Title } = Typography;

function PsychiatristDetailsForm({ onFinish }) {
  return (
    <Form layout="vertical" onFinish={onFinish}>
      <h1 className="card-title mt-3">All fields are required!</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="First Name"
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Last Name"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          {/* the specialization should have a dropdown of psychiatrist specialization*/}
          <Form.Item
            required
            label="Specialization"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input placeholder="Specialization" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Describe a testimonial"
            name="description"
            rules={[{ required: true }]}
          >
            <Input placeholder="Testimonial?" />
          </Form.Item>
        </Col>
      </Row>
      <Title level={5}>Specialization Of Psychiatrists</Title>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item>
            <Paragraph copyable>Child and adolescent psychiatrists</Paragraph>
            <Paragraph copyable>Geriatric psychiatrists</Paragraph>
            <Paragraph copyable>Addiction psychiatrists</Paragraph>
            <Paragraph copyable>Nurse practitioners</Paragraph>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item>
            <Paragraph copyable>Forensic psychiatrists</Paragraph>
            <Paragraph copyable>Organizational psychiatrist</Paragraph>
            <Paragraph copyable>Muli-specialty psychiatrists</Paragraph>
            <Paragraph copyable>Neuropsychiatrists</Paragraph>
          </Form.Item>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}

export default PsychiatristDetailsForm;
