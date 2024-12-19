import AddEmployee from './AddEmployee';  // Replace Form with AddEmployee
import DeleteEmployee from './DeleteEmployee';
import ViewEmployee from './ViewEmployee';  // Import the ViewEmployee component
import ModifyEmployee from './ModifyEmployee';  // Import the ModifyEmployee component
import { useState } from 'react';

function App() {
  const [view, setView] = useState<string | null>(null); // State to manage which form to show

  return (
    <div className="App">
      <h1>Employee Management</h1>
      <div className="button-container">
        <button onClick={() => setView('add')}>Add Employee</button>
        <button onClick={() => setView('delete')}>Delete Employee</button>
        <button onClick={() => setView('view')}>View Employee</button>
        <button onClick={() => setView('modify')}>Modify Employee</button> {/* New button for Modify Employee */}
      </div>

      {/* Conditionally render based on selected view */}
      {view === 'add' && <AddEmployee />} {/* Updated to AddEmployee */}
      {view === 'delete' && <DeleteEmployee />}
      {view === 'view' && <ViewEmployee />} {/* Conditionally render ViewEmployee */}
      {view === 'modify' && <ModifyEmployee />} {/* Conditionally render ModifyEmployee */}
    </div>
  );
}

export default App;
