import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PsychiatristDetailsForm from "../../components/PsychiatristDetailsForm";
import moment from "moment";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [psychiatrist, setPsychiatrist] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => { 
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/psychiatrist/update-psychiatrist-profile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
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
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const getPsychiatristData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/psychiatrist/get-psychiatrist-info-by-user-id",
        {
          userId: params.userId,
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

  useEffect(() => {
    getPsychiatristData();
  }, []);
  return (
    <Layout>
      <h1 className="page-title">Psychiatrist Profile</h1>
      <hr />
      {psychiatrist && <PsychiatristDetailsForm onFinish={onFinish} initialValues={psychiatrist} />}
    </Layout>
  );
}

export default Profile;
