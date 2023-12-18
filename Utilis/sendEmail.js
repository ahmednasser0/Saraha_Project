
import nodemailer from 'nodemailer';


async function sendEmail({to=[] , cc , bcc , subject , text , html , attachments=[]}={}) {
    const transporter = nodemailer.createTransport({
        service:"gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
        from: `"Ahmed Nasser 👻" <${process.env.EMAIL}>`, 
        to,
        cc,
        bcc,
        subject: "Hello ✔", 
        text, 
        html, 
        attachments
      });

      console.log(info);

      return info.rejected.length ? false : true

}




  export default sendEmail


