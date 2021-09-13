import React from "react";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";

function Meeting(props) {
  let history = useHistory();
  const minutesToHour = (a) => {
    var hours = Math.trunc(a / 60);
    var minutes = Math.floor(a % 60);
    return hours + ":" + minutes;
  };

  let columns = [
    { title: "name", field: "name" },
    { title: "Meeting length", field: "meetingLength" },
    { title: "date", field: "date", type: "date" },
    {
      title: "price",
      field: "price",
    },
    {
      title: "participants",
      field: "participants",
    },
  ];

  let data = props.meetings.map((meeting) => {
    return {
      name: meeting.name,
      meetingLength: minutesToHour(meeting.meetingLength),
      date: props.formatDate(meeting.date),
      price: meeting.price,
      participants: meeting.participants.length,
    };
  });

  return (
    <div>
      {props.user ? (
        <div className={"materialTableDiv"}>
          <MaterialTable
            options={{
              paging: true,
              pageSize: 10, // make initial page size
              emptyRowsWhenPaging: true, //to make page size fix in case of less data rows
              pageSizeOptions: [6, 12, 20, 50], // rows selection options
            }}
            columns={columns}
            data={data}
            title="Demo Title"
            actions={[
              {
                icon: "checkIcon",
                tooltip: "approve",
                onClick: (event, rowData) => {
                  let results = props.meetings.filter(function (meeting) {
                    return rowData.name !== meeting.name;
                  });
                  rowData.data = "0" + new Date().toLocaleDateString();
                  props.user.totalPayment += rowData.price;
                  props.user.totalMeetingsComplate += 1;
                  props.setUser(props.user);
                  props.setApprovedMeeting([...props.approvedMeeting, rowData]);
                  props.setMeetings(results);
                },
              },
              {
                icon: "deleteIcon",
                tooltip: "delete",
                onClick: (event, rowData) => {
                  let results = props.meetings.filter(function (meeting) {
                    return rowData.name !== meeting.name;
                  });
                  props.setMeetings(results);
                },
              },
            ]}
          />
          <div></div>
        </div>
      ) : (
        history.push("/")
      )}
    </div>
  );
}

export default Meeting;
