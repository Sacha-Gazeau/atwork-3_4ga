"use client";

export default function Contact() {
  return (
    <>
      <h2>Contact form</h2>
      <form className="request-form">
        <label className="request-form__field">
          <input type="text" name="firstName" placeholder="Voornaam" />
        </label>
        <label className="request-form__field">
          <input type="text" name="lastName" placeholder="Achternaam" />
        </label>
        <label className="request-form__field">
          <input type="email" name="email" placeholder="Email" />
        </label>
        <label className="request-form__field">
          <textarea name="text" placeholder="Text"></textarea>
        </label>
        <button type="submit" className="request-form__submit">
          Versturen
        </button>
      </form>
    </>
  );
}
