'use client';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import axios from "axios";
import Image from "next/image";

export default function PublicProfilePage() {
    const { username } = useParams();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/users/${username}`);
                setUser(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [username]);

    if (loading) return <p className="text-center text-white mt-10">Loading...</p>;
    if (!user) return <p className="text-center text-danger mt-10">User not found</p>;

    return (
        <div className="container text-center text-white py-5">
            <Image src={user.avatar || '/default-avatar.png'} alt="Avatar" width={100} height={100} className="rounded-circle mb-3" />
            <h2>{user.name}</h2>
            <p className="text-muted">{user.bio}</p>

            <div className="mt-4">
                {Object.entries(user.socials || {}).map(([label, url]: [string, any], index) => (
                    <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-info m-2">
                        {label}
                    </a>
                ))}
            </div>
        </div>
    );
}
