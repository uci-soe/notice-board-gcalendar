import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import isToday from 'date-fns/is_today';

import './StudentSchedule.css';
import StudentScheduleEvent from './StudentScheduleEvent';

const MINUTE = 1000 * 60;
const MS_IN_DAY = MINUTE * 60 * 24;

const propTypes = {
  range: PropTypes.number,
  timeMin: PropTypes.instanceOf(Date),
  timeMax: PropTypes.instanceOf(Date),
  children: PropTypes.any
};

const defaultProps = {
  range: 2,
  timeMin: getDate(-1),
  timeMax: getDate(5),
  updateTime: MINUTE * 10,
  apiKey: null,
  calendarID: null
};

function StudentSchedule(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let update;
    const updateFunc = () => {
      getEvents(props.timeMin, props.timeMax, props.calendarID, props.apiKey)
        .then(events => setEvents(events));

      update = setTimeout(() => {
        updateFunc();
      }, props.updateTime);
    };

    updateFunc();

    return () => {
      clearTimeout(update);
    }
  }, [props.timeMin, props.timeMax, props.updateTime, props.calendarID, props.apiKey]);

  const eventsToday = events.filter((e) => isToday(e.start.dateTime));
  const Event = props.children || StudentScheduleEvent;
  return (
    <div className='calendar-events'>
      {eventsToday.map((e, i) => Event(e, i))}
    </div>
  );
}

StudentSchedule.propTypes = propTypes;
StudentSchedule.defaultProps = defaultProps;

export default StudentSchedule;

//Utility functions
function getEvents(min, max, ID, KEY) {
  const URL = `https://www.googleapis.com/calendar/v3/calendars/${ID}/events`;
  return axios.get(URL, {
    params: {
      key: KEY,
      orderBy: 'startTime',
      timeMin: min.toISOString(),
      timeMax: max.toISOString(),
      singleEvents: true
    }
  })
    .then(resp => resp.data.items);
}

function getDate(days) {
  return new Date(Date.now() + (MS_IN_DAY * days));
}
