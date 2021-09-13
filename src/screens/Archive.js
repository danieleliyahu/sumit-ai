import React from "react";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
const Archive = (props) => {
  let history = useHistory();

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
  const minutesToHour = (a) => {
    var hours = Math.trunc(a / 60);
    var minutes = Math.floor(a % 60);
    return hours + ":" + minutes;
  };
  let data = props.meetings.map((meeting) => {
    return {
      name: meeting.name,
      meetingLength: minutesToHour(meeting.meetingLength),
      date: props.formatDate(meeting.date),
      price: meeting.price,
      participants: meeting.participants.length,
    };
  });
  console.log(data);
  console.log(props.columns);

  return (
    <div>
      {props.user ? (
        <div className={"materialTableDiv"}>
          <MaterialTable
            columns={columns}
            data={props.approvedMeeting}
            title="Demo Title"
            options={{
              paging: true,
              pageSize: 10, // make initial page size
              emptyRowsWhenPaging: true, //to make page size fix in case of less data rows
              pageSizeOptions: [6, 12, 20, 50], // rows selection options
            }}
            actions={[
              {
                icon: "closeIcon",
                tooltip: "delete",
                onClick: (event, rowData) => {
                  let results = props.approvedMeeting.filter(function (
                    meeting
                  ) {
                    return rowData.name !== meeting.name;
                  });
                  props.user.totalPayment -= rowData.price;
                  props.user.totalMeetingsComplate -= 1;
                  props.setUser(props.user);
                  props.setMeetings([...props.meetings, rowData]);

                  props.setApprovedMeeting(results);
                },
              },
            ]}
          />
        </div>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default Archive;
