'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registering user:', formData);

        // Later: send data to backend
        // For now, simulate redirect to dashboard
        router.push('/dashboard');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                {/* Left Form */}
                <div className="login-form">

                    <h2 className="text-3xl mb-6 font-semibold text-white">Create an Account</h2>
                    <form>
                        <div className="mb-4">
                            <label className="form-label text-light">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control bg-dark text-white"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-light">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control bg-dark text-white"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-light">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control bg-dark text-white"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-light">Confirm Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control bg-dark text-white"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Sign Up
                        </button>
                    </form>
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
