import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import KiaNModel from "../components/model";

function IndexPage() {
  const [sds, setSds] = useState(true);

  const NavList = [
    {
      name: "Home",
    },
    {
      name: "About",
    },
    {
      name: "Skills",
    },
  ];

  const whatItems = [
    {
      name: "Software Development",
      desc: `Software Development is the process of creating and maintaining
      computer programs using programming languages and development
      tools.`,
      img: {
        src: "/assets/img/icons/software.png",
        alt: "phone call",
      },
    },
    {
      name: "App Development",
      desc: `App Development refers to the creation and modification of
      software applications for mobile devices and other platforms.`,
      img: {
        src: "/assets/img/icons/mobile-app.png",
        alt: "phone call",
      },
    },
    {
      name: "Consultation",
      desc: `Consultation is the process of providing expert advice and
      guidance on a specific topic or problem to individuals or
      organizations.`,
      img: {
        src: "/assets/img/icons/brainstorming.png",
        alt: "phone call",
      },
    },
    {
      name: "UI/UX Design",
      desc: `UI/UX Design focuses on creating visually appealing and
      user-friendly interfaces for digital products, engaging user experience.`,
      img: {
        src: "/assets/img/icons/programming.png",
        alt: "phone call",
      },
    },
  ];

  const infoList = [
    {
      name: "Age:",
      yourInfo: "15",
    },
    {
      name: "Job:",
      yourInfo: "Programmer",
    },
    {
      name: "Work Experience:",
      yourInfo: "4 Years",
    },
    {
      name: "Residence:",
      yourInfo: "Iran. Karaj",
    },
  ];

  const skillsList = [
    {
      name: "HTML , CSS",
      percent: "100%",
    },
    {
      name: "JavaScript",
      percent: "90%",
    },
    {
      name: "Lua",
      percent: "100%",
    },
    {
      name: "MongoDB",
      percent: "60%",
    },
    {
      name: "MySql",
      percent: "100%",
    },
    {
      name: "React",
      percent: "40%",
    },
    {
      name: "Threejs",
      percent: "60%",
    },
    {
      name: "NodeJS",
      percent: "100%",
    },
    {
      name: "VueJs",
      percent: "30%",
    },
  ];

  const typeWriter = useCallback(() => {
    let i = 0;
    let i2 = 0;
    const txts = ["Developer", "Designer"]; /* The text */
    const speed = 50; /* The speed/duration of the effect in milliseconds */

    function typeWriterHelper() {
      const writerElement = document.getElementById("writer");
      if (i < txts[i2].length && writerElement) {
        writerElement.innerHTML += txts[i2].charAt(i);
        i++;
        setTimeout(typeWriterHelper, speed);
      } else {
        setTimeout(deleteText, speed * 20);
      }
    }

    function deleteText() {
      const writerElement = document.getElementById("writer");
      if (i > 0 && writerElement) {
        const currentText = writerElement.innerHTML;
        writerElement.innerHTML = currentText.slice(0, -1);
        i--;
        setTimeout(deleteText, speed);
      } else {
        i2++;
        if (i2 >= txts.length) {
          i2 = 0;
        }
        setTimeout(typeWriterHelper, speed);
      }
    }

    typeWriterHelper();
  }, []);

  useEffect(() => {
    const handleThemeSwitch = () => {
      const currentTheme =
        document.documentElement.getAttribute("data-bs-theme");
      if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-bs-theme", "light");
      } else {
        document.documentElement.setAttribute("data-bs-theme", "dark");
      }
    };

    if (sds === true) {
      typeWriter();
      setSds(false);
    }

    document
      .getElementById("btnSwitch")
      ?.addEventListener("click", handleThemeSwitch);

    return () => {
      document
        .getElementById("btnSwitch")
        ?.removeEventListener("click", handleThemeSwitch);
    };
  }, [sds, typeWriter]);

  return (
    <div className="d-flex">
      <div className="container">
        <div
          className="row header justify-content-center align-items-center"
          style={{ marginTop: "1%" }}
        >
          <span className="col d-none d-md-block float-left">KiaN</span>
          <div className="col text-center">
            <ul>
              {NavList.map((item, index) => (
                <a key={index} href={`#${item.name}`}>
                  <li>{item.name}</li>
                </a>
              ))}
            </ul>
          </div>
          <div className="col text-center text-md-end">
            <ul>
              <a href="https://www.youtube.com/channel/UCjB9cPJd7nEFQdzHg47jT6w">
                <li>
                  <FontAwesomeIcon icon={faYoutube} />
                </li>
              </a>
              <a href="https://discord.gg/qGgZayyPJe">
                <li>
                  <FontAwesomeIcon icon={faDiscord} />
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div id="Home" className="row" style={{ marginTop: "2.5%" }}>
          <div className="col-12 col-md-6 body-left">
            <span style={{ fontSize: "25pt" }}>Hello</span> <br />
            <span>
              I&apos;m <span className="rgbtext" id="writer"></span>
            </span>{" "}
            <br />
            <p style={{ fontSize: "medium" }}>
              🌟 Welcome to my personal website! I&apos;m Kian Rabiei, a
              15-year-old programmer specializing in JavaScript. 💻 With four
              years of experience, I create computer, mobile, and web
              applications. 🚀 Join me on my coding journey as we explore new
              technologies and build innovative solutions. Feel free to browse
              my projects and reach out for inquiries or collaborations. Happy
              coding with Kian Rabiei! 🌈
            </p>
          </div>
          <div className="col-12 col-md-6 body-right" style={{ height: 500 }}>
            <KiaNModel></KiaNModel>
            {/* <Image
              src="/assets/img/Untitled-1.png"
              width={500}
              height={636}
              alt="Background Img"
            /> */}
          </div>
        </div>
        <div className="row" style={{ marginTop: "2.5%" }}>
          <span style={{ fontSize: "25pt", marginBottom: "2.5%" }}>
            What Can I Do ?
          </span>
          {whatItems.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3 pb-2">
              <div className="what-items p-2">
                <Image
                  src={item.img.src}
                  width={200}
                  height={72}
                  alt={item.img.alt}
                />
                <br />
                <span>{item.name}</span>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          id="About"
          className="row"
          style={{ marginTop: "5%", marginBottom: "2.5%" }}
        >
          <span style={{ fontSize: "25pt", marginBottom: "2.5%" }}>
            About Me
          </span>
          <div className="col-12 col-lg-6 ab_left">
            <Image
              className="img"
              src="/assets/img/pic2.jpg"
              width={450}
              height={600}
              alt="KiaN"
            />
          </div>
          <div className="col-12 col-lg-6 ab_right">
            <span style={{ fontSize: "35pt" }} className="rgbtext">
              KiaN Rabiei
            </span>
            <br />
            <p style={{ fontSize: "medium" }}>
              Hello there! 👋 My name is Kian Rabiee, and I&apos;m a passionate
              15-year-old programmer. 💻 I&apos;ve been immersed in the world of
              coding for the past 4 years, honing my skills and exploring the
              vast possibilities of programming. 🌟 During my journey, I
              initially focused on professional programming in the FiveM
              environment for around a year. It was an exciting experience that
              allowed me to delve into the intricacies of game development and
              server-side scripting. 🎮 However, I soon realized that my hunger
              for knowledge couldn&apos;t be contained within a single
              programming language. So, I made the decision to expand my
              horizons and dive into other realms of coding. As a result, I have
              now become proficient in JavaScript, Node.js, HTML, and CSS. 💪
              JavaScript empowers me to create dynamic and interactive web
              applications, while Node.js allows me to build robust server-side
              applications. With HTML and CSS, I can craft beautiful and
              responsive user interfaces. 🌐 With a burning curiosity and a
              constant thirst for learning, I strive to stay up to date with the
              latest technologies and industry trends. My goal is to contribute
              my skills to meaningful projects and make a positive impact in the
              world of technology. 🌍 Thank you for taking the time to learn a
              little bit about me. I&apos;m excited to continue my coding
              journey and see where it takes me next! 🚀
            </p>
            <div className="info-list">
              <ul>
                {infoList.map((item, index) => (
                  <li key={index}>
                    <strong>{item.name} </strong> {item.yourInfo}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          id="Skills"
          className="row"
          style={{ marginTop: "5%", marginBottom: "2.5%" }}
        >
          <span style={{ fontSize: "25pt", marginBottom: "2.5%" }}>
            My Skills
          </span>
          <div className="col-12 skills percent content-box">
            <ul>
              {skillsList.map((item, index) => (
                <li key={index}>
                  <div className="name">{item.name}</div>
                  <div className="progress">
                    <div
                      className="percentage"
                      style={{ width: `${item.percent}` }}
                    >
                      <span className="percent">{item.percent}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row footer">
          <p>
            2023 - kian-rabiei.ir - All rights reserved -
            <span id="btnSwitch">
              <FontAwesomeIcon icon={faMoon} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
