import { useState } from "react";
import "../style/homePage.css";
import { NavLink } from "react-router-dom";
const HomePage = () => {
  return (
    <main>
      <section className="home-page">
        <h1>Välkommen!</h1>
        <div>
          <p>
            Jag har skapat denna sidan för att min vän ville ha tillgång till
            mina recept. Att skriva en bok va min första tanke.
          </p>

          <p>
            Men nu har jag kunskapen så att jag skapa en hemsida, där jag lätt
            kan uppdatera och lägga till nya saker.
          </p>
          <p>
            Jag vill uppmuntra alla som kommer till denna sidan att
            experimentera med mat, att förstå att de inte alltid behöver bli
            perfekt och att det inte behöver vara komplicerat eller dyrt för att
            smaka bra. Framför allt uppmuntrar jag er att ha kul!
          </p>
          <p>
            Starta en pod eller lite härlig musik, slappna av och STRESSA INTE!
          </p>
        </div>
        <NavLink className="unstyled-link" to={"/recipes"}>
          <button>Till Recepten</button>{" "}
        </NavLink>
      </section>
      {/* add a box with a few recipes  */}
    </main>
  );
};

export default HomePage;
