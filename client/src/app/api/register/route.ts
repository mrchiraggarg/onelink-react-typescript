import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { name, email, password, confirmPassword } = await req.json();

    if (!name || !email || !password || password !== confirmPassword) {
        return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    // Simulate DB save logic here (replace with actual DB call)
    console.log("User Registered:", { name, email });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 200 });
}
