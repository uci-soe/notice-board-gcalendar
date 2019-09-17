import {format, isTomorrow, withinRange, addMinutes, subMinutes} from "./lib/utils.js";
import React from 'react';

function displayTime(startTime, endTime) {
  return startTime ? `${format(startTime, "h:mm")} - ${format(endTime, "h:mm")}` : `All Day`;
}

export default function (e, i) {
  const now = new Date(Date.now());
  const startShift = e.start.dateTime;
  const endShift = e.end.dateTime;
  const preShift = subMinutes(startShift, 15);
  const postShift = addMinutes(endShift, 15);
  let context = '';

  if (withinRange(now, preShift, startShift)) {
    context = 'in-soon';
  } else if (withinRange(now, startShift, endShift)) {
    context = 'in-now';
  } else if (withinRange(now, endShift, postShift)) {
    context = 'just-left';
  } else if (isTomorrow(startShift)) {
    context = 'in-tmr';
  } else if (now > postShift) {
    context = 'gone';
  } else {
    context = 'none';
  }

  return (
    <div className={`student-event ${context} ${i + 1}`} key={i}>
      <div className='student-name'>
        {e.summary}
      </div>

      <div className="time">
        {displayTime(e.start.dateTime, e.end.dateTime)}
      </div>
    </div>
  );
}