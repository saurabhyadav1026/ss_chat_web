import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const Register = () => {
  const [isUsernameAvailble, setIsAvailbleUsername] = useState(false);
  const [OTP, setotp]: any = useState({ otp_code: null, otp: null });
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [otpDivVisibility, setOtpDivVisibility] = useState(false);
  const [User, setUser] = useState({ name: "", username: "", userpassword: "", confirm_password: "", email: "" });
  const navigate = useNavigate();

  const updateUser = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...User, [name]: value });
  };

  const sendOtp = async () => {
    if (!isUsernameAvailble) {
      alert("Username is not availble. Try other username.");
      return;
    }
    if (User.userpassword !== User.confirm_password) {
      alert("password missmatch");
      return;
    }

    const newOtp: any = (await api.get("/getotp", { params: { email: User.email } })).data || { status: "nt" };

    if (newOtp.status === "ok") {
      setIsReadOnly(true);
      alert(`We have send the otp on your register contact. otp code is : ${newOtp.otp_code}`);
      setotp(newOtp);
      setOtpDivVisibility(true);
    } else {
      alert(newOtp.status);
    }
  };

  const resendOtp = async () => {
    const newOtp: any = (await api.get("/getotp", { params: { email: User.email } })).data || { status: "nt" };
    if (newOtp.status === "ok") {
      alert(`We have resend the otp on your register contact. otp code is : ${newOtp.otp_code}`);
      setotp(newOtp);
    } else {
      alert(newOtp.status);
    }
  };

  const edit = () => {
    (document.getElementById("otp_input") as HTMLInputElement).value = "";
    setOtpDivVisibility(true);
    setIsReadOnly(false);
  };

  const addUser = async () => {
    try {
      const user = {
        name: User.name,
        username: User.username,
        password: User.userpassword,
        email: User.email,
      };
      await api.post("/newuser", user);
    } catch (error) {
      console.log(`eror  ${error}`);
    }
  };

  const verifyRegisterDetail = async () => {
    const otpInput = document.getElementById("otp_input") as HTMLInputElement;
    const otp: any = otpInput.value;
    otpInput.value = "";

    if (OTP.otp.toString() !== otp) {
      alert("Enter correct OTP  ");
      return;
    }

    await addUser();
    alert("register successfully");
    navigate("/user/login");
  };

  const checkUsername = () => {
    if (User.username.trim() === "") setIsAvailbleUsername(false);
    else {
      api
        .get("/isuseravailble", { params: { username: User.username } })
        .then((res) => setIsAvailbleUsername(res.data.status))
        .catch((err: any) => alert(err));
    }
  };

  const OtpDiv = () => {
    return (
      <div className="auth-otp">
        <label className="auth-field">
          <span className="auth-label">Enter OTP</span>
          <input type="number" className="auth-input" id="otp_input" required />
        </label>

        <div className="auth-inline">
          <button className="auth-button auth-button--primary" id="otp_verify_btn" onClick={verifyRegisterDetail}>
            Complete Registration
          </button>
          <button className="auth-button auth-button--secondary" onClick={resendOtp}>
            Resend OTP
          </button>
        </div>

        <div className="auth-helper">
          Need to edit your email?
          <span className="auth-link" onClick={edit}> Update it first</span>
        </div>
      </div>
    );
  };

  return (
    <div className="auth-card">
      <div className="app_logo auth-logo" />

      <div className="auth-header">
        <p className="auth-eyebrow">Create account</p>
        <h2 className="auth-title">Register</h2>
        <p className="auth-subtitle">Set up your profile details and verify the account with OTP before entering the app.</p>
      </div>

      <div className="auth-form">
        <label className="auth-field">
          <span className="auth-label">Name</span>
          <input className="auth-input" name="name" onChange={updateUser} readOnly={isReadOnly} value={User.name} required />
        </label>

        <label className="auth-field">
          <span className="auth-label">Username</span>
          <input className="auth-input" name="username" onKeyUp={checkUsername} onChange={updateUser} readOnly={isReadOnly} value={User.username} required />
          <UserNameAvailble value={isUsernameAvailble} />
        </label>

        <label className="auth-field">
          <span className="auth-label">Password</span>
          <input className="auth-input" name="userpassword" onChange={updateUser} readOnly={isReadOnly} type="password" value={User.userpassword} required />
        </label>

        <label className="auth-field">
          <span className="auth-label">Confirm Password</span>
          <input className="auth-input" name="confirm_password" onChange={updateUser} readOnly={isReadOnly} type="password" value={User.confirm_password} required />
        </label>

        <label className="auth-field">
          <span className="auth-label">Email</span>
          <input className="auth-input" name="email" onChange={updateUser} readOnly={isReadOnly} value={User.email} type="email" required />
        </label>

        <button className="auth-button auth-button--primary" onClick={sendOtp}>
          Send OTP
        </button>

        {otpDivVisibility ? <OtpDiv /> : null}
      </div>

      <div className="auth-link-row">
        Already have an account?
        <span className="auth-link" onClick={() => navigate("/user/login")}> Sign in</span>
      </div>
    </div>
  );
};

export default Register;

const UserNameAvailble = (props: any) => {
  if (props.value) return <span id="username_availble_status" className="auth-status auth-status--ok">Username available</span>;
  return <span id="username_availble_status" className="auth-status auth-status--bad">Username not available</span>;
};
