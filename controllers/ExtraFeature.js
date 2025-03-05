const nodemailer = require("nodemailer");
require("dotenv").config();

// Secure email credentials via environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mdrezuanislamridoy@gmail.com",
    pass: "quxv thys odji jznq",
  },
});

// Business owner names and emails
const recipients = [
  { name: "Shahid h", email: "seowithus849@gmail.com" },
  { name: "Shahid e", email: "k73776833@gmail.com" },
  { name: "Shahid Khan", email: "kevinbrian43422@gmail.com" },
  { name: "Shahid hd", email: "edgarbpowers@gmail.com" },
  { name: "Shahid rr", email: "saom22015@gmail.com" },
  { name: "Shahid mia", email: "alish.itservice67@gmail.com" },
  { name: "Shahid ue", email: "thomas.itservice79@gmail.com" },
  { name: "Shahid Rid", email: "kevin.itservice67@gmail.com" },
  { name: "Shahid kdjf", email: "travis.itservice@gmail.com" },
  { name: "Shahid kdjf", email: "itzking.rk@gmail.com" },
];

// Send emails
recipients.forEach(({ name, email }) => {
  const message = `
Dear ${name},  

I hope you're doing well. Many businesses provide excellent services but struggle to get customer reviews, which impacts their ranking and credibility. We can help you gain authentic reviews and followers to establish your business more effectively.  

Our Services:  
- Google Reviews  
- Trustpilot, Viator, Yelp, HomeAdvisor, Houzz, BBB Reviews  
- Tripadvisor, Safari Booking Reviews  
- Facebook Reviews & Followers  
- Facebook & Google Ads  
- Reputation Management (Removing Negative Reviews)  
- Instagram Growth Services  

If you're interested, feel free to connect with me at WhatsApp +8801735699781 or reply to this email. Let’s discuss how we can enhance your online presence.  

Best regards,  
Md. Ridoy Babu
`;

  const mailOptions = {
    from: "mdrezuanislamridoy@gmail.com",
    to: email,
    subject: "Boost Your Business with Authentic Reviews & Engagement",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Error sending to ${email}:`, error);
    } else {
      console.log(`Email sent successfully to ${email}:`, info.response);
    }
  });
});
