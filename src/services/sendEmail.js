import nodemailer from "nodemailer";

export default async function emailsend(
  subjectpassed,
  newSubjectPassed,
  email
) {
  return new Promise(function (resolve, reject) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "private info",
        pass: "private info",
      },
    });

    let mailOptions;

    if (newSubjectPassed === true) {
      mailOptions = {
        from: "private info",
        to: `${email}`,
        subject: `ΠΕΡΑΣΕΣ ΤΟ ΜΑΘΗΜΑ ${subjectpassed} `,
        text: "good job!",
      };
    } else {
      mailOptions = {
        from: "private info",
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
