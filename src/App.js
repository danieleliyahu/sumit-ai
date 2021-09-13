import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import meeting from "./meetings.json";
import Meeting from "./components/Meeting";
import User from "./components/User";
import Profile from "./screens/Profile";
import Archive from "./screens/Archive";
function App() {
  const [meetings, setMeetings] = useState([]);
  const [user, setUser] = useState();
  const [approvedMeeting, setApprovedMeeting] = useState([]);
  useEffect(async () => {
    setMeetings(meeting);
  }, []);
  const formatDate = (date) => {
    var myDate = new Date(1000 * date);
    myDate = "0" + myDate.toLocaleDateString();
    return myDate;
  };
  const logIn = async (e) => {
    if (!e.target.email.value || !e.target.name.value || !e.target.phone.value)
      return;
    e.preventDefault();
    let userLogInfo = {
      email: e.target.email.value,
      name: e.target.name.value,
      phone: e.target.phone.value,
      id: "s3153",
      totalMeetingsComplate: 0,
      totalPayment: 0,
    };
    setUser(userLogInfo);
  };
  return (
    <div className="App">
      <Router>
        <div>
          <nav className={"navBar"}>
            <ul className={"navBarUl"}>
              <li>
                <Link to="/">Profile</Link>
              </li>
              <li>
                <Link to="/archive">Archive</Link>
              </li>
              <li>
                <Link to="/meetings">Meetings</Link>
              </li>
            </ul>
          </nav>

          <Route path="/archive" exact>
            <Meeting
              formatDate={formatDate}
              meetings={meetings}
              user={user}
              setUser={setUser}
              approvedMeeting={approvedMeeting}
              logIn={logIn}
              setMeetings={setMeetings}
              setApprovedMeeting={setApprovedMeeting}></Meeting>
          </Route>
          <Route path="/meetings" exact>
            <Archive
              formatDate={formatDate}
              meetings={meetings}
              user={user}
              setUser={setUser}
              approvedMeeting={approvedMeeting}
              logIn={logIn}
              setMeetings={setMeetings}
              setApprovedMeeting={setApprovedMeeting}></Archive>
          </Route>
          <Route path="/" exact>
            <Profile user={user} logIn={logIn}></Profile>
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
