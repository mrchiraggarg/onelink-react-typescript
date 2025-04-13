'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        fetch("http://localhost:5000/api/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data?.email) {
                    setUser(data);
                } else {
                    localStorage.removeItem("token");
                    router.push("/login");
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
                router.push("/login");
            });
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    if (!user) return <p className="text-light p-5">Loading...</p>;

    return (
        <div className="container mt-5 text-white">
            <div className="row">
                <div className="col-md-4">
                    <div className="card bg-dark text-white shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title">Welcome, {user.name} 👋</h3>
                            <p className="card-text">Email: {user.email}</p>
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" onClick={() => router.push('/edit-profile')}>Edit Profile</button>
                                <button className="btn btn-secondary" onClick={() => router.push(`/${user.username}`)}>View Public Profile</button>
                                <button className="btn btn-danger" onClick={() => {
                                    localStorage.removeItem('token');
                                    router.push('/login');
                                }}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* You can expand this with more widgets/cards */}
                <div className="col-md-8">
                    <div className="card bg-secondary text-white shadow-lg p-3">
                        <h5 className="mb-3">🎯 Quick Stats</h5>
                        <ul>
                            <li>Account Created: {new Date(user.createdAt).toLocaleDateString()}</li>
                            <li>Public URL: /profile/{user.username}</li>
                            {/* Add more info here */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
