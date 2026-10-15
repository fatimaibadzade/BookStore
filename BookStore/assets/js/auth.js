document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem("booknestUsers")) || [];
    } catch {
      return [];
    }
  }

  function showFieldError(id, message) {
    const element = document.getElementById(id);
    if (element) element.textContent = message;
  }

  function clearErrors(ids) {
    ids.forEach((id) => showFieldError(id, ""));
  }

  function showMessage(id, message, success = false) {
    const element = document.getElementById(id);
    if (!element) return;

    element.textContent = message;
    element.classList.toggle("success-message", success);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      clearErrors([
        "registerNameError",
        "registerEmailError",
        "registerPasswordError",
        "confirmPasswordError"
      ]);

      showMessage("registerMessage", "");

      const name = document.getElementById("registerName").value.trim();
      const email = document.getElementById("registerEmail").value.trim().toLowerCase();
      const password = document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      let valid = true;

      if (name.length < 2) {
        showFieldError("registerNameError", "Enter your name (at least 2 characters).");
        valid = false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFieldError("registerEmailError", "Enter a valid email address.");
        valid = false;
      }

      if (password.length < 6) {
        showFieldError("registerPasswordError", "Password must have at least 6 characters.");
        valid = false;
      }

      if (password !== confirmPassword) {
        showFieldError("confirmPasswordError", "Passwords do not match.");
        valid = false;
      }

      if (!valid) return;

      const users = getUsers();

      if (users.some((user) => user.email === email)) {
        showFieldError("registerEmailError", "An account with this email already exists.");
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("booknestUsers", JSON.stringify(users));

      showMessage("registerMessage", "Registration successful! You can now log in.", true);
      registerForm.reset();
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      clearErrors(["loginEmailError", "loginPasswordError"]);
      showMessage("loginMessage", "");

      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value;

      let valid = true;

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFieldError("loginEmailError", "Enter a valid email address.");
        valid = false;
      }

      if (!password) {
        showFieldError("loginPasswordError", "Enter your password.");
        valid = false;
      }

      if (!valid) return;

      const user = getUsers().find(
        (item) => item.email === email && item.password === password
      );

      if (!user) {
        showMessage("loginMessage", "Email or password is incorrect.");
        return;
      }

      localStorage.setItem(
        "booknestCurrentUser",
        JSON.stringify({ name: user.name, email: user.email })
      );

      showMessage("loginMessage", `Welcome back, ${user.name}!`, true);
    });
  }
});