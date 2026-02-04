import nodemailer from 'nodemailer';

export default async function emailsend(subjectpassed,newSubjectPassed)
{

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'private mail@gmail.com',
        pass: 'private pass'
      }
    });
    
    let mailOptions;
   
      if(newSubjectPassed === true)
      {
        mailOptions = {
          from: 'private mail@gmail.com',
          to: 'private mail@gmail.com',
          subject: `ΠΕΡΑΣΕΣ ΤΟ ΜΑΘΗΜΑ ${subjectpassed} `,
          text: 'good job!'
        };
      }
      else
      {
        mailOptions = {
          from: 'private mail@gmail.com',
          to: 'private mail@gmail.com',
          subject: `ΔΕΝ ΕΧΕΙΣ ΠΕΡΑΣΕΙ ΚΑΠΟΙΟ ΜΑΘΗΜΑ. `,
          text: 'not so good job'
        };
      }
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}