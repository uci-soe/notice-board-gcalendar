import React from 'react';
import DocumentComponent from '../layout/DocumentComponent';
import { TechSchedule } from '../../components';

const components = [];
// Add your component proptype data here
// multiple component proptype documentation supported
components.push({
  name: 'TechSchedule',
  proptypes: `
    {
      range: PropTypes.number,
      timeMin: PropTypes.instanceOf(Date),
      timeMax: PropTypes.instanceOf(Date),
      children: PropTypes.any
    }
  `
});

const KEY = 'AIzaSyC884UUQAzmMC0Qo8Adh8mmD0AYhbrXEUU';
const ID = '0q1s2mp8o5djpneiftinq3r6so@group.calendar.google.com';

const examples = [];
// Add your component example data here
// multiple examples supported
examples.push({
  name: 'TechSchedule - Basic',
  demo: (
    <TechSchedule apiKey={KEY} calendarID={ID} />
  ),
  source: `
    <TechSchedule apiKey='...' calendarID='...' />
  `
});

examples.push({
  name: 'TechSchedule - Advanced',
  demo: (
    <TechSchedule range={2} apiKey={KEY} calendarID={ID} />
  ),
  source: `
    <TechSchedule range={2} apiKey='...' calendarID='...'/>
  `
});

examples.push({
  name: 'TechSchedule - Empty',
  demo: (
    <TechSchedule limit={0} apiKey={KEY} calendarID={ID} />
  ),
  source: `
    <TechSchedule limit={0} apiKey='...' calendarID='...'/>
  `
});

function CustomNoEvents() {
  return (
    <div className="empty-event">
      <h2>No events today</h2>
      <p>Nothing to see here, move along. Check back in tomorrow.</p>
    </div>
  );
}

examples.push({
  name: 'TechSchedule - Custom Empty',
  demo: (
    <TechSchedule limit={0} noEvent={CustomNoEvents} apiKey={KEY} calendarID={ID} />
  ),
  source: `
    function CustomNoEvents() {
      return (
        <div className="empty-event">
          <h2>No events today</h2>
          <p>Nothing to see here, move along. Check back in tomorrow.</p>
        </div>
      );
    }
    
    /* ... */
    
    <TechSchedule limit={0} noEvent={CustomNoEvents} apiKey='...' calendarID='...'/>
  `
});

examples.push({
  name: 'TechSchedule - Custom Event',
  demo: (
    <TechSchedule apiKey={KEY} calendarID={ID}>
      {(event) => {
        return <div key={event.id}>
          {event.summary}
        </div>;
      }}
    </TechSchedule >
  ),
  source: `
    <TechSchedule apiKey='...' calendarID='...'>
      {(event) => {
        return <div key={event.id}>
          {event.summary}
        </div>;
      }}
    </TechSchedule>
  `
});

const Documentation = () => {
  return (
    <DocumentComponent
      name="TechSchedule"
      components={components}
      examples={examples}>
      <p>Description for component</p>
    </DocumentComponent>
  );
};

export default Documentation;