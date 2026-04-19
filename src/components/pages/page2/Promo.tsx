


const Promo=()=>{


    return <>
          <div
        className="profile-promo sbh_ad_show d-none col-12 d-md-flex col-md-6 col-lg-6 col-xl-8 flex-column justify-content-end"
        style={{ backgroundImage: 'url("https://ik.imagekit.io/sbhtechhub/show.jpg")', height: "100%" }}>
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
    </>
}

export default Promo;