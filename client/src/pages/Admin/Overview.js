import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { Col, Row } from "antd";
import Psychiatrist from '../../components/Psychiatrist';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";

function Overview() {

    const [psychiatrists, setPsychiatrists] = useState([]);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const getPsychiatrists = async () => {
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
                console.log(res.data.data);
            }
            console.log(res.data);
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }
    const getPatients = async () => {
        try {
          dispatch(showLoading());
          const resp = await axios.get("/api/admin/get-all-users", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          dispatch(hideLoading());
          if (resp.data.success) {
            setUsers(resp.data.data);
          }
        } catch (error) {
          dispatch(hideLoading());
        }
      };

    useEffect(() => {
        getPsychiatrists()
        getPatients()
    }, [])
    return (
        <Layout>
            <h1>Overview Page</h1>
            <h4>Number of psychiatrists Registered</h4>
            <div>
            {/* {user?.unseenNotifications.length} */}
            {/* {{psychiatrists.length}} */}
            </div>
        
        </Layout>
    )
}

export default Overview