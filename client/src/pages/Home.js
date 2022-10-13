import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Home() {

    const getData = async () => {
        try {
            const res = await axios.post('/api/patient/get-patient-info', {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <Layout>
            <h2>Home</h2>
        </Layout>
    )
}

export default Home