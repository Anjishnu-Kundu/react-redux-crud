import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateEmployeeMutation, useGetEmployeeQuery, useUpdateEmployeeMutation } from '../services/api';

const EmployeeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [age, setAge] = useState('');
  const { data } = useGetEmployeeQuery(id!, { skip: !id });
  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();

  useEffect(() => {
    if (data) {
      setName(data.data.employee_name);
      setSalary(data.data.employee_salary);
      setAge(data.data.employee_age);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const employeeData = { employee_name: name, employee_salary: salary, employee_age: age };

    if (id) {
      await updateEmployee({ id, data: employeeData });
    } else {
      await createEmployee(employeeData);
    }

    navigate('/');
  };

  return (
    <div>
      <h1>{id ? 'Edit Employee' : 'Create Employee'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Salary:</label>
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
