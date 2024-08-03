import nodemailer from 'nodemailer';

// Utility function to send an email with the temporary password
export async function sendEmail(email: string, tempPassword: string): Promise<void> {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'SpotCker Temporary Password',
        text: `Your temporary password is: ${tempPassword}. Please log in and change your password.`,
    };

    await transporter.sendMail(mailOptions);
}
