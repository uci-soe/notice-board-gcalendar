import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import './StudentSchedule.css';
import StudentScheduleEvent from './StudentScheduleEvent';
import {getDate, getEvents, isTodayTomorrow, MINUTE} from './lib/utils';

const propTypes = {
  range: PropTypes.number,
  timeMin: PropTypes.instanceOf(Date),
  timeMax: PropTypes.instanceOf(Date),
  children: PropTypes.any
};

const defaultProps = {
  range: 2,
  timeMin: getDate(-1),
  timeMax: getDate(1),
  updateTime: MINUTE * 10,
  apiKey: null,
  calendarID: null,
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

  const eventsToday = events.filter((e) => isTodayTomorrow(e.start.dateTime));
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