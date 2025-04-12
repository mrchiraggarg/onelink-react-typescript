"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                return setMessage(data.message || 'Login failed');
            }

            // Store token and redirect
            localStorage.setItem("token", data.token);
            router.push("/dashboard");
        } catch (err) {
            console.error("Login error:", err);
            setMessage("Something went wrong. Try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                {/* Left Image */}
                <Image
                    src="/login-bg.jpg"
                    alt="Login Visual"
                    width={500}
                    height={600}
                    className="login-image"
                />

                {/* Right Form */}
                <div className="login-form">
                    <h2 className="text-3xl mb-6 font-semibold text-white">Welcome Back</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label text-light">Email</label>
                            <input
                                type="email"
                                className="form-control bg-dark text-white"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-light">Password</label>
                            <input
                                type="password"
                                className="form-control bg-dark text-white"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Sign In</button>
                    </form>

                    {message && <p className="mt-3 text-warning">{message}</p>}
                    
                    <p className="mt-3 text-muted text-sm">
                        Don't have an account? <Link href="/register" className="text-info">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
