import React from 'react';
import { Link } from 'react-router-dom';
import { PrismCode } from 'react-prism';
import { dedent } from 'dentist';
import {
  Jumbotron,
  Button,
  Container,
  Col,
  Row
} from 'reactstrap';
import { TechSchedule, StudentSchedule } from '../components';

const example = dedent(`
  import React from 'react';
  import { TechSchedule } from 'notice-board-gcalendar';

  const Example = () => {
    return (
      <TechSchedule apiKey='...' calendarID='...' />
    );
  };

  export default Example;
`);

const Home = ({title, gh}) => {
  return (
    <div>
      <Jumbotron tag="section" className="jumbotron-header text-center my-5">
        <Container fluid>
          <Row>
            <Col sm={{ size: 10, offset: 1}}>
              <h1 className="display-4">{title}</h1>
              <p className="lead my-3">
                A Google Calendar Component for UCI School of Education Tech Services Notification Board. Built, documented & published with <a href="https://github.com/reactstrap/component-template">Component Template</a>
              </p>
              <p>
                <Button outline color="danger" href={`https://github.com/${gh}`}>View on Github</Button>
                <Button tag={Link} color="danger" to="/documentation">Documentation</Button>
              </p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container fluid>
        <Row>
          <Col sm={{ size: 8, offset: 2 }}>
            <h2>Getting Started</h2>
            <hr/>
            <p>
              Install and save the component to your project
            </p>
            <pre>
              <PrismCode className="language-bash">
                npm install uci-soe/notice-board-gcalendar --save
              </PrismCode>
            </pre>
            <p>
              ES6 - import the component you need
            </p>
            <div className="docs-example">
              <TechSchedule apiKey='AIzaSyC884UUQAzmMC0Qo8Adh8mmD0AYhbrXEUU'
              calendarID='0q1s2mp8o5djpneiftinq3r6so@group.calendar.google.com' />
            </div>
            <div className="docs-example">
              <StudentSchedule apiKey='AIzaSyC884UUQAzmMC0Qo8Adh8mmD0AYhbrXEUU'
                               calendarID='u73ap9282bp780pil7dbjefkuc@group.calendar.google.com' />
            </div>
            <pre>
              <PrismCode className="language-jsx">
                {example}
              </PrismCode>
            </pre>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;