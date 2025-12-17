"use client";

import React, { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  text: string;
};

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    text: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message =
          (data && (data.error || data.message)) || "Request failed";
        throw new Error(message);
      }

      setSuccess(true);
      setForm({ firstName: "", lastName: "", email: "", text: "" });
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2 className="page-title">Contact form</h2>
      </div>
      <form className="request-form" onSubmit={handleSubmit}>
        <div className="request-form__duo">
          <label className="request-form__field">
            <input
              type="text"
              name="firstName"
              placeholder="Voornaam"
              value={form.firstName}
              onChange={handleChange}
            />
          </label>
          <label className="request-form__field">
            <input
              type="text"
              name="lastName"
              placeholder="Achternaam"
              value={form.lastName}
              onChange={handleChange}
            />
          </label>
        </div>
        <label className="request-form__field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label className="request-form__field">
          <textarea
            name="text"
            placeholder="Text"
            rows={4}
            value={form.text}
            onChange={handleChange}
          ></textarea>
        </label>
        <button
          type="submit"
          className="request-form__submit"
          disabled={loading}
        >
          {loading ? "Versturen..." : "Versturen"}
        </button>

        {success && (
          <p style={{ color: "green", marginTop: 8 }}>Bericht verzonden.</p>
        )}

        {error && (
          <p style={{ color: "red", marginTop: 8 }} role="alert">
            {error}
          </p>
        )}
      </form>
    </>
  );
}
