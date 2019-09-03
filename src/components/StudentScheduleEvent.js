import {format} from "date-fns";
import React from 'react';

function displayTime(startTime, endTime) {
  return startTime ? `${format(startTime, "h:mm")} - ${format(endTime, "h:mm")}` : `All Day`;
}

export default function(e, i) {
  return (
    <div className={`event ${i+1}`} key={i}>
      <div className="d-flex">
        <div>
          {e.summary}
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <div>
          {displayTime(e.start.dateTime, e.end.dateTime)}
        </div>
      </div>
    </div>
  );
}