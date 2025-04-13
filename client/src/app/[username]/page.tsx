'use client';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import axios from "axios";
import Image from "next/image";
import { Copy } from 'lucide-react';
import Link from 'next/link';

interface UserData {
    name: string;
    bio: string;
    avatar?: string;
    socials: Record<string, string>;
}

export default function PublicProfilePage() {
    const { username } = useParams();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);   

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/users/${username}`);
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

    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url);
    };

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center px-4 py-10">
            {user.avatar && (
                <Image
                    src={user.avatar}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="rounded-full mb-4 object-cover"
                />
            )}
            <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
            <p className="text-gray-400 mb-6 text-center max-w-md">{user.bio}</p>

            <div className="w-full max-w-md space-y-3">
                {Object.entries(user.socials).map(([label, url], idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg shadow hover:bg-[#292929] transition"
                    >
                        <Link href={url as string} target="_blank" rel="noopener noreferrer" className="truncate">
                            <span className="text-cyan-400">{label}</span>: <span className="text-white">{url as string}</span>
                        </Link>
                        <button onClick={() => handleCopy(url as string)} title="Copy">
                            <Copy size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
