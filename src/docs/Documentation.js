import React from 'react';
import LayoutContent from './layout/Content';

import TechScheduleDocs from './components/TechScheduleDocs';
import StudentScheduleDocs from './components/StudentScheduleDocs';
import CalendarNoEvent from '../components/CalendarNoEvent';

const Documentation = () => {
  return (
    <div>
      <LayoutContent>
        <TechScheduleDocs />
        <StudentScheduleDocs />
        <CalendarNoEvent />
      </LayoutContent>
    </div>
  );
};

export default Documentation;
