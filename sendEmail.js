import nodemailer from 'nodemailer';

export default async function emailsend(subjectpassed,newSubjectPassed, email)
{

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: ''
      }
    });
    
    let mailOptions;
   
      if(newSubjectPassed === true)
      {
        mailOptions = {
          from: '@gmail.com',
          to: `${email}`,
          subject: `ΠΕΡΑΣΕΣ ΤΟ ΜΑΘΗΜΑ ${subjectpassed} `,
          text: 'good job!'
        };
      }
      else
      {
        mailOptions = {
          from: '@gmail.com',
          to: '@gmail.com',
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