const buttons = document.querySelectorAll("[data-language-target]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

function setLanguage(language) {
  document.body.dataset.language = language;

  buttons.forEach((button) => {
    const isActive = button.dataset.languageTarget === language;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.languageTarget);
  });
});

if (contactForm) {
  const composeEmail = () => {
    const formData = new FormData(contactForm);
    const language = document.body.dataset.language || "ja";
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subjectInput = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subjectInput || !message) {
      if (formStatus) {
        formStatus.textContent =
          language === "ja"
            ? "すべての項目を入力してください。"
            : "Please complete all fields.";
      }
      return;
    }

    if (!emailPattern.test(email)) {
      if (formStatus) {
        formStatus.textContent =
          language === "ja"
            ? "メールアドレスの形式を確認してください。"
            : "Please enter a valid email address.";
      }
      return;
    }

    const subject =
      subjectInput ||
      (language === "ja" ? "工場へのお問い合わせ" : "Factory Inquiry");

    const body =
      language === "ja"
        ? [
            "工場へのお問い合わせ",
            "",
            `お名前: ${name}`,
            `メールアドレス: ${email}`,
            "",
            "内容:",
            message,
          ].join("\n")
        : [
            "Factory Inquiry",
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            "",
            "Message:",
            message,
          ].join("\n");

    const mailtoUrl = `mailto:gddeledda@163.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (formStatus) {
      formStatus.textContent =
        language === "ja"
          ? "メールアプリを起動しています。開かない場合は「直接メールする」を使ってください。"
          : 'Opening your mail app. If nothing happens, use "Direct Email".';
    }
    window.location.assign(mailtoUrl);
  };

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    composeEmail();
  });

  const submitButton = contactForm.querySelector("[data-submit-email]");
  if (submitButton) {
    submitButton.addEventListener("click", () => {
      composeEmail();
    });
  }
}

setLanguage(document.body.dataset.language || "ja");
