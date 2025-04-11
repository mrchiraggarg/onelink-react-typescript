'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
        <div className="container py-5" style={{ maxWidth: '500px' }}>
            <h2 className="text-center text-white mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
                <div className="mb-3">
                    <label className="form-label text-white">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control bg-dark text-white border-secondary"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control bg-dark text-white border-secondary"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control bg-dark text-white border-secondary"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Register
                </button>
            </form>
        </div>
    );
}
