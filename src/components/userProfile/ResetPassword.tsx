import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import useBinaryState from "../../hook/states/useBinaryState";
import { CloseEyeIcon, OpenEyeIcon } from "../icons";

const ResetPassword = () => {
  const [resetPasswordInput, setResetPasswordInput]: any = useState("");
  const [resetConfirmPasswordInput, setResetConfirmPasswordInput]: any = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (!token) navigate("/");
    else {
      api
        .get("/logging/verifyresetpasswordlink", { headers: { Authorization: `bearer ${token}` } })
        .then((res) => {
          if (!res.data.status) navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  const setPassword = async () => {
    if (resetPasswordInput !== resetConfirmPasswordInput) {
      alert("password not match.");
      return;
    }
    api
      .get("logging/setpassword", { params: { password: resetPasswordInput }, headers: { Authorization: `bearer ${token}` } })
      .then(() => {
        alert("Password change successfully.");
        navigate("/user");
      })
      .catch((err: any) => {
        console.log(err);
        alert("Error");
        navigate("/user");
      });
  };

  const [p_eye, set_p_eye] = useBinaryState("password", "text");
  const [p_eye2, set_p_eye2] = useBinaryState("password", "text");

  return (
    <div className="auth-card">
      <div className="app_logo auth-logo" style={{ height: "68px", width: "68px" }} />

      <div className="auth-header">
        <p className="auth-eyebrow">Secure access</p>
        <h3 className="auth-title">Reset Password</h3>
        <p className="auth-subtitle">Choose a new password and confirm it before returning to the app.</p>
      </div>

      <div className="auth-form">
        <label className="auth-field">
          <span className="auth-label">New Password</span>
          <div className="password-field">
            <input className="auth-input" value={resetPasswordInput} onChange={(e) => setResetPasswordInput(e.target.value)} placeholder="New password" type={p_eye} />
            <div className="password-toggle">{p_eye === "password" ? <CloseEyeIcon func={set_p_eye} /> : <OpenEyeIcon func={set_p_eye} />}</div>
          </div>
        </label>

        <label className="auth-field">
          <span className="auth-label">Confirm Password</span>
          <div className="password-field">
            <input
              className="auth-input"
              value={resetConfirmPasswordInput}
              onChange={(e) => setResetConfirmPasswordInput(e.target.value)}
              placeholder="Confirm new password"
              type={p_eye2}
            />
            <div className="password-toggle">{p_eye2 === "password" ? <CloseEyeIcon func={set_p_eye2} /> : <OpenEyeIcon func={set_p_eye2} />}</div>
          </div>
        </label>

        <button className="auth-button auth-button--primary" onClick={setPassword}>
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
