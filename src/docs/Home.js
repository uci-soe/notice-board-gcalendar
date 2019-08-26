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
import { TechSchedule } from '../components';

const example = dedent(`
  import React from 'react';
  import { TechSchedule } from 'notice-board-gcalendar';

  const Example = () => {
    return (
      <TechSchedule />
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
              <TechSchedule />
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
}

export default Home;
