import React from "react";

const Status = (props) => {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">Loading Channels...</h1>
    </main>
  )
}
export default Status;