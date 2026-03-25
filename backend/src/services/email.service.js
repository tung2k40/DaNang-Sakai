const { Resend } = require("resend");
const { ENV } = require("../lib/env");

const resend = ENV.RESEND_API_KEY ? new Resend(ENV.RESEND_API_KEY) : null;

const sendOTP = async (to, otp) => {
  const currentResend = new Resend(process.env.RESEND_API_KEY || ENV.RESEND_API_KEY);

  if (!currentResend) {
    console.warn(`\n========================================`);
    console.warn(`[DEV MODE] RESEND_API_KEY is not configured!`);
    console.warn(`[DEV MODE] Mock email sent to: ${to}`);
    console.warn(`[DEV MODE] Your OTP is: ${otp}`);
    console.warn(`========================================\n`);
    return;
  }

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || ENV.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const fromName = process.env.EMAIL_FROM_NAME || ENV.EMAIL_FROM_NAME || 'DanangScholar';

    console.log("==> Dữ liệu gửi Mail:");
    console.log("Từ:", `${fromName} <${fromEmail}>`);
    console.log("Đến:", to);

    const { data, error } = await currentResend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [to],
      subject: "DanangScholar Security Verification Code",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 420px; margin: 20px auto; padding: 24px; border-radius: 10px; background: #ffffff; border: 1px solid #e6e9ec; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <h2 style="color: #0078ff; font-size: 20px; margin-bottom: 8px; text-align: center;">Welcome to DanangScholar</h2>
          <p style="color: #444; font-size: 15px; text-align: center; margin: 10px 0 18px;">Use the code below to verify your email address:</p>
          <div style="font-size: 30px; letter-spacing: 4px; font-weight: bold; color: #ffffff; background: linear-gradient(135deg, #0078ff, #00c2ff); text-align: center; padding: 12px 0; border-radius: 8px; margin-bottom: 20px;">${otp}</div>
          <p style="color: #666; font-size: 14px; text-align: center; margin: 0;">This code will expire in <b>5 minutes</b>.</p>
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 16px;">— DanangScholar Team</p>
        </div>
      `,
    });

    if (error) {
      console.error("[RESEND ERROR]", error);
      throw new Error(`Failed to send OTP via Resend: ${error.message}`);
    }

    console.log(`OTP sent successfully to ${to}, response ID: ${data.id}`);
  } catch (error) {
    console.error("[RESEND EXCEPTION]", error);
    throw new Error(`Failed to send OTP via Email: ${error.message}`);
  }
};

module.exports = { sendOTP };
