import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
// var nodemailer = require("nodemailer");

function PsychiatristAppointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get(
        "/api/psychiatrist/get-appointments-by-psychiatrist-id",
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

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "/api/psychiatrist/change-appointment-status",
        { appointmentId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("Error changing psychiatrist account status");
      dispatch(hideLoading());
    }
  };

  // const emailThis = async (record) => {
  //   var emailMessage = `Hi ${record.userinfo.name},\n\nThank you for booking with us.\n\nYour time: ${record.slots} has been accepted!.`;
  //   var transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "josephkaranja033@gmail.com",
  //       pass: "kasukuyao",
  //     },
  //   });

  //   var mailOptions = {
  //     from: "josephkaranja033@gmail.com",
  //     to: record.userInfo.email,
  //     subject: "Appointment Booking",
  //     text: emailMessage,
  //   };

  //   transporter.sendMail(mailOptions, function (error, info) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log("Email sent: " + info.response);
  //     }
  //   });
  // };

  const columns = [
    {
      title: "Patient",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Condition",
      dataIndex: "desc",
      render: (text, record) => <span>{record.desc}</span>,
    },
    {
      title: "Time",
      dataIndex: "slots",
      render: (text, record) => <span>{record.slots}</span>,
    },
    {
      title: "Type",
      dataIndex: "meetup",
      render: (text, record) => <span>{record.meetup}</span>,
    },
    {
      title: "Date Booked",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>{moment(record.date).format("DD-MM-YYYY")} </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <h1
                className="anchor px-2"
                onClick={() => changeAppointmentStatus(record, "approved")}
              >
                Accept
              </h1>
              <h1
                className="anchor"
                onClick={() => changeAppointmentStatus(record, "rejected")}
              >
                Not Available
              </h1>
            </div>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAppointmentsData();
  }, []);
  return (
    <Layout>
      <h1 className="page-header">Appointments</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
}

export default PsychiatristAppointments;
