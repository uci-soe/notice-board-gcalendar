import React from 'react';
import {format} from "date-fns";
import isToday from "date-fns/is_today";
import isTomorrow from "date-fns/is_tomorrow";
import isMonday from "date-fns/is_monday";
import isTuesday from "date-fns/is_tuesday";
import isWednesday from "date-fns/is_wednesday";
import isThursday from "date-fns/is_thursday";
import isFriday from "date-fns/is_friday";
import isSaturday from "date-fns/is_saturday";
import isSunday from "date-fns/is_sunday";

function formatDescription (desc) {
  if (desc) {
    const clean = desc
      .replace(/<[^>]*>?/gm, '')
      .replace(/[^a-z\d:.,?!@&\s\n]+/ig, '')
      .split(/\n/g)
      .map(s => s.trim())
      .filter(s => !!s);
    return clean[0];
  }
  else {return '';}
}

function displayTime(startTime, endTime) {
  return startTime ? `${format(startTime, "h:mm")} - ${format(endTime, "h:mm")}` : `All Day`;
}

function displayHRDate(dateTime, date) {
  return dateTime ? format(dateTime, "MMMM DD") : format(date, "MMMM DD")
}

function displayDayOfWeek(date) {
  if (isMonday(date)) {return 'Monday';}
  else if (isTuesday(date)) {return 'Tuesday';}
  else if (isWednesday(date)) {return 'Wednesday';}
  else if (isThursday(date)) {return 'Thursday';}
  else if (isFriday(date)) {return 'Friday';}
  else if (isSaturday(date)) {return 'Saturday';}
  else if (isSunday(date)) {return 'Sunday';}
}

function displayTodayTomorrow(dateTime, date) {
  const test = dateTime || date;
  if (isToday(test)) {
    return 'Today';
  }
  else if (isTomorrow(test)) {
    return 'Tomorrow';
  }
  else {
    return displayDayOfWeek(test);
  }
}

export default function(e, i) {
  return (
    <div className={`event ${i+1}`} key={i}>
      <div className="d-flex justify-content-between">
        <div>
          {displayTime(e.start.dateTime, e.end.dateTime)}
        </div>

        <div>
          {displayTodayTomorrow(e.start.dateTime, e.start.date)}
        </div>
      </div>

      <div className="d-flex l-indent">
        <div className='summary'>
          {e.summary}
          {e.description && `: ${formatDescription(e.description)}`}
        </div>
      </div>

      <div className='d-flex justify-content-between l-indent'>
        <div>
          {e.location ? e.location : `Location not set.`}
        </div>

        <div>
          {displayHRDate(e.start.dateTime, e.start.date)}
        </div>
      </div>
    </div>
  );
}