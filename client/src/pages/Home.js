import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Psychiatrist from '../components/Psychiatrist';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function Home() {

    const [psychiatrists, setPsychiatrists] = useState([]);
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.get('/api/user/get-all-approved-psychiatrists', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                setPsychiatrists(res.data.data);
            }
            console.log(res.data);
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <Layout>
            <Row gutter={20}>
                {psychiatrists.map((psychiatrist) => (
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Psychiatrist psychiatrist = {psychiatrist} />
                    </Col>
                ))}
            </Row>
        </Layout>
    )
}

export default Home