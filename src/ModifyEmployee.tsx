import { useState, useEffect } from "react";
import axios from "axios";

type EmployeeData = {
  EmployeeName: string;
  EmployeeID: string;
  EmployeeEmail: string;
  EmployeePhone: string;
  Department: string;
  DateOfJoining: string;
  Role: string;
};

const ModifyEmployee = () => {
  const [employeeID, setEmployeeID] = useState<string>("");
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Fetch employee data when the Employee ID is provided
  useEffect(() => {
    if (employeeID) {
      axios
        .get(`http://localhost:5000/view-employee/${employeeID}`)
        .then((response) => {
          setEmployeeData(response.data);
          setStatusMessage("");
        })
        .catch((error) => {
          setStatusMessage("Error fetching employee data: " + error.message);
        });
    }
  }, [employeeID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeData) {
      setStatusMessage("Please enter valid employee data.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/modify-employee/${employeeData.EmployeeID}`,
        employeeData
      );
      setStatusMessage("Employee details updated successfully!");
    } catch (error) {
      setStatusMessage("Error updating employee: " + error.message);
    }
  };

  return (
    <div className="modify-employee-container">
      <h2 className="modify-employee-header">Modify Employee</h2>
      <form onSubmit={handleSubmit} className="modify-employee-form">
        <label htmlFor="EmployeeID">Employee ID</label>
        <input
          type="text"
          id="EmployeeID"
          placeholder="Enter Employee ID"
          value={employeeID}
          onChange={(e) => setEmployeeID(e.target.value)}
        />

        {employeeData && (
          <>
            <label htmlFor="EmployeeName">Employee Name</label>
            <input
              type="text"
              id="EmployeeName"
              name="EmployeeName"
              value={employeeData.EmployeeName}
              onChange={handleChange}
            />

            <label htmlFor="EmployeeEmail">Employee Email</label>
            <input
              type="email"
              id="EmployeeEmail"
              name="EmployeeEmail"
              value={employeeData.EmployeeEmail}
              onChange={handleChange}
            />

            <label htmlFor="EmployeePhone">Employee Phone</label>
            <input
              type="tel"
              id="EmployeePhone"
              name="EmployeePhone"
              value={employeeData.EmployeePhone}
              onChange={handleChange}
            />

            <label htmlFor="Department">Department</label>
            <select
              id="Department"
              name="Department"
              value={employeeData.Department}
              onChange={handleChange}
            >
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
            </select>

            <label htmlFor="DateOfJoining">Date of Joining</label>
            <input
              type="date"
              id="DateOfJoining"
              name="DateOfJoining"
              value={employeeData.DateOfJoining}
              onChange={handleChange}
            />

            <label htmlFor="Role">Role</label>
            <select
              id="Role"
              name="Role"
              value={employeeData.Role}
              onChange={handleChange}
            >
              <option value="Manager">Manager</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Tester">Tester</option>
            </select>

            <button type="submit" className="modify-employee-button">
              Save Changes
            </button>
          </>
        )}
      </form>
      <p className={`status-message ${statusMessage.includes("Error") ? "error" : "success"}`}>
        {statusMessage}
      </p>
    </div>
  );
};

export default ModifyEmployee;