/* =========================================================
   VEDA TECHNOLOGY
   INTERACTIONS & FORM VALIDATION
   ========================================================= */


/* ================= ELEMENTS ================= */

const header = document.getElementById("header");

const nav = document.getElementById("nav");

const menuToggle = document.getElementById("menuToggle");

const backToTop = document.getElementById("backToTop");

const contactForm = document.getElementById("contactForm");

const yearElement = document.getElementById("year");


/* ================= CURRENT YEAR ================= */

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* ================= MOBILE MENU ================= */

if (menuToggle && nav) {

  menuToggle.addEventListener("click", () => {

    const isOpen =
      nav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });


  /* Close menu after navigation */

  const navLinks =
    nav.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


/* ================= HEADER SCROLL ================= */

function updateHeader() {

  if (window.scrollY > 30) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

}

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();


/* ================= ACTIVE NAV ================= */

const sections =
  document.querySelectorAll("main section[id]");

const navigationLinks =
  document.querySelectorAll(".nav-link");


function updateActiveNavigation() {

  const scrollPosition =
    window.scrollY + 130;

  let currentSection = "home";

  sections.forEach((section) => {

    if (
      scrollPosition >= section.offsetTop
    ) {

      currentSection =
        section.getAttribute("id");

    }

  });

  navigationLinks.forEach((link) => {

    const target =
      link.getAttribute("href");

    link.classList.toggle(
      "active",
      target === `#${currentSection}`
    );

  });

}

window.addEventListener(
  "scroll",
  updateActiveNavigation,
  { passive: true }
);

updateActiveNavigation();


/* ================= FAQ ================= */

const faqItems =
  document.querySelectorAll(".faq-item");


faqItems.forEach((item) => {

  const question =
    item.querySelector(".faq-question");

  const answer =
    item.querySelector(".faq-answer");


  question.addEventListener("click", () => {

    const isActive =
      item.classList.contains("active");


    /* Close every other item */

    faqItems.forEach((otherItem) => {

      if (otherItem !== item) {

        otherItem.classList.remove("active");

        const otherAnswer =
          otherItem.querySelector(".faq-answer");

        otherAnswer.style.maxHeight = null;

      }

    });


    /* Toggle current */

    if (isActive) {

      item.classList.remove("active");

      answer.style.maxHeight = null;

    } else {

      item.classList.add("active");

      answer.style.maxHeight =
        answer.scrollHeight + "px";

    }

  });

});


/* ================= FORM HELPERS ================= */

function getElement(id) {

  return document.getElementById(id);

}


function setError(
  inputId,
  errorId,
  message
) {

  const input = getElement(inputId);

  const error = getElement(errorId);

  if (!input || !error) return;

  input.classList.add("error");

  error.textContent = message;

}


function clearError(
  inputId,
  errorId
) {

  const input = getElement(inputId);

  const error = getElement(errorId);

  if (!input || !error) return;

  input.classList.remove("error");

  error.textContent = "";

}


/* ================= EMAIL VALIDATION ================= */

function isValidEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email);

}


/* ================= CONTACT FORM ================= */

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const name =
        getElement("name").value.trim();

      const email =
        getElement("email").value.trim();

      const subject =
        getElement("subject").value.trim();

      const message =
        getElement("message").value.trim();


      const success =
        getElement("formSuccess");


      /* Clear old errors */

      clearError(
        "name",
        "nameError"
      );

      clearError(
        "email",
        "emailError"
      );

      clearError(
        "subject",
        "subjectError"
      );

      clearError(
        "message",
        "messageError"
      );


      success.textContent = "";


      let valid = true;


      /* Name */

      if (name.length < 2) {

        setError(
          "name",
          "nameError",
          "Please enter your name."
        );

        valid = false;

      }


      /* Email */

      if (!isValidEmail(email)) {

        setError(
          "email",
          "emailError",
          "Please enter a valid email."
        );

        valid = false;

      }


      /* Subject */

      if (subject.length < 3) {

        setError(
          "subject",
          "subjectError",
          "Please enter a subject."
        );

        valid = false;

      }


      /* Message */

      if (message.length < 10) {

        setError(
          "message",
          "messageError",
          "Message should contain at least 10 characters."
        );

        valid = false;

      }


      if (!valid) {

        return;

      }


      /* Frontend-only success */

      success.textContent =
        "Message validated successfully. This demo form does not send messages to a server.";


      contactForm.reset();


      /* Remove any remaining error states */

      [
        ["name", "nameError"],
        ["email", "emailError"],
        ["subject", "subjectError"],
        ["message", "messageError"]
      ].forEach(([input, error]) => {

        clearError(input, error);

      });

    }
  );

}


/* ================= LIVE FORM ERROR CLEAR ================= */

const formInputs =
  document.querySelectorAll(
    "#contactForm input, #contactForm textarea"
  );


formInputs.forEach((input) => {

  input.addEventListener("input", () => {

    input.classList.remove("error");

  });

});


/* ================= BACK TO TOP ================= */

function updateBackToTop() {

  if (window.scrollY > 500) {

    backToTop.classList.add("show");

  } else {

    backToTop.classList.remove("show");

  }

}


window.addEventListener(
  "scroll",
  updateBackToTop,
  { passive: true }
);


if (backToTop) {

  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}


/* ================= ESC KEY ================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      nav.classList.contains("open")
    ) {

      nav.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  }
);


/* ================= INITIALIZATION ================= */

updateBackToTop();

console.log(
  "Veda Technology Business & Services Website initialized."
);
