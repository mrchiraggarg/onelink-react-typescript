'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Dashboard</h2>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
