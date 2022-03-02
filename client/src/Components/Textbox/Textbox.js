import React from "react";
import "./textbox.css";

function Textbox() {
  return (
    <div className="text-box">
      <img src="img/books.png" />
      <h1 className="text-black font-semibold	">
        Pamantasan ng Lungsod ng San Pablos' Pagtatalaga{" "}
      </h1>
      <h4 class="text-center font-bold	text-black pb-5	">
        Website that can set Appointment through Modern Technology
      </h4>
      <a
        href="https://www.facebook.com/PLSPOfficialFBPage/about/?ref=page_internal"
        className="hero-btn"
      >
        Visit our Official Facebook Page
      </a>
    </div>
  );
}

export default Textbox;
