import nodemailer from "nodemailer";

export default async function emailsend(
  subjectpassed,
  newSubjectPassed,
  email
) {
  const myEmail = process.env.EMAIL_USER;
  const myPass = process.env.EMAIL_PASS;
  return new Promise(function (resolve, reject) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: myEmail,
        pass: myPass,
      },
    });

    let mailOptions;

    if (newSubjectPassed === true) {
      mailOptions = {
        from: myEmail,
        to: `${email}`,
        subject: `ΠΕΡΑΣΕΣ ΤΟ ΜΑΘΗΜΑ ${subjectpassed} `,
        text: "good job!",
      };
    } else {
      mailOptions = {
        from: myEmail,
        to: `${email}`,
        subject: `ΔΕΝ ΕΧΕΙΣ ΠΕΡΑΣΕΙ ΚΑΠΟΙΟ ΜΑΘΗΜΑ. `,
        text: "not so good job",
      };
    }

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        reject(new Error("Send Email"));
      }
      resolve();
    });
  });
}
