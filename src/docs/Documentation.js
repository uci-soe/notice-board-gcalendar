import React from 'react';
import LayoutContent from './layout/Content';

import TechScheduleDocs from './components/TechScheduleDocs';
import StudentScheduleDocs from './components/StudentScheduleDocs';

const Documentation = () => {
  return (
    <div>
      <LayoutContent>
        <TechScheduleDocs />
        <StudentScheduleDocs />
      </LayoutContent>
    </div>
  );
};

export default Documentation;
