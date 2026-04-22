/* ---------- Hamburger menu ---------- */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

function closeMobile() {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
}

/* ---------- Scroll reveal ---------- */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // pequeño delay escalonado para elementos del mismo grupo
        entry.target.style.transitionDelay = i * 0.05 + "s";
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

reveals.forEach((el) => observer.observe(el));

// Inicializa con tu Public Key de EmailJS
emailjs.init("NSwN4DjrxavhXOhLi");

function handleForm() {
  const name    = document.getElementById("name").value.trim();
  const email   = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validación básica
  if (!name || !email || !message) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const btn = document.querySelector(".btn-primary");
  btn.textContent = "Enviando…";
  btn.disabled = true;

  const templateParams = {
    nombre:  name,
    correo: email,
    mensaje:    message,
  };

  emailjs
    .send("service_lre3l05", "template_jorl7ij", templateParams)
    .then(() => {
      btn.textContent = "¡Mensaje enviado! ✓";
      btn.style.background = "#1d9e75";
      btn.style.color = "#fff";
      // Limpia el formulario
      document.getElementById("name").value    = "";
      document.getElementById("email").value   = "";
      document.getElementById("message").value = "";
    })
    .catch((error) => {
      console.error("Error EmailJS:", error);
      btn.textContent = "Error al enviar. Intenta de nuevo.";
      btn.disabled = false;
    });
}
