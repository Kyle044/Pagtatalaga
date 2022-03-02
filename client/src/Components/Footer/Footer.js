import React from "react";
import "../Footer/footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <div class="footer-basic">
        <footer>
          <div class="social">
            <a href="https://www.facebook.com/PLSPOfficialFBPage/about/?ref=page_internal">
              <i class="icon ion-social-facebook"></i>
            </a>
          </div>
          <ul class="list-inline">
            <li class="list-inline-item">
              <a href="#">Scroll Up</a>
            </li>
            <li class="list-inline-item">
              <a href="https://www.google.com/maps/place/DLSP/@14.0633052,121.3397864,20z/data=!4m5!3m4!1s0x33bd5c8554956aaf:0x7b1213a951d955c!8m2!3d14.0633022!4d121.3398661">
                Address
              </a>
            </li>
            <li class="list-inline-item">
              <Link to="/About">Developers</Link>
            </li>
            <li>Contact: 09217631376</li>
          </ul>
          <p class="copyright">
            Pamantasan ng Lungsod ng San Pablos' Appointment © 2022
          </p>
        </footer>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
    </div>
  );
}

export default Footer;
