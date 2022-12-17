import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Select,
  Row,
  Anchor,
} from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PsychiatristDetailsForm from "../components/PsychiatristDetailsForm";
import moment from "moment";

function BookAppointment() {
  // const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [desc, setDesc] = useState("");
  const [slots, setSlots] = useState();
  const [meetup, setMeetup] = useState();
  const { user } = useSelector((state) => state.user);
  const [psychiatrist, setPsychiatrist] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const getPsychiatristData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/psychiatrist/get-psychiatrist-info-by-id",
        {
          psychiatristId: params.psychiatristId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setPsychiatrist(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  // const checkAvailability = async () => {
  //   try {
  //       dispatch(showLoading());
  //       const response = await axios.post(
  //         "/api/user/check-booking-avilability",
  //         {
  //           psychiatristId: params.psychiatristId,
  //           date: date,
  //           time: time,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       dispatch(hideLoading());
  //       if (response.data.success) {
  //         toast.success(response.data.message);
  //         setIsAvailable(true);
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //   } catch (error) {
  //     toast.error("Error booking appointment");
  //     dispatch(hideLoading());
  //   }
  // };
  // const bookNow = async () => {
  // setIsAvailable(false);
  // if(psychiatrist.timings[0] >= time && psychiatrist.timings[0] <= time){

  // }
  // else{

  // }

  // };

  const onFinish = async (values) => {
    console.log("values", values);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          psychiatristId: params.psychiatristId,
          userId: user._id,
          psychiatristInfo: psychiatrist,
          userInfo: user,
          date: date,
          desc: desc,
          slots: slots,
          meetup: meetup,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments");
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  const { TextArea } = Input;

  useEffect(() => {
    getPsychiatristData();
  }, []);
  return (
    <Layout>
      {psychiatrist && (
        <div>
          <h1 className="page-title">
            Dr. {psychiatrist.firstName} {psychiatrist.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://sophrmakeup.co.uk/wp-content/uploads/2020/01/Book-Now-1.png"
                alt=""
                width="100%"
                height="400"
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Working Hours :</b> 8am to 5pm
              </h1>
              <p>
                <b>Phone Number : </b>
                {psychiatrist.phoneNumber}
              </p>
              <p>
                <b>Address : </b>
                {psychiatrist.address}
              </p>
              <p>
                <b>Fee Per 2hrs : </b>
                {psychiatrist.feePerCunsultation}
              </p>
              <p>
                <b>Field Of Operation : </b>
                {psychiatrist.specialization}
              </p>
              <div className="d-flex flex-column pt-2 mt-2">
                <Form onFinish={onFinish}>
                  <Form.Item name="date">
                    <DatePicker
                      format="DD-MM-YYYY"
                      onChange={(value) => {
                        setDate(moment(value).format("DD-MM-YYYY"));
                      }}
                    />
                  </Form.Item>

                  <br />
                  <Form.Item name="desc">
                    <Input.TextArea
                      rows={4}
                      placeholder="Describe your condition"
                      onChange={(event) => setDesc(event.target.value)}
                    />
                  </Form.Item>
                  <br />
                  <Form.Item name="slots">
                    <Select
                      value={desc}
                      onChange={(value) => {
                        setSlots(value);
                      }}
                      placeholder="Book a slot"
                      style={{ width: 340 }}
                    >
                      <Select.Option value="8am - 10am">
                        8am - 10am
                      </Select.Option>
                      <Select.Option value="10am - 12pm">
                        10am - 12pm
                      </Select.Option>
                      <Select.Option value="1pm - 3pm">1pm - 3pm</Select.Option>
                      <Select.Option value="3pm - 5pm">3am - 5pm</Select.Option>
                      <Select.Option value="4" disabled={true}>
                        No Slots after 5pm
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <br />
                  <Form.Item name="meetup">
                    <Select
                      onChange={(value) => {
                        setMeetup(value);
                      }}
                      placeholder="Preference of Meet"
                      style={{ width: 340 }}
                    >
                      <Select.Option value="Meet Physically">
                        Physical Meetup
                      </Select.Option>
                      <Select.Option value="Meet Online">
                        Online Meetup
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  {/* {!isAvailable &&   <Button
                        className="primary-button mt-3 full-width-button"
                        onClick={checkAvailability}
                      >
                        Check Availability
                      </Button>} */}

                  {/* {isAvailable && (
                      <Button
                        className="primary-button mt-3 full-width-button"
                        onClick={bookNow}
                      >
                        Book Now
                      </Button>
                    )} */}
                  <Form.Item>
                    <Button
                      className="primary-button mt-3 full-width-button"
                      htmlType="submit"
                    >
                      Book Now
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <br />
              <div>
                You can also register as a psychiatrist{" "}
                <a
                  style={{ color: "#005555", fontSize: 16 }}
                  href="http://localhost:3000/apply-psychiatrist"
                >
                  here
                </a>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
