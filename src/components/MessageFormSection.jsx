import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import "./formSection.css";

function normalizePhone(v) {
  // keep only digits
  return String(v || "").replace(/[^\d]/g, "");
}

function isValidEmail(email) {
  // simple + reliable email check
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || "").trim());
}

function isValidPhone(phone) {
  // Accept 10 digits (India typical) OR 10-15 digits (international)
  const p = String(phone || "").trim();
  return /^\d{10,15}$/.test(p);
}

export default function MessageFormSection({ data }) {
  const initial = useMemo(
    () => ({ name: "", phone: "", email: "", message: "" }),
    []
  );

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((s) => ({
      ...s,
      [name]: name === "phone" ? normalizePhone(value) : value,
    }));
  };

  const validate = () => {
    const next = {};

    // Name
    if (!values.name.trim()) next.name = "Name is required.";
    else if (values.name.trim().length < 2) next.name = "Enter a valid name.";

    // Phone (required)
    if (!values.phone.trim()) next.phone = "Phone number is required.";
    else if (!isValidPhone(values.phone)) next.phone = "Enter a valid phone number (10 to 15 digits).";

    // Email (required)
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(values.email)) next.email = "Enter a valid email address.";

    // Message
    if (!values.message.trim()) next.message = "Message is required.";
    else if (values.message.trim().length < 5) next.message = "Message is too short.";

    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      toast.error("Please correct the highlighted fields.");
      return;
    }

    setStatus("submitting");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.log("Missing EmailJS env:", { serviceId, templateId, publicKey });
      toast.error("Email is not configured. Check your .env and restart server.");
      setStatus("idle");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name.trim(),
          phone: values.phone.trim(),
          reply_to: values.email.trim(),
          message: values.message.trim(),
          created_at: new Date().toISOString(),
        },
        { publicKey }
      );

      toast.success("Message sent successfully!");
      setValues(initial);
      setErrors({});
    } catch (err) {
      console.log("EmailJS error:", err);
      console.log("status:", err?.status);
      console.log("text:", err?.text);
      toast.error(err?.text || "Failed to send. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <section className="formWrap" id="message">
      <div className="formInner">
        <div className="formHead">
          <div className="formEyebrow">{data.eyebrow}</div>
          <h2 className="formTitle">{data.title}</h2>
          <div className="formSub">{data.subtitle}</div>
        </div>

        <form className="formCard" onSubmit={onSubmit} noValidate>
          <div className="grid">
            <div className="field">
              <label>{data.fields.nameLabel}</label>
              <input
                name="name"
                value={values.name}
                onChange={onChange}
                placeholder="Enter your name"
                autoComplete="name"
              />
              {errors.name ? <div className="err">{errors.name}</div> : null}
            </div>

            <div className="field">
              <label>{data.fields.phoneLabel}</label>
              <input
                name="phone"
                value={values.phone}
                onChange={onChange}
                placeholder="Enter phone number"
                inputMode="numeric"
                autoComplete="tel"
              />
              {errors.phone ? <div className="err">{errors.phone}</div> : null}
            </div>

            <div className="field full">
              <label>{data.fields.emailLabel}</label>
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={onChange}
                placeholder="Enter email"
                autoComplete="email"
              />
              {errors.email ? <div className="err">{errors.email}</div> : null}
            </div>

            <div className="field full">
              <label>{data.fields.messageLabel}</label>
              <textarea
                name="message"
                rows="5"
                value={values.message}
                onChange={onChange}
                placeholder="Write your message..."
              />
              {errors.message ? <div className="err">{errors.message}</div> : null}
            </div>
          </div>

          <div className="actions">
            <button
              className="submitBtn"
              type="submit"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "SENDING..." : data.submitText}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}