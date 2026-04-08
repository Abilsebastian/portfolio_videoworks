const contactForm = document.getElementById("contactForm");
const contactSubmit = document.getElementById("contactSubmit");

if (contactForm && contactSubmit) {
  const defaultLabel = contactSubmit.textContent;

  function resetButton() {
    contactSubmit.disabled = false;
    contactSubmit.classList.remove("is-busy", "is-error", "is-success");
    contactSubmit.textContent = defaultLabel;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.querySelector("#name").value.trim();
    const email = contactForm.querySelector("#email").value.trim();
    const message = contactForm.querySelector("#message").value.trim();

    if (!name || !email || !message) {
      contactSubmit.classList.remove("is-busy", "is-success");
      contactSubmit.classList.add("is-error");
      contactSubmit.textContent = "Fill all fields";
      window.setTimeout(resetButton, 2200);
      return;
    }

    contactSubmit.disabled = true;
    contactSubmit.classList.remove("is-error", "is-success");
    contactSubmit.classList.add("is-busy");
    contactSubmit.textContent = "Opening mail app...";

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:abilseb.dev@gmail.com?subject=${subject}&body=${body}`;

    contactForm.reset();
    contactSubmit.classList.remove("is-busy", "is-error");
    contactSubmit.classList.add("is-success");
    contactSubmit.textContent = "Draft ready";
    window.setTimeout(resetButton, 2600);
  });
}
