import { useState } from "react";
import api from "../../api/api";

const ForgetPassword = () => {
  const [emailId, setEamailId] = useState("");

  const sendPasswordResetLink = () => {
    if (emailId.trim().length > 0)
      api
        .get("/logging/forgetpassword", { params: { email: emailId } })
        .then((res) => {
          if (res.data.status) alert("The password reset link had send to you . Check your mail");
          else alert("invalid email or not registered, try again with valid mail.");
        })
        .catch((err: any) => {
          console.log(err);
          alert("invalid email or not registered, try again with valid mail.");
        });
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <p className="auth-eyebrow">Password help</p>
        <h3 className="auth-title">Reset Password</h3>
        <p className="auth-subtitle">Enter your email address and we will trigger the existing password reset flow.</p>
      </div>

      <div id="forget_mail_input_div" className="auth-form">
        <label className="auth-field">
          <span className="auth-label">Email address</span>
          <input className="auth-input" typeof="email" onChange={(e) => setEamailId(e.target.value)} placeholder="Enter your email" type="email" />
        </label>

        <button className="auth-button auth-button--primary" onClick={sendPasswordResetLink}>
          Send reset link
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
