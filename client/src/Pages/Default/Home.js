import React from "react";
import Navigation from "../../Components/Navigation/Navigation";
import Infoform from "../../Components/InfoForm/Infoform";
import Textbox from "../../Components/Textbox/Textbox";
import Footer from "../../Components/Footer/Footer";
function Home() {
  return (
    <div>
      <Navigation />
      <Textbox />
      <Infoform />
      <Footer />
    </div>
  );
}

export default Home;
