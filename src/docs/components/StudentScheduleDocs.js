import React from 'react';
import DocumentComponent from '../layout/DocumentComponent';
import { StudentSchedule } from '../../components';

const components = [];
// Add your component proptype data here
// multiple component proptype documentation supported
components.push({
  name: 'StudentSchedule',
  proptypes: `
    {
      name: PropTypes.string,
      message: PropTypes.string,
      children: PropTypes.any
    }
  `
});

const KEY = 'AIzaSyC884UUQAzmMC0Qo8Adh8mmD0AYhbrXEUU';
const ID = 'u73ap9282bp780pil7dbjefkuc@group.calendar.google.com';

const examples = [];
// Add your component example data here
// multiple examples supported
examples.push({
  name: 'StudentSchedule - Basic',
  demo: (
    <StudentSchedule apiKey={KEY} calendarID={ID} />
  ),
  source: `
    <StudentSchedule apiKey='...' calendarID='...' />
  `
});

examples.push({
  name: 'StudentSchedule - Advanced',
  demo: (
    <StudentSchedule range={2} apiKey={KEY} calendarID={ID} />
  ),
  source: `
    <StudentSchedule range={2} apiKey='...' calendarID='...'/>
  `
});

examples.push({
  name: 'StudentSchedule - Custom Event',
  demo: (
    <StudentSchedule apiKey={KEY} calendarID={ID}>
      {(event) => {
        return <div key={event.id}>
          {event.summary}
        </div>
      }}
    </StudentSchedule >
  ),
  source: `
    <StudentSchedule apiKey='...' calendarID='...'>
      {(event) => {
        return <div key={event.id}>
          {event.summary}
        </div>
      }}
    </StudentSchedule>
  `
});

const Documentation = () => {
  return (
    <DocumentComponent
      name="StudentSchedule"
      components={components}
      examples={examples}>
      <p>Description for component</p>
    </DocumentComponent>
  );
};

export default Documentation;