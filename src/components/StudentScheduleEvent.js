import {format} from "date-fns";
import React from 'react';

function displayTime(startTime, endTime) {
  return startTime ? `${format(startTime, "h:mm")} - ${format(endTime, "h:mm")}` : `All Day`;
}

export default function (e, i) {
  return (
    <div className={`student-event ${i + 1}`} key={i}>
      <div className='student-name'>
        {e.summary}
      </div>

      <div className="time">
        {displayTime(e.start.dateTime, e.end.dateTime)}
      </div>
    </div>
  );
}