export const otpEmailTemplate = (otp: string, exp: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .email-header {
        font-size: 20px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20px;
      }
      .email-content {
        font-size: 16px;
        color: #555555;
      }
      .otp-code {
        font-size: 24px;
        font-weight: bold;
        color: #4CAF50;
        margin: 20px 0;
        text-align: center;
      }
      .email-footer {
        font-size: 12px;
        color: #aaaaaa;
        margin-top: 20px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">Your One-Time Password (OTP)</div>
      <div class="email-content">
        Use the following OTP to complete your process. This code is valid for the next ${exp} minutes:
      </div>
      <div class="otp-code">${otp}</div>
      <div class="email-footer">If you didn't request this OTP, please ignore this email.</div>
    </div>
  </body>
  </html>
`;

export const newPasswordEmailTemplate = (newPassword: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .email-header {
        font-size: 20px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20px;
      }
      .email-content {
        font-size: 16px;
        color: #555555;
        margin-bottom: 20px;
      }
      .new-password {
        font-size: 24px;
        font-weight: bold;
        color: #4CAF50;
        margin: 20px 0;
        text-align: center;
      }
      .email-footer {
        font-size: 12px;
        color: #aaaaaa;
        margin-top: 20px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">Your New Password</div>
      <div class="email-content">
        You requested a password reset. Your new password is provided below. Please use it to log in to your account:
      </div>
      <div class="new-password">${newPassword}</div>
      <div class="email-footer">
        It’s recommended that you change your password after logging in.
      </div>
    </div>
  </body>
  </html>
`;
