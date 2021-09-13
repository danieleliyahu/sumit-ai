import React from "react";
import { useHistory } from "react-router-dom";

const Profile = (props) => {
  return (
    <div>
      {props.user ? (
        <div className=" profile ">
          <h1>{props.user.name}</h1>
          <p>{props.user.phone}</p>
          <p>{props.user.email}</p>
          <p>Total Meetings Completed - {props.user.totalMeetingsComplate}</p>
          <p>Total Payment - {props.user.totalPayment}</p>
        </div>
      ) : (
        <>
          <h2 className="signinTitle">Sign In</h2>
          <div className="formDiv audioDiv">
            <form onSubmit={props.logIn}>
              <input name="name" type="text"></input>
              <label>Name</label>
              <input name="phone" type="number"></input>
              <label>Phone number</label>

              <input name="email" type="email"></input>
              <label>Email</label>

              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
