import React, {Component, PropTypes} from 'react';

import TechScheduleEvent from './TechScheduleEvent';

import axios from 'axios';
import isToday from 'date-fns/is_today';
import isTomorrow from 'date-fns/is_tomorrow';
import withinRange from 'date-fns/is_within_range';
import startOfToday from 'date-fns/start_of_today';
import addDays from 'date-fns/add_days';
import parse from 'date-fns/parse';

import './TechSchedule.css';

const KEY = 'AIzaSyC884UUQAzmMC0Qo8Adh8mmD0AYhbrXEUU';
const ID = '0q1s2mp8o5djpneiftinq3r6so@group.calendar.google.com';
const URL = `https://www.googleapis.com/calendar/v3/calendars/${ID}/events`;
const MINUTE = 1000 * 60;
const MS_IN_DAY = MINUTE * 60 * 24;


function getDate(days) {
  return new Date(Date.now() + (MS_IN_DAY * days));
}

const propTypes = {
  range: PropTypes.number,
  timeMin: PropTypes.instanceOf(Date),
  timeMax: PropTypes.instanceOf(Date),
  children: PropTypes.any
};

const defaultProps = {
  range: 2,
  timeMin: getDate(-1),
  timeMax: getDate(14)
};

class TechSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };

    this.updateTimeout = null;
    this.timeout = 10 * MINUTE;
  }

  getEvents(min, max) {
    return axios.get(URL, {
      params: {
        key: KEY,
        orderBy: 'startTime',
        timeMin: min.toISOString(),
        timeMax: max.toISOString(),
        singleEvents: true
      }
    })
      .then(resp => resp.data);
  }

  update(time = this.timeout) {
    this.updateTimeout = setTimeout(() => {

      this.getEvents(getDate(-1), getDate(14))
        .then(data => this.setState({events: data.items}));

      this.update(time);

    }, time);
  }

  componentDidMount() {
    this.getEvents(getDate(-1), getDate(14))
      .then(data => this.setState({events: data.items}));

    this.update();
  }

  componentWillUnmount() {
    clearTimeout(this.updateTimeout);
  }

  componentDidUpdate() {
    this.componentWillUnmount();
    this.componentDidMount();
  }

  isTodayTomorrow(dateTime, date) {
    const test = dateTime || date;
    return isToday(test) || isTomorrow(test);
  }

  setDays(events, days = this.props.range) {
    const todayAndTmr = events.filter((e) => this.isTodayTomorrow(e));

    if (todayAndTmr.length < 3) {
      const today = startOfToday();
      const maxDays = addDays(today, days);
      return events.filter(function (e) {
        const date = e.start.dateTime ? e.start.dateTime : parse(e.start.date);
        return withinRange(date, today, maxDays);
      });
    }
    return todayAndTmr;
  }

  render() {
    const eventsTodayAndTmr = this.setDays(this.state.events || []);
    const Event = this.props.children || TechScheduleEvent;
    return (
      <div className='calendar-events'>
        {eventsTodayAndTmr.map((e, i) => Event(e, i))}
      </div>
    );
  }
}

TechSchedule.propTypes = propTypes;
TechSchedule.defaultProps = defaultProps;

export default TechSchedule;