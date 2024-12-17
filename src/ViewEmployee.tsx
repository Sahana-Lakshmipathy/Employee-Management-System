import { useState } from 'react';
import axios from 'axios';
import './ViewEmployee.css';

const ViewEmployee = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeID(e.target.value);
  };

  const handleView = async () => {
    if (!employeeID) {
      setStatusMessage("Please enter an Employee ID.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/view-employee/${employeeID}`);
      setEmployeeData(response.data);
      setStatusMessage("");
    } catch (error: any) {
      setStatusMessage("Error fetching employee data: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="view-container">
      <h2>View Employee</h2>
      <input
        type="text"
        placeholder="Enter Employee ID"
        value={employeeID}
        onChange={handleChange}
      />
      <button onClick={handleView}>View Employee</button>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
      {employeeData && (
        <div className="employee-details">
          <h3>Employee Details</h3>
          <p><strong>Name:</strong> {employeeData.EmployeeName}</p>
          <p><strong>Email:</strong> {employeeData.EmployeeEmail}</p>
          <p><strong>Phone:</strong> {employeeData.EmployeePhone}</p>
          <p><strong>Department:</strong> {employeeData.Department}</p>
          <p><strong>Date of Joining:</strong> {employeeData.DateOfJoining}</p>
          <p><strong>Role:</strong> {employeeData.Role}</p>
        </div>
      )}
    </div>
  );
};

export default ViewEmployee;
