import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummy.restapiexample.com/api/v1' }),
  endpoints: (builder) => ({
    getEmployees: builder.query<any, void>({
      query: () => 'employees',
    }),
    getEmployee: builder.query<any, string>({
      query: (id) => `employee/${id}`,
    }),
    createEmployee: builder.mutation<any, Partial<any>>({
      query: (newEmployee) => ({
        url: 'create',
        method: 'POST',
        body: newEmployee,
      }),
    }),
    updateEmployee: builder.mutation<any, { id: string; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `update/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteEmployee: builder.mutation<any, string>({
      query: (id) => ({
        url: `delete/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = api;
