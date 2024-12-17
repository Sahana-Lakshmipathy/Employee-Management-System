import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import './DeleteEmployee.css'; // Import the updated styles

type FormData = {
  EmployeeID: string;
};

const DeleteEmployee = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [statusMessage, setStatusMessage] = useState("");

  const onDeleteEmployee = async (data: FormData) => {
    if (!data.EmployeeID) {
      setStatusMessage("Please enter a valid Employee ID.");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/delete-employee/${data.EmployeeID}`);
      setStatusMessage(response.data);
    } catch (error: any) {
      setStatusMessage("Error deleting employee: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="delete-container">
      <form onSubmit={handleSubmit(onDeleteEmployee)}>
        {/* Heading inside form */}
        <h1 className="delete-heading">Delete Employee</h1>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Enter Employee ID"
          {...register('EmployeeID', { required: 'Employee ID is required' })}
        />
        {errors.EmployeeID && <p className="error-message">{errors.EmployeeID.message}</p>}

        {/* Submit Button */}
        <button type="submit">Delete Employee</button>
      </form>

      {/* Status Message */}
      {statusMessage && (
        <p className={`status-message ${statusMessage.includes('Error') ? 'error' : 'success'}`}>
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default DeleteEmployee;
