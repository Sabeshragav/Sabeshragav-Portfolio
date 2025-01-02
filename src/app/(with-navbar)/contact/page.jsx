import React from "react";
import Form from "./Form";

export default function Contact() {
  return (
    <section className="h-screen">
      <div className="m-4 text-4xl flex">
        <h1 className="basis-auto border-b">Contact Us</h1>
      </div>
      <Form />
    </section>
  );
}
