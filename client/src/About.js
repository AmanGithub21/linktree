import "./css/About.css";

function About() {
  return (
    <div className="About">
      <h1 className="plain-text">About</h1>
      <article className="about-para">
        <p className="">
          Right now, every time you’ve got something new to share, you have to
          go to every single one of your channels to change the link in each of
          your bios. It’s time-consuming and complicated – making it so much
          harder to keep everything up to date.
        </p>
        <p className="">
          {" "}
          A link in bio tool means you never have to compromise, or remove one
          link from your bio so you can add another. You can keep everything you
          want to share online in one link. When you’ve got a change, you only
          ever have to make it once.
        </p>
        <br />
        <h2 className="d-inline-block">Meet the Developer - </h2>{" "}
        <a
          href="https://amangithub21.github.io/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <h2 className="d-inline-block text-decoration-underline">
            Aman Porwal <small class="fa-sharp fa-solid fa-link"></small>
          </h2>
        </a>
      </article>
    </div>
  );
}

export default About;
