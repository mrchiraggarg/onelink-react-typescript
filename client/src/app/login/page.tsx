"use client";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
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
                    <form>
                        <div className="mb-4">
                            <label className="form-label text-light">Email</label>
                            <input type="email" className="form-control bg-dark text-white" placeholder="Enter email" />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-light">Password</label>
                            <input type="password" className="form-control bg-dark text-white" placeholder="Enter password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Sign In</button>
                    </form>

                    <p className="mt-3 text-muted text-sm">
                        Don't have an account? <Link href="/register" className="text-info">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
