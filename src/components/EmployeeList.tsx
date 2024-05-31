import React from 'react';
import { useGetEmployeesQuery } from '../services/api';
import { Link } from 'react-router-dom';

const EmployeeList: React.FC = () => {
  const { data, error, isLoading } = useGetEmployeesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      <h1>Employee List</h1>
      <Link to="/create">Create New Employee</Link>
      <ul>
        {data.data.map((employee: any) => (
          <li key={employee.id}>
            <Link to={`/employee/${employee.id}`}>{employee.employee_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
