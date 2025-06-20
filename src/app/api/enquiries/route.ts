import { NextRequest, NextResponse } from 'next/server';

// Mock data - replace with actual database
let enquiries = [
  {
    id: '1',
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '+971 50 123 4567',
    service: 'Visa Application',
    status: 'Pending',
    priority: 'High',
    assignedTo: 'Ahmed Hassan',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    description: 'Need assistance with tourist visa application for family of 4',
    documents: ['passport', 'photos', 'bank_statement']
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+971 55 987 6543',
    service: 'Document Translation',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: 'Sarah Johnson',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
    description: 'Translation of legal documents from English to Arabic',
    documents: ['contract', 'certificate']
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredEnquiries = enquiries;

    // Filter by status if provided
    if (status) {
      filteredEnquiries = enquiries.filter(enquiry => enquiry.status === status);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEnquiries = filteredEnquiries.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedEnquiries,
      pagination: {
        page,
        limit,
        total: filteredEnquiries.length,
        totalPages: Math.ceil(filteredEnquiries.length / limit)
      }
    });
  } catch (error) {
    console.error('Get enquiries error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, email, phone, service, description, documents } = body;

    // Validate required fields
    if (!customerName || !email || !service) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new enquiry
    const newEnquiry = {
      id: (enquiries.length + 1).toString(),
      customerName,
      email,
      phone: phone || '',
      service,
      status: 'Pending',
      priority: 'Medium',
      assignedTo: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: description || '',
      documents: documents || []
    };

    enquiries.push(newEnquiry);

    return NextResponse.json({
      success: true,
      data: newEnquiry,
      message: 'Enquiry created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Create enquiry error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 