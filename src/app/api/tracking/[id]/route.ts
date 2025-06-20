import { NextRequest, NextResponse } from 'next/server';

// Mock tracking data - replace with actual database
const trackingData = {
  'TRK001': {
    id: 'TRK001',
    status: 'In Progress',
    service: 'Visa Application',
    customer: 'John Doe',
    submittedDate: '2024-01-15',
    estimatedCompletion: '2024-01-25',
    currentStep: 'Document Review',
    progress: 60,
    steps: [
      { step: 'Application Submitted', completed: true, date: '2024-01-15' },
      { step: 'Document Review', completed: false, date: null },
      { step: 'Application Processing', completed: false, date: null },
      { step: 'Approval', completed: false, date: null },
      { step: 'Document Delivery', completed: false, date: null }
    ]
  },
  'TRK002': {
    id: 'TRK002',
    status: 'Completed',
    service: 'Document Translation',
    customer: 'Jane Smith',
    submittedDate: '2024-01-10',
    estimatedCompletion: '2024-01-20',
    currentStep: 'Completed',
    progress: 100,
    steps: [
      { step: 'Application Submitted', completed: true, date: '2024-01-10' },
      { step: 'Translation in Progress', completed: true, date: '2024-01-12' },
      { step: 'Quality Review', completed: true, date: '2024-01-15' },
      { step: 'Final Approval', completed: true, date: '2024-01-18' },
      { step: 'Document Delivery', completed: true, date: '2024-01-20' }
    ]
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const trackingId = params.id;
    
    // Check if tracking ID exists
    if (!trackingData[trackingId as keyof typeof trackingData]) {
      return NextResponse.json(
        { success: false, message: 'Tracking number not found' },
        { status: 404 }
      );
    }

    const trackingInfo = trackingData[trackingId as keyof typeof trackingData];

    return NextResponse.json({
      success: true,
      data: trackingInfo
    });
  } catch (error) {
    console.error('Get tracking error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const trackingId = params.id;
    const body = await request.json();
    const { status, currentStep, progress } = body;

    // Check if tracking ID exists
    if (!trackingData[trackingId as keyof typeof trackingData]) {
      return NextResponse.json(
        { success: false, message: 'Tracking number not found' },
        { status: 404 }
      );
    }

    // Update tracking information
    const trackingInfo = trackingData[trackingId as keyof typeof trackingData];
    if (status) trackingInfo.status = status;
    if (currentStep) trackingInfo.currentStep = currentStep;
    if (progress !== undefined) trackingInfo.progress = progress;
    trackingInfo.updatedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      data: trackingInfo,
      message: 'Tracking updated successfully'
    });
  } catch (error) {
    console.error('Update tracking error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 