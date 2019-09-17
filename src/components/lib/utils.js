import format from "date-fns/format";
import isToday from "date-fns/is_today";
import isTomorrow from "date-fns/is_tomorrow";
import isMonday from "date-fns/is_monday";
import isTuesday from "date-fns/is_tuesday";
import isWednesday from "date-fns/is_wednesday";
import isThursday from "date-fns/is_thursday";
import isFriday from "date-fns/is_friday";
import isSaturday from "date-fns/is_saturday";
import isSunday from "date-fns/is_sunday";
import axios from 'axios';
import startOfToday from "date-fns/start_of_today";
import addDays from "date-fns/add_days";
import addMinutes from "date-fns/add_minutes";
import subMinutes from "date-fns/sub_minutes";
import parse from "date-fns/parse";
import withinRange from "date-fns/is_within_range";

export const MINUTE = 1000 * 60;
export const MS_IN_DAY = MINUTE * 60 * 24;
export {format, isToday, isTomorrow, isTodayTomorrow, withinRange, addMinutes, subMinutes};

export function formatDescription(desc) {
  if (desc) {
    const clean = desc
      .replace(/<[^>]*>?/gm, '')
      .replace(/[^a-z\d:.,?!@&\s\n]+/ig, '')
      .split(/\n/g)
      .map(s => s.trim())
      .filter(s => !!s);
    return clean[0];
  }
  else {
    return '';
  }
}

export function displayTime(startTime, endTime) {
  return startTime ? `${format(startTime, "h:mm A")} - ${format(endTime, "h:mm A")}` : `All Day`;
}

export function displayHRDate(dateTime, date) {
  return dateTime ? format(dateTime, "MMMM DD") : format(date, "MMMM DD");
}

function displayDayOfWeek(date) {
  if (isMonday(date)) {
    return 'Monday';
  }
  else if (isTuesday(date)) {
    return 'Tuesday';
  }
  else if (isWednesday(date)) {
    return 'Wednesday';
  }
  else if (isThursday(date)) {
    return 'Thursday';
  }
  else if (isFriday(date)) {
    return 'Friday';
  }
  else if (isSaturday(date)) {
    return 'Saturday';
  }
  else if (isSunday(date)) {
    return 'Sunday';
  }
}

export function displayTodayTomorrow(dateTime, date) {
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

export function getEvents(min, max, ID, KEY) {
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

export function getDate(days) {
  return new Date(Date.now() + (MS_IN_DAY * days));
}

function isTodayTomorrow(dateTime, date) {
  const test = dateTime || date;
  return isToday(test) || isTomorrow(test);
}

function nextWorkingDay(date) {
  let result = addDays(date, 1);
    while (isSaturday(result) || isSunday(result)) {
      result = addDays(result, 1);
    }
  return result;
}

export function setDays(events, days) {
  const todayAndTmr = events.filter(function(e) {
    // const now = new Date(Date.now());
    // const start = e.start.dateTime || e.start.date;
    // const end = e.end.dateTime || e.end.date;
    const nextDay = nextWorkingDay(e);
    // return withinRange(now, start, end) || isTodayTomorrow(nextDay);
    return isTodayTomorrow(nextDay);
  });

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