import nodemailer from "nodemailer";

export default async function emailsend(
  subjectpassed,
  newSubjectPassed
) {
  const adminEmail = process.env.EMAIL_ADMIN;
  const myPass = process.env.EMAIL_PASS;
  const userEmail = process.env.EMAIL_USER;

  return new Promise(function (resolve, reject) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: adminEmail,
        pass: myPass,
      },
    });

    let mailOptions;

    if (newSubjectPassed === true) {
      mailOptions = {
        from: adminEmail,
        to: userEmail,
        subject: `ΠΕΡΑΣΕΣ ΤΟ ΜΑΘΗΜΑ ${subjectpassed} `,
        text: "good job!",
      };
    } else {
      mailOptions = {
        from: adminEmail,
        to: userEmail,
        subject: `ΔΕΝ ΕΧΕΙΣ ΠΕΡΑΣΕΙ ΚΑΠΟΙΟ ΜΑΘΗΜΑ. `,
        text: "not so good job",
      };
    }

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        reject(new Error("Failed to send Email"));
      }
      resolve();
    });
  });
}
