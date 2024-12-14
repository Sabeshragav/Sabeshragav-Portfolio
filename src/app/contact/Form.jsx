"use client";
import { addEnquiry, getEnquiryMessage } from "@/features/articleSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Form() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const message = useSelector(getEnquiryMessage);

  const handleInput = (e) => {
    e.preventDefault();
    setInputs((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEnquiry(inputs));
  };

  useEffect(() => {
    if (message) {
      setInputs({});
    }
  }, [message]);

  return (
    <form className="p-4 mt-10" onSubmit={handleSubmit}>
      <table className="border-separate border-spacing-y-4 w-full">
        <tbody>
          <tr>
            <td>
              <label className="text-2xl" htmlFor="name">
                Name :
              </label>
            </td>
            <td>
              <input
                onChange={handleInput}
                required
                value={inputs.name || ""}
                className="text-black rounded p-3 outline-none w-96"
                type="text"
                id="name"
                name="name"
              />
            </td>
          </tr>

          <tr>
            <td>
              <label className="text-2xl" htmlFor="email">
                Email :
              </label>
            </td>
            <td>
              <input
                required
                onChange={handleInput}
                value={inputs.email || ""}
                className="text-black rounded p-3 outline-none w-96"
                type="email"
                id="email"
                name="email"
              />
            </td>
          </tr>

          <tr>
            <td>
              <label className="text-2xl" htmlFor="message">
                Message :
              </label>
            </td>
            <td>
              <textarea
                required
                onChange={handleInput}
                value={inputs.message || ""}
                className="text-black rounded p-3 outline-none min-h-60 max-h-60"
                rows={5}
                cols={43}
                id="message"
                name="message"
              ></textarea>
            </td>
          </tr>

          <tr>
            <td>
              <button type="submit" className="border rounded-md p-2">
                Submit
              </button>
            </td>
            {message && <td>{message}</td>}
          </tr>
        </tbody>
      </table>
    </form>
  );
}
