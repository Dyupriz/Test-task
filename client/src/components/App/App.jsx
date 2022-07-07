import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Tasks from '../Tasks/Tasks';
import TaskInformation from '../TaskInformation/TaskInformation';
import { context } from '../../context';

function App() {
  const [taksInfo, setTaskInfo] = useState('');

  return (
    <context.Provider value={{ taksInfo, setTaskInfo }}>
      <BrowserRouter>
        <Routes>
          <Route path='/taskInformation' element={<TaskInformation />} />
          <Route path='/' element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </context.Provider>
  );
}

export default App;
