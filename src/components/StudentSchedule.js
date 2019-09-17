import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import './StudentSchedule.css';
import './CalendarNoEvent.css';
import StudentScheduleEvent from './StudentScheduleEvent';
import CalendarNoEvent from './CalendarNoEvent';
import {getDate, getEvents, isTodayTomorrow, MINUTE} from './lib/utils';

const propTypes = {
  range: PropTypes.number,
  limit: PropTypes.number,
  timeMin: PropTypes.instanceOf(Date),
  timeMax: PropTypes.instanceOf(Date),
  children: PropTypes.any,
  noEvent: PropTypes.any
};

const defaultProps = {
  range: 2,
  limit: -1,
  timeMin: getDate(-1),
  timeMax: getDate(1),
  updateTime: MINUTE * 10,
  apiKey: null,
  calendarID: null,
  noEvent: null
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

  const Event = props.children || StudentScheduleEvent;
  const noEvent = props.noEvent || CalendarNoEvent;

  let eventsToday = events.filter((e) => isTodayTomorrow(e.start.dateTime));
  if (props.limit >= 0) {
    eventsToday = eventsToday.slice(0, props.limit);
  }

  return (
    <div className='calendar-events'>
      {eventsToday.length ? eventsToday.map((e, i) => Event(e, i)) : noEvent(true)}
    </div>
  );
}

StudentSchedule.propTypes = propTypes;
StudentSchedule.defaultProps = defaultProps;

export default StudentSchedule;