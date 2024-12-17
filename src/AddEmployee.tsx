
// importing the required librariies
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import './AddEmployee.css';


// defining the form values as we are using typescript
type FormValues = {
  EmployeeName: string;
  EmployeeID: string;
  EmployeeEmail: string;
  EmployeePhone: string;
  Department: string;
  DateOfJoining: string;
  Role: string;
};

// form function begins
const Form = () => {
   // destructuring the register and handleSubmit from useForm and passing the types as FormValues
  const { register, handleSubmit } = useForm<FormValues>();


  // onSubmit function to handle the form submission
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
   // calling the axios post method to send the data to the server
    try {
      const response = await axios.post("http://localhost:5000/submit-form", data);
      alert(response.data); // "Data saved successfully"
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to save data");
    }
  };

  return (
   // passing the handleSumbit function to the form
    <form 
    className="add-employee-form"
    onSubmit={handleSubmit(onSubmit)}>
      
      

      
      <label htmlFor="EmployeeName">Employee Name</label>
      <input type="text" id="EmployeeName" {...register("EmployeeName")} />  
      {/* Attaching the register function to the input fields of all elements */}

      
      <label htmlFor="EmployeeID">Employee ID</label>
      <input type="text" id="EmployeeID" {...register("EmployeeID")} />

      
      <label htmlFor="EmployeeEmail">Employee Email</label>
      <input type="email" id="EmployeeEmail" {...register("EmployeeEmail")} />

      
      <label htmlFor="EmployeePhone">Employee Phone</label>
      <input type="tel" id="EmployeePhone" {...register("EmployeePhone")} />

     
      <label htmlFor="Department">Department</label>
      <select id="Department" {...register("Department")}>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
        <option value="Finance">Finance</option>
        <option value="HR">HR</option>
        <option value="IT">IT</option>
      </select>

      
      <label htmlFor="DateOfJoining">Date of Joining</label>
      <input type="date" id="DateOfJoining" {...register("DateOfJoining")} />


      
      <label htmlFor="Role">Role</label>
      <select id="Role" {...register("Role")}>
        <option value="Manager">Manager</option>
        <option value="Team Lead">Team Lead</option>
        <option value="Developer">Developer</option>
        <option value="Designer">Designer</option>
        <option value="Tester">Tester</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
