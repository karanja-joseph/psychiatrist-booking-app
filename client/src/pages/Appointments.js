import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get(
        "/api/user/get-appointments-by-user-id",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  const columns = [
    {
      title: "Psychiatrist",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.psychiatristInfo.firstName} {record.psychiatristInfo.lastName}
        </span>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text, record) => <span>{record.psychiatristInfo.address}</span>,
    },
    {
      title: "Date Booked",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>{moment(record.date).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Ticket",
      dataIndex: "status",
    },
  ];
  useEffect(() => {
    getAppointmentsData();
  }, []);
  return (
    <Layout>
      <h1 className="page-title">Appointments</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
}

export default Appointments;
