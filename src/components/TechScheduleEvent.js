import React from 'react';
import {displayHRDate, displayTime, displayTodayTomorrow, formatDescription} from './lib/utils';

export default function(e, i) {
  return (
    <div className={`event ${i+1}`} key={i}>
      <div className="d-flex justify-content-between time">
        <div>
          {displayTodayTomorrow(e.start.dateTime, e.start.date)}
        </div>
        <div>
          {displayTime(e.start.dateTime, e.end.dateTime)}
        </div>
      </div>

      <div className="d-flex">
        <div className='summary'>
          {e.summary}
          {e.description && `: ${formatDescription(e.description)}`}
        </div>
      </div>

      <div className='d-flex justify-content-between location'>
        <div>
          {e.location ? `@ `+ e.location : `@ Location TBD`}
        </div>

        <div>
          {displayHRDate(e.start.dateTime, e.start.date)}
        </div>
      </div>
    </div>
  );
}