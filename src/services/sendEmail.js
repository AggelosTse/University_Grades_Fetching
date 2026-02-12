import nodemailer from "nodemailer";

export default async function emailsend(subjectpassed, newSubjectPassed) {
  const adminEmail = process.env.EMAIL_ADMIN;
  const myPass = process.env.EMAIL_PASS;
  const userEmail = process.env.EMAIL_USER;

  if (!newSubjectPassed) {
    return; 
  }

  return new Promise(function (resolve, reject) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: adminEmail,
        pass: myPass,
      },
    });

    const mailOptions = {
      from: adminEmail,
      to: userEmail,
      subject: `ΠΕΡΑΣΕΣ ΤΟ ΜΑΘΗΜΑ ${subjectpassed}`,
      text: "Good job!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Nodemailer Error:", error.message);
        return reject(new Error("Send Email")); 
      }
      resolve();
    });
  });
}