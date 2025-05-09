import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('📄 Document upload API called');
  
  try {
    // Get the form data
    const formData = await request.formData();
    
    // Extract fields
    const clientName = formData.get('clientName') as string || 'Client';
    const clientEmail = formData.get('clientEmail') as string || 'N/A';
    const visaType = formData.get('visaType') as string || 'N/A';
    const receiptNumber = formData.get('receiptNumber') as string || 'N/A';
    const nationality = formData.get('nationality') as string || 'N/A';
    const destination = formData.get('destination') as string || 'N/A';
    const travelDate = formData.get('travelDate') as string || 'N/A';
    const processingTime = formData.get('processingTime') as string || 'N/A';
    
    // Get the file
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file found in the upload' },
        { status: 400 }
      );
    }
    
    console.log('📄 Form data received:');
    console.log('Fields:', { clientName, clientEmail, visaType, receiptNumber, nationality, destination, travelDate, processingTime });
    console.log('File:', file.name, 'size:', file.size, 'type:', file.type);
    
    // Email functionality has been removed
    // Instead, we log the document upload information
    
    console.log('✅ Document upload processed successfully');
    
    // Return a success response
    return NextResponse.json({ 
      success: true, 
      message: 'Document uploaded successfully',
      documentInfo: {
        name: file.name,
        size: file.size,
        type: file.type
      }
    });
  } catch (error) {
    console.error('❌ Error in document upload API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process document upload', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 