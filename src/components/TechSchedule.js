import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {setDays, getEvents, getDate, MINUTE} from './lib/utils';

import './TechSchedule.css';
import TechScheduleEvent from './TechScheduleEvent';

const propTypes = {
  range: PropTypes.number,
  timeMin: PropTypes.instanceOf(Date),
  timeMax: PropTypes.instanceOf(Date),
  children: PropTypes.any
};

const defaultProps = {
  range: 2,
  timeMin: getDate(-1),
  timeMax: getDate(14),
  updateTime: MINUTE * 10,
  apiKey: null,
  calendarID: null
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

  const eventsTodayAndTmr = setDays(events, props.range);
  const Event = props.children || TechScheduleEvent;
  return (
      <div className='calendar-events'>
        {eventsTodayAndTmr.map((e, i) => Event(e, i))}
      </div>
  );
}

TechSchedule.propTypes = propTypes;
TechSchedule.defaultProps = defaultProps;

export default TechSchedule;