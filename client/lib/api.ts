import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api", // Update to match your Auth service port
  withCredentials: true,
});

export const loginUser = (data: {
  email: string;
  password: string;
}) => API.post("/auth/login", data);

export const registerUser = async (formData: any) => {
  const res = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Registration failed');
  }

  return await res.json();
};
