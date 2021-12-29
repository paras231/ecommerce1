const nodeMailer = require("nodemailer");

const sendEmail = async()=>{

     const transporter = nodeMailer.createTransport({
         host:"smpt.gmail.com",
         port:SMPT_PORT,
         service:process.env.SMPT_SERVICE,
         auth:{
             user:process.env.SMPT_MAIL,
             pass:process.env.SMPT_PASSWORD
         }
     })

     const mailOptions = {
         from:process.env.SMPT_MAIL,
         to:optins.email,
         subject:options.subject,
         text:options.message
     }
     
    await  transporter.sendMail(mailOptions);
}
module.exports  = sendEmail;