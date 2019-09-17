import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {setDays, getEvents, getDate, MINUTE} from './lib/utils';

import './TechSchedule.css';
import TechScheduleEvent from './TechScheduleEvent';
import CalendarNoEvent from './CalendarNoEvent';

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
  timeMin: getDate(0),
  timeMax: getDate(14),
  updateTime: MINUTE * 10,
  apiKey: null,
  calendarID: null,
  noEvent: null
};

function TechSchedule(props) {
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

  const Event = props.children || TechScheduleEvent;
  const noEvent = props.noEvent || CalendarNoEvent;

  let eventsTodayAndTmr = setDays(events, props.range);
  if (props.limit >= 0) {
    eventsTodayAndTmr = eventsTodayAndTmr.slice(0, props.limit);
  }

  return (
      <div className='calendar-events'>
        {eventsTodayAndTmr.length ? eventsTodayAndTmr.map((e, i) => Event(e, i)) : noEvent()}
      </div>
  );
}

TechSchedule.propTypes = propTypes;
TechSchedule.defaultProps = defaultProps;

export default TechSchedule;