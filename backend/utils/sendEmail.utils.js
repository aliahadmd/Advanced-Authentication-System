import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

const sendEmail = async (
    subject,
    send_to,
    sent_from,
    reply_to,
    template,
    name,
    link
) => {
// Create an email transporter using nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "",
    port: Number(process.env.EMAIL_PORT || ""),
    secure: Boolean(process.env.EMAIL_SECURE),
    auth: {
      user: process.env.EMAIL_USER ||"",
      pass: process.env.EMAIL_PASS || "",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  
  // Define handlebars options for email templates
  const handlearOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  };

   // Use handlebars for email template compilation
   transporter.use("compile", hbs(handlearOptions));

   // Define options for sending the email
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject,
    template,
    context: {
      name,
      link,
    },
  };

   // Send the email
   transporter.sendMail(options, function (err, info) {
    if (err) {
      // Log any errors
      console.log(err);
    } else {
      // Log the response from the email server
      console.log(info);
    }
  });
};

// Export the sendEmail function
export default sendEmail;


//This code is for a function that sends an email using nodemailer and handlebars for email templates. The function takes an object as an argument that contains the details of the email to be sent. The function then creates an email transporter, defines the handlebars options, and sends the email.