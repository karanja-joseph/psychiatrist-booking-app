import React from "react";
import { useNavigate } from "react-router-dom";

function Psychiatrist({ psychiatrist }) {
  const navigate = useNavigate();
  return (
    <>
        <div
            className="card p-2 cursor-pointer"
            onClick={() => navigate(`/book-appointment/${psychiatrist._id}`)}
          >
            <h1 className="card-title">
              {psychiatrist.firstName} {psychiatrist.lastName}
            </h1>
            <hr />
            <p>
              <b>Phone Number : </b>
              {psychiatrist.phoneNumber}
            </p>
            <p>
              <b>Address : </b>
              {psychiatrist.address}
            </p>
            <p>
              <b>Specialization : </b>
              {psychiatrist.specialization}
            </p>
            <p>
              <b>Description : </b>
              {psychiatrist.description}
            </p>
          </div>      
      </>
  );
}

export default Psychiatrist;
