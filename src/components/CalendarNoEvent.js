import React from 'react';

import './CalendarNoEvent.css';

function CalendarNoEvent(student=false) {
  let context = '';
  if (student) {
    context = 'student';
  }
  return (
    <div className={`no-content ${context}`} />
  )
}

export default CalendarNoEvent;