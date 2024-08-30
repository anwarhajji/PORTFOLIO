'use server'

import emailjs from '@emailjs/nodejs';

export async function sendEmail(data) {
  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.NEXT_PUBLIC_EMAILJS_PRIVATE_KEY;

  try {
    await emailjs.send(serviceID, templateID, data, {
      publicKey: publicKey,
      privateKey: privateKey,
    });
    
    // You can add your Telegram notification logic here if needed
    
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: error.message };
  }
}