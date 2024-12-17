import AddEmployee from './AddEmployee';  // Replace Form with AddEmployee
import DeleteEmployee from './DeleteEmployee';
import ViewEmployee from './ViewEmployee';  // Import the ViewEmployee component
import { useState } from 'react';

function App() {
  const [view, setView] = useState<string | null>(null); // State to manage which form to show

  return (
    <div className="App">
      <h1>Employee Management</h1>
      <div>
        <button onClick={() => setView('add')}>Add Employee</button>
        <button onClick={() => setView('delete')}>Delete Employee</button>
        <button onClick={() => setView('view')}>View Employee</button> {/* New button */}
      </div>

      {/* Conditionally render based on selected view */}
      {view === 'add' && <AddEmployee />} {/* Updated to AddEmployee */}
      {view === 'delete' && <DeleteEmployee />}
      {view === 'view' && <ViewEmployee />} {/* Conditionally render ViewEmployee */}
    </div>
  );
}

export default App;
