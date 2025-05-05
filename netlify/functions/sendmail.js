const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,       // .env에 설정 필요
      pass: process.env.EMAIL_PASS   // 앱 비밀번호 or SMTP password
    }
  });

  const mailOptions = {
    from: data.email,
    to: process.env.EMAIL,
    subject: '문의 from ${data.name}'
  };

  try {
    await transporter.sendMail(mailOptions);
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};