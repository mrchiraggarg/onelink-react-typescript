'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { registerUser } from './../../../lib/api';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await registerUser(formData);
            setMessage("Registration successful. Please login.");
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                {/* Left Form */}
                <div className="login-form">

                    <h2 className="text-3xl mb-6 font-semibold text-white">Create an Account</h2>

                    <form onSubmit={handleSubmit}>
                        {["name", "email", "password", "confirmPassword"].map((field, i) => (
                            <div className="mb-3" key={i}>
                                <label className="form-label text-light">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                <input
                                    type={field.includes("password") ? "password" : "text"}
                                    className="form-control bg-dark text-white"
                                    name={field}
                                    value={(formData as any)[field]}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ))}

                        <button type="submit" className="btn btn-success w-100">Sign Up</button>
                    </form>

                    {message && <p className="mt-3 text-warning">{message}</p>}

                    <p className="mt-3 text-muted text-sm">
                        Already have an account? <Link href="/login" className="text-info">Sign In</Link>
                    </p>

                </div>

                {/* Right Image */}
                <Image
                    src="/register-bg.jpg"
                    alt="Register Visual"
                    width={500}
                    height={1000}
                    className="login-image"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
        </div>

    );
}
