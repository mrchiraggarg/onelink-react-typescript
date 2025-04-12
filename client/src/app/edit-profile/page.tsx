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
        bio: '',
        avatar: '',
        socials: [] as SocialLink[],
    });

    const [message, setMessage] = useState('');

    const fetchProfile = async () => {
        try {
            const { data } = await axios.get('/api/users/me');
            const socialsArr = Object.entries(data.socials || {}).map(([label, url]) => ({ label, url }));
            setForm({ ...data, socials: socialsArr });
        } catch (err) {
            console.error(err);
        }
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
            await axios.put('http://localhost:5000/api/users/update', {
                name: form.name,
                bio: form.bio,
                avatar: form.avatar,
                socials: socialsObj,
            });
            setMessage('Profile updated successfully!');
            router.push('/dashboard');
        } catch (err) {
            setMessage('Update failed.');
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
                    <label>Bio</label>
                    <textarea name="bio" value={form.bio} onChange={handleChange} className="form-control bg-secondary text-white" />
                </div>
                <div className="mb-3">
                    <label>Avatar URL</label>
                    <input name="avatar" value={form.avatar} onChange={handleChange} className="form-control bg-secondary text-white" />
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
