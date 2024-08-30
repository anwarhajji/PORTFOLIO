"use client";

import { useState } from 'react';
import { TbMailForward } from "react-icons/tb";
import { toast } from 'react-toastify';
import { isValidEmail } from '@/utils/check-email';
import { sendEmail } from './actions';

export default function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    message: '',
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError((prev) => ({ ...prev, required: false }));
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name) {
      setError((prev) => ({ ...prev, required: true }));
      return;
    } else if (error.email) {
      return;
    }

    try {
      const result = await sendEmail(userInput);
      if (result.success) {
        toast.success('Message sent successfully!');
        setUserInput({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to send message');
    }
  };

  return (
    <div className="">
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
        Contact with me
      </p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">
          {"If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."}
        </p>
        <form onSubmit={handleSendMail} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-base">Your Name: </label>
            <input
              id="name"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="text"
              maxLength="100"
              required
              onChange={(e) => setUserInput((prev) => ({ ...prev, name: e.target.value }))}
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-base">Your Email: </label>
            <input
              id="email"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="email"
              maxLength="100"
              required
              value={userInput.email}
              onChange={(e) => setUserInput((prev) => ({ ...prev, email: e.target.value }))}
              onBlur={() => {
                checkRequired();
                setError((prev) => ({ ...prev, email: !isValidEmail(userInput.email) }));
              }}
            />
            {error.email && <p className="text-sm text-red-400">Please provide a valid email!</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-base">Your Message: </label>
            <textarea
              id="message"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              maxLength="500"
              required
              onChange={(e) => setUserInput((prev) => ({ ...prev, message: e.target.value }))}
              onBlur={checkRequired}
              rows="4"
              value={userInput.message}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            {error.required && (
              <p className="text-sm text-red-400">
                Email and Message are required!
              </p>
            )}
            <button
              type="submit"
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
            >
              <span>Send Message</span>
              <TbMailForward className="mt-1" size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}