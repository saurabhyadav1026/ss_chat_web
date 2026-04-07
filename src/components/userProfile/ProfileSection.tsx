import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./user_profile_css.css";

const ProfileSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("myprofile");
  }, []);

  return (
    <div id="profile_section" className="profile-shell container-fluid col-12 d-flex p-0 m-0">
      <div id="profile_section_div2" className="profile-pane col-12 col-md-6 col-lg-6 col-xl-4 p-3">
        <Outlet />
      </div>

      <div
        className="profile-promo sbh_ad_show d-none col-12 d-md-flex col-md-6 col-lg-6 col-xl-8 flex-column justify-content-end"
        style={{ backgroundImage: 'url("https://ik.imagekit.io/sbhtechhub/show.jpg")', height: "100%" }}
      >
        <div className="profile-promo__content">
          <p className="profile-promo__eyebrow">Secret Secure</p>
          <h2 className="profile-promo__title">A calmer private chat experience.</h2>
          <p className="profile-promo__copy">
            Sign in, manage your profile, and move into conversations through a softer, more modern interface built around clarity.
          </p>

          <div className="profile-promo__stats">
            <div className="profile-promo__stat">
              <strong>Secure</strong>
              <span>Private-first feel</span>
            </div>
            <div className="profile-promo__stat">
              <strong>Fluid</strong>
              <span>Fast navigation</span>
            </div>
            <div className="profile-promo__stat">
              <strong>Fresh</strong>
              <span>Refined UI layer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
