import nodemailer from "nodemailer";

export default async function emailsend(
  subjectpassed,
  newSubjectPassed,
  email
) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "private info",
      pass: "private info ",
    },
  });

  let mailOptions;

  if (newSubjectPassed === true) {
    mailOptions = {
      from: "private info ",
      to: `${email}`,
      subject: `ΠΕΡΑΣΕΣ ΤΟ ΜΑΘΗΜΑ ${subjectpassed} `,
      text: "good job!",
    };
  } else {
    mailOptions = {
      from: "private info ",
      to: `${email}`,
      subject: `ΔΕΝ ΕΧΕΙΣ ΠΕΡΑΣΕΙ ΚΑΠΟΙΟ ΜΑΘΗΜΑ. `,
      text: "not so good job",
    };
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
