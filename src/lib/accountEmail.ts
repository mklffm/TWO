/**
 * Email service for sending account confirmation emails
 */

/**
 * Send confirmation email to a newly registered user
 * @param data User registration data
 * @returns Promise that resolves when email is sent
 */
export const sendAccountConfirmationEmail = async (data: any): Promise<{success: boolean; message?: string}> => {
  try {
    console.log('Sending account confirmation email for:', data.firstName, data.lastName);
    
    // Call the email API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: data.email,
        cc: 'khalfaouimanar28@gmail.com', // Agency email
        subject: `Welcome to Mira Booking, ${data.firstName}!`,
        data: {
          ...data,
          template: 'account-confirmation'
        },
      }),
    });

    // Parse the response
    const result = await response.json();
    
    if (!response.ok) {
      console.error('API Error:', result);
      return {
        success: false,
        message: result.error || 'Failed to send confirmation email'
      };
    }

    console.log('Confirmation email sent successfully!');
    return {
      success: true,
      message: 'Confirmation email sent successfully'
    };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Generate a simple confirmation email template for account creation
 */
export const generateAccountConfirmationEmail = (data: any) => {
  const { firstName, lastName, email } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Account Created Successfully</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          background: linear-gradient(to right, #4a6cf7, #6a8ef7);
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          padding: 20px;
          border: 1px solid #ddd;
          border-top: none;
          border-radius: 0 0 5px 5px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #777;
        }
        .button {
          display: inline-block;
          background: linear-gradient(to right, #4a6cf7, #6a8ef7);
          color: white;
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 5px;
          margin-top: 15px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Mira Booking</h1>
        <p>Account Confirmation</p>
      </div>
      <div class="content">
        <p>Dear ${firstName} ${lastName},</p>
        
        <p>Thank you for creating an account with Mira Booking. Your account has been successfully created!</p>
        
        <p>You can now log in with your email address: <strong>${email}</strong></p>
        
        <p>With your Mira Booking account, you can:</p>
        <ul>
          <li>Apply for visa services</li>
          <li>Track your visa applications</li>
          <li>Access personalized visa guidance</li>
          <li>Receive exclusive offers and updates</li>
        </ul>
        
        <p style="text-align: center;">
          <a href="https://mira-booking.com/login" class="button">Log In Now</a>
        </p>
        
        <p>If you have any questions or need assistance, please don't hesitate to contact our support team at support@mira.dz or call +213 123 456 789.</p>
        
        <p>Best regards,<br>
        The Mira Booking Team</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Mira Booking. All rights reserved.</p>
        <p>Algeria, Algiers</p>
      </div>
    </body>
    </html>
  `;
}; 