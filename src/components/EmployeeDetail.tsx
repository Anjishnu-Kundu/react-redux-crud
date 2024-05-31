import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetEmployeeQuery, useDeleteEmployeeMutation } from '../services/api';

const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetEmployeeQuery(id!);
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  const handleDelete = async () => {
    await deleteEmployee(id!);
    navigate('/');
  };

  return (
    <div>
      <h1>Employee Detail</h1>
      <p>Name: {data.data.employee_name}</p>
      <p>Salary: {data.data.employee_salary}</p>
      <p>Age: {data.data.employee_age}</p>
      <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
};

export default EmployeeDetail;
