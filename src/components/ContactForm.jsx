"use client";

import { Check, Info } from "lucide-react";
import { getToken, getUserSession, storeUserSession } from "@services/storage";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserLoading } from "@features/sessionSlice";
import {
  addEnquiry,
  getEnquiryError,
  getEnquiryStatus,
  setEnquiryError,
} from "@features/articleSlice";
import { usePathname } from "next/navigation";
import Loader from "./Loader";
import axios from "axios";

export default function ContactForm() {
  const { data: session } = useSession();
  const [localSession, setLocalSession] = useState(
    () => getUserSession() || null
  );

  // useEffect(() => {
  //   console.log(localSession);
  // }, [localSession]);

  const pathName = usePathname();

  const dispatch = useDispatch();

  const user = useSelector(getUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/protected`,
          {
            withCredentials: true,
          }
        );

        // console.log(response.data);
        setLocalSession(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const token = getToken();
    if (token?.length > 1) fetchData();
  }, []);

  const userLoading = useSelector(getUserLoading);
  const enquiryStatus = useSelector(getEnquiryStatus);
  const enquiryError = useSelector(getEnquiryError);

  const [message, setMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // If local session doesn't exist and session from NextAuth is available, store it locally
    if (!localSession?.name && session?.user) {
      storeUserSession(session);
      setLocalSession(session);
    }
  }, [session, localSession]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!userLoading) setIsLoaded(true);
  });

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  const containsLetters = (str) => /[a-zA-Z]/.test(str);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setEnquiryError(null));
    if (message.trim() && containsLetters(message.trim())) {
      const enquiry = {
        name: user?.username || localSession?.user?.username,
        email: user?.email || localSession?.user?.email,
        message: message.trim(),
      };

      dispatch(addEnquiry(enquiry));
    } else {
      dispatch(setEnquiryError("Enter a valid message"));
    }
  };

  if (!localSession?.user) {
    return (
      <section className="min-h-[700px] flex-center">
        <div className="max-w-md mx-7 sm:mx-auto p-6 rounded-lg shadow-md bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-5">
              To contact you'll need to login
            </h2>
            <p className="text-white text-base">
              Please{" "}
              <a
                href={`/login?path=${pathName}`}
                className="text-blue-500 underline hover:text-blue-700"
              >
                log in
              </a>{" "}
              or{" "}
              <a
                href={`/signup?path=${pathName}`}
                className="text-blue-500 underline hover:text-blue-700"
              >
                sign up
              </a>{" "}
              to access this contact section.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[700px] max-w-6xl mx-7 sm:mx-auto">
      <div className="m-4 text-4xl flex">
        <h1 className="basis-auto font-bold">Contact Me</h1>
      </div>
      <section className="max-w-md mx-auto p-6 rounded-lg shadow-md bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg ">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-white">How can I help?</h1>
          <p className="text-white mt-6 flex-center gap-2">
            <span>Please note: Only one message is allowed per user.</span>
            <button
              type="button"
              onClick={() => {
                if (!showInfo) {
                  setShowInfo(true);
                  setTimeout(() => {
                    setShowInfo(false);
                  }, 3000);
                }
              }}
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
              title="More Info"
            >
              <Info className="w-5 h-5" />
            </button>
          </p>

          {showInfo && (
            <p className="text-sm text-blue-700 mt-2">
              This helps minimize spam messages.
            </p>
          )}
        </div>

        <form onSubmit={handleFormSubmit}>
          {enquiryStatus === "fulfilled" && (
            <p className="mb-4 flex items-center gap-2 text-sm text-green-600">
              <Check className="w-4 h-4" />
              Your message has been sent. Thank you.
            </p>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium`}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="loading..."
                readOnly
                value={
                  user?.username || localSession?.user?.username || "loading..."
                }
                aria-errormessage="error-name"
                className="text-gray-500 bg-gray-800 border border-gray-700 mt-1 w-full rounded-md p-2 cursor-not-allowed outline-none"
                onFocus={(e) => e.target.blur()}
              />
            </div>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium`}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="loading..."
                readOnly
                value={user?.email || localSession?.user?.email || "loading..."}
                aria-errormessage="error-email"
                className={`text-gray-500 bg-gray-800 border border-gray-700 mt-1 w-full rounded-md cursor-not-allowed outline-none p-2`}
                onFocus={(e) => e.target.blur()}
              />
            </div>
            <div>
              <label htmlFor="message" className={`block text-sm font-medium`}>
                Message{" "}
                {(user === null ? false : !user?.contactStatus) ||
                (localSession === undefined
                  ? !localSession?.user?.contactStatus
                  : false) ||
                enquiryStatus === "pending" ||
                enquiryStatus === "fulfilled" ? (
                  <></>
                ) : (
                  <span aria-hidden="true">*</span>
                )}
              </label>
              <textarea
                id="message"
                name="message"
                placeholder={
                  (user === null ? false : !user?.contactStatus) ||
                  (localSession === undefined
                    ? !localSession?.user?.contactStatus
                    : false) ||
                  enquiryStatus === "pending" ||
                  enquiryStatus === "fulfilled"
                    ? "Your message has already been sent."
                    : "Type your message here..."
                }
                required
                value={
                  enquiryStatus === "fulfilled"
                    ? "Your message has already been sent."
                    : message
                }
                disabled={
                  (user === null ? false : !user?.contactStatus) ||
                  (localSession === undefined
                    ? !localSession?.user?.contactStatus
                    : false) ||
                  enquiryStatus === "pending" ||
                  enquiryStatus === "fulfilled"
                }
                aria-errormessage="error-message"
                onChange={(e) => setMessage(e.target.value)}
                className={` mt-1 w-full rounded-md border border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none p-2 h-24 resize-none ${
                  (user === null ? false : !user?.contactStatus) ||
                  (localSession === undefined
                    ? !localSession?.user?.contactStatus
                    : false) ||
                  enquiryStatus === "pending" ||
                  enquiryStatus === "fulfilled"
                    ? "opacity-50 cursor-not-allowed bg-gray-800 text-gray-500"
                    : "text-black"
                }`}
              />
              {enquiryError && (
                <p id="error-message" className="mt-1 text-sm text-red-600">
                  {enquiryError}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={
                (user === null ? false : !user?.contactStatus) ||
                (localSession === undefined
                  ? !localSession?.user?.contactStatus
                  : false) ||
                enquiryStatus === "pending" ||
                enquiryStatus === "fulfilled"
              }
              className={`w-full rounded-md bg-blue-600 py-2 text-white font-medium transition ${
                (user === null ? false : !user?.contactStatus) ||
                (localSession === undefined
                  ? !localSession?.user?.contactStatus
                  : false) ||
                enquiryStatus === "pending" ||
                enquiryStatus === "fulfilled"
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {enquiryStatus === "pending" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
