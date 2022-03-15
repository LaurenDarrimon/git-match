import React from "react";
import { useForm, ValidationError } from "@formspree/react";


export default function Form() {
  const [state, handleSubmit] = useForm("xzbogvlq");
  if (state.succeeded) {
    return (
      <p>Thanks for reaching out to the Git Match Team! We'll get back to you.  </p>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <br />
      <input
        id="name"
        name="name"
        className="form-control"
        required
      />
      <ValidationError prefix="Name" field="name" errors={state.errors} />
      <br />
      <br />

      <label htmlFor="email">Email Address:</label>
      <br />
      <input
        id="email"
        type="email"
        name="email"
        className="form-control"
        required
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <br />
      <br />

      <label htmlFor="message">Message:</label>
      <br />
      <textarea
        id="message"
        name="message"
        className="form-control"
        required
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <br />
      <br />

      <button
        type="submit"
        className="btn-primary btn gradient"
        disabled={state.submitting}
      >
        Submit
      </button>
    </form>
  );
}
