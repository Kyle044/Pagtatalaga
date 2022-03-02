import React from "react";
import { Link } from "react-router-dom";
import "../Default/about.css";
import Footer from "../../Components/Footer/Footer";
function About() {
  return (
    <div>
      <div className="backg">
        <nav>
          <Link to="/">
            <img src="img/mergedlogo.png" height={170} />
          </Link>
          <div className="conttwo">
            <label for="toggle">&#9776;</label>

            <input type="checkbox" id="toggle" />
            <div className="navlinks">
              <ul>
                <Link to="/">
                  <li className="li">
                    <div className="text-2xl text-white	">HOME</div>
                  </li>
                </Link>
                <Link to="/About">
                  <li className="li">
                    <div className="text-2xl text-white	">ABOUT</div>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </nav>
        {/* Aboutinfo */}

        <div
          className="text-5xl  h15	max-w-xs mx-auto	mt-10 text-zinc-50		
        animate-bounce	bg-gradient-to-r from-sky-500 to-indigo-500
        not-italic tracking-wide items-center	px-0.5	py-0.5 
        rounded-xl text-center 	"
        >
          <h1>About us</h1>
        </div>
        <div class="cont pt-10 pb-20">
          <div className="simg 	pt-5 pb-5	">
            <h1 className="texth">
              <a href="https://www.facebook.com/PLSPOfficialFBPage">
                Pamantasan ng Lungsod ng San Pablo
              </a>
            </h1>
            <h2 className="	textb">
              <br />
              Dalubhasaan ng Lungsod ng San Pablo is currently located at
              Alvarez Street, Barangay San Jose (Malamig), San Pablo City,
              Laguna, Philippines. It was established on 1997 with only 7
              programs available and was headed by Dr. Josefina V. Pampolina as
              their acting president. <br />
              <br /> Recently DLSP became Pamantasan ng Lungsod ng San Pablo
              last December 10, 2021 As of today, the institution has 16
              programs offered under different colleges such as College of
              Accountancy and Entrepreneurship, College of Arts and Sciences,
              College of Business and Hotel Management, College of Computer
              Studies and Technology, College of Teacher Education and College
              of Engineering.
            </h2>
          </div>

          <div className="mvimg 	pt-5 pb-5	">
            <br />
            <br />
            <br />
            <h1 className="texth">Mission</h1>
            <h2 className="	textb">
              {" "}
              To provide well-balanced and relevant educational program
              fortified with strong Filipino values and ideals
            </h2>
            <br />
            <br />
            <h1 className="texth">Vision</h1>
            <h2 className="	textb">
              {" "}
              A University producing competent and competitive graduates
            </h2>
          </div>
        </div>
        <div
          className="text-5xl  h15	max-w-xs	m-auto text-zinc-50		
          animate-bounce bg-gradient-to-r from-sky-500 to-indigo-500
        not-italic tracking-wide items-center	px-0.5	py-0.5 
        rounded-xl text-center	"
        >
          <h1>Developers</h1>
        </div>
        <div className="cont2">
          <div>
            <h1 className="d1 cursor-pointer">
              <p className="texth">
                {" "}
                <br />
                <a href="https://www.facebook.com/aydallacenica">
                  Cenica Nuñez Aydalla
                </a>{" "}
              </p>
              <p className="textb">
                Gender: Female <br />
                Course: Bachelor of Science in Computer Engineering <br />
                Age: 22 <br />
                Cp no.: 09063230835 <br />
                School: Pamantasan ng Lungsod ng San Pablo
              </p>
            </h1>
          </div>
          <div>
            <h1 className="d2 cursor-pointer">
              <p className="texth">
                {" "}
                <br />
                <a href="https://www.facebook.com/profile.php?id=100007936026248">
                  Trisha Figurado Lugares
                </a>{" "}
              </p>
              <p className="textb">
                Gender: Female <br />
                Course: Bachelor of Science in Computer Engineering <br />
                Age: 22 <br />
                Cp no.: 09122429172 <br />
                School: Pamantasan ng Lungsod ng San Pablo
              </p>
            </h1>
          </div>
          <div>
            <h1 className="d3 cursor-pointer">
              <p className="texth">
                {" "}
                <br />{" "}
                <a href="https://www.facebook.com/jessamel.malaluan.5">
                  Jessa Mel Malaluan
                </a>{" "}
              </p>
              <p className="textb">
                Gender: Female <br />
                Course: Bachelor of Science in Computer Engineering <br />
                Age: 22 <br />
                Cp no.: 09217631376 <br />
                School: Pamantasan ng Lungsod ng San Pablo
              </p>
            </h1>
          </div>
        </div>
        <div className="cont3">
          <div>
            <h1 className="d4 cursor-pointer">
              <p className="texth">
                {" "}
                <br />
                <a href="https://www.facebook.com/christianbenedict.flores">
                  Christian Benedict Flores
                </a>{" "}
              </p>
              <p className="textb">
                Gender: Male
                <br />
                Course: Bachelor of Science in Computer Engineering
                <br />
                Age: 22 <br />
                Cp no.: 09384449297 <br />
                School: Pamantasan ng Lungsod ng San Pablo
              </p>
            </h1>
          </div>
          <div>
            <h1 className="d5 cursor-pointer">
              <p className="texth">
                {" "}
                <br />
                <a href="https://www.facebook.com/nathaniel.asegurado">
                  Nathaniel Asegurado
                </a>{" "}
              </p>
              <p className="textb">
                Gender: Male
                <br />
                Course: Bachelor of Science in Computer Engineering
                <br />
                Age: 22 <br />
                Cp no.: 09668099675 <br />
                School: Pamantasan ng Lungsod ng San Pablo
              </p>
            </h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
