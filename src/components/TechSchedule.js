import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import isToday from 'date-fns/is_today';
import isTomorrow from 'date-fns/is_tomorrow';
import withinRange from 'date-fns/is_within_range';
import startOfToday from 'date-fns/start_of_today';
import addDays from 'date-fns/add_days';
import parse from 'date-fns/parse';

import './TechSchedule.css';
import TechScheduleEvent from './TechScheduleEvent';

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

  const eventsTodayAndTmr = setDays(events);
  const Event = props.children || TechScheduleEvent;
  return (
    <div className='component'>
      <h3 className='header'>Google Calendar</h3>
      <div className='calendar-events'>
        {eventsTodayAndTmr.map((e, i) => Event(e, i))}
      </div>
    </div>
  );
}

TechSchedule.propTypes = propTypes;
TechSchedule.defaultProps = defaultProps;

export default TechSchedule;

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

function isTodayTomorrow(dateTime, date) {
  const test = dateTime || date;
  return isToday(test) || isTomorrow(test);
}

function setDays(events, days = defaultProps.range) {
  const todayAndTmr = events.filter((e) => isTodayTomorrow(e));

  if (todayAndTmr.length < 5) {
    const today = startOfToday();
    const maxDays = addDays(today, days);
    return events.filter(function (e) {
      const date = e.start.dateTime ? e.start.dateTime : parse(e.start.date);
      return withinRange(date, today, maxDays);
    });
  }
  return todayAndTmr;
}

function getDate(days) {
  return new Date(Date.now() + (MS_IN_DAY * days));
}