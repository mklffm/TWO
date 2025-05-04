/**
 * Generate HTML email template for visa application receipt
 */
export const generateReceiptEmailTemplate = (data: any) => {
  const {
    fullName,
    email,
    phone,
    nationality,
    destination,
    travelDate,
    visaType,
    processingTime,
    price,
    agencyName,
    timestamp,
    accountType
  } = data;

  const formattedDate = new Date(timestamp).toLocaleDateString();
  const receiptNumber = `MV-${Date.now().toString().slice(-8)}`;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Visa Application Receipt</title>
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
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }
        th {
          background-color: #f5f5f5;
        }
        .price {
          font-size: 24px;
          font-weight: bold;
          color: #4a6cf7;
          text-align: right;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Mira Booking</h1>
        <p>Visa Application Receipt</p>
      </div>
      <div class="content">
        <p>Dear ${fullName},</p>
        
        <p>Thank you for your visa application. This email confirms we have received your request.</p>
        
        <p><strong>Receipt Number:</strong> ${receiptNumber}<br>
        <strong>Date:</strong> ${formattedDate}</p>
        
        <h2>Application Details</h2>
        
        <table>
          <tr>
            <th>Full Name</th>
            <td>${fullName}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>${email}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>${phone}</td>
          </tr>
          <tr>
            <th>Nationality</th>
            <td>${nationality}</td>
          </tr>
          <tr>
            <th>Destination</th>
            <td>${destination}</td>
          </tr>
          <tr>
            <th>Travel Date</th>
            <td>${new Date(travelDate).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th>Visa Type</th>
            <td>${visaType}</td>
          </tr>
          <tr>
            <th>Processing Time</th>
            <td>${processingTime}</td>
          </tr>
          ${accountType === 'b2b' ? `<tr>
            <th>Agency Name</th>
            <td>${agencyName}</td>
          </tr>` : ''}
        </table>
        
        <div class="price">
          Total: ${price} DZD
        </div>
        
        <p><strong>Required Documents:</strong></p>
        <p>Please send the following documents to complete your application:</p>
        <ol>
          <li>Passport scan (first page with photo)</li>
          <li>ID photo with white background</li>
          <li>Flight reservation (if available)</li>
          <li>Hotel reservation (if available)</li>
        </ol>
        
        <p><strong>How to Submit Documents:</strong></p>
        <ol>
          <li>Email all documents to <strong>mira.booking.dz@gmail.com</strong></li>
          <li>Include your receipt number <strong>${receiptNumber}</strong> in the subject line</li>
          <li>Our team will process your application and contact you within 24 hours</li>
        </ol>
        
        <p>If you have any questions, please contact our support team at mira.booking.dz@gmail.com or call +213 660 885 339.</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Mira Booking. All rights reserved.</p>
        <p>Algeria, Algiers</p>
      </div>
    </body>
    </html>
  `;
}; 