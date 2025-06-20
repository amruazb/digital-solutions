import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, userType } = body;

    // TODO: Implement actual authentication logic
    // This is a placeholder for demonstration
    if (email && password) {
      // Simulate authentication
      const user = {
        id: '1',
        email,
        name: 'Admin User',
        role: userType || 'admin',
        token: 'mock-jwt-token-' + Date.now()
      };

      return NextResponse.json({
        success: true,
        user,
        message: 'Login successful'
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 