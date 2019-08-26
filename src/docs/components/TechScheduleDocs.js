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
      name: PropTypes.string,
      message: PropTypes.string,
      children: PropTypes.any
    }
  `
});

const examples = [];
// Add your component example data here
// multiple examples supported
examples.push({
  name: 'TechSchedule - Basic',
  demo: (
    <TechSchedule />
  ),
  source: `
    <TechSchedule />
  `
});

examples.push({
  name: 'TechSchedule - Advanced',
  demo: (
    <TechSchedule range={2} />
  ),
  source: `
    <TechSchedule range={2}/>
  `
});

examples.push({
  name: 'TechSchedule - Custom Event',
  demo: (
    <TechSchedule>
      {(event) => {
        return <div key={event.id}>
          {event.summary}
        </div>
      }}
    </TechSchedule>
  ),
  source: `
    <TechSchedule>
      {(event) => {
        return <div key={event.id}>
          {event.summary}
        </div>
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
