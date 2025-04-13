'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface SocialLink {
    label: string;
    url: string;
}

export default function EditProfile() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        username: '',
        bio: '',
        avatar: '',
        socials: [] as SocialLink[],
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const [message, setMessage] = useState('');

    const fetchProfile = async () => {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = res.data;
        const socialsArr = Object.entries(data.socials || {}).map(([label, url]) => ({ label, url }));
        setForm({ ...data, socials: socialsArr });
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
        const { name, value } = e.target;
        if (name === 'socials' && index !== undefined) {
            const updated = [...form.socials];
            updated[index].url = value;
            setForm({ ...form, socials: updated });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleLabelChange = (index: number, value: string) => {
        const updated = [...form.socials];
        updated[index].label = value;
        setForm({ ...form, socials: updated });
    };

    const addLink = () => {
        setForm({ ...form, socials: [...form.socials, { label: '', url: '' }] });
    };

    const removeLink = (index: number) => {
        const updated = [...form.socials];
        updated.splice(index, 1);
        setForm({ ...form, socials: updated });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const socialsObj = form.socials.reduce((acc, curr) => {
            if (curr.label && curr.url) acc[curr.label] = curr.url;
            return acc;
        }, {} as Record<string, string>);

        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/users/update', {
                name: form.name,
                bio: form.bio,
                username: form.username,
                avatar: form.avatar,
                socials: socialsObj,
            }, { headers: { Authorization: `Bearer ${token}` } });
            setMessage('Profile updated successfully!');
            router.push('/dashboard');
        } catch (err) {
            setMessage('Update failed.');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        try {
            setUploading(true);
            const res = await axios.post('http://localhost:5000/api/users/upload-avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('Avatar uploaded!');
            // Optional: refresh profile picture
        } catch (error) {
            alert('Failed to upload avatar');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container mt-5 p-4 rounded bg-dark text-light shadow">
            <h2 className="mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input name="name" value={form.name} onChange={handleChange} className="form-control bg-secondary text-white" />
                </div>
                <div className="mb-3">
                    <label>Username</label>
                    <input name="username" value={form.username} onChange={handleChange} className="form-control bg-secondary text-white" />
                </div>
                <div className="mb-3">
                    <label>Bio</label>
                    <textarea name="bio" value={form.bio} onChange={handleChange} className="form-control bg-secondary text-white" />
                </div>
                <div className="mb-3">
                    <label>Avatar URL</label>
                    <input name="avatar" value={form.avatar} onChange={handleChange} className="form-control bg-secondary text-white" />
                </div>
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-300 block mb-2">Upload Profile Picture</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm bg-gray-900 border p-2 rounded w-full text-white" />
                    <button
                        onClick={handleUpload}
                        className="mt-3 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded"
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload Avatar'}
                    </button>
                </div>

                <h5 className="mt-4">Social Links</h5>
                {form.socials.map((link, index) => (
                    <div key={index} className="row mb-2">
                        <div className="col-md-5">
                            <input
                                type="text"
                                placeholder="Label (e.g. LinkedIn)"
                                value={link.label}
                                onChange={(e) => handleLabelChange(index, e.target.value)}
                                className="form-control bg-secondary text-white"
                            />
                        </div>
                        <div className="col-md-5">
                            <input
                                name="socials"
                                type="url"
                                placeholder="URL"
                                value={link.url}
                                onChange={(e) => handleChange(e, index)}
                                className="form-control bg-secondary text-white"
                            />
                        </div>
                        <div className="col-md-2">
                            <button type="button" className="btn btn-danger w-100" onClick={() => removeLink(index)}>Remove</button>
                        </div>
                    </div>
                ))}
                <button type="button" className="btn btn-info" onClick={addLink}>Add Link</button>

                <div className="mt-4">
                    <button type="submit" className="btn btn-success">Save Changes</button>
                </div>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
        </div>
    );
}
