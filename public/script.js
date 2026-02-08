const toggleVis = document.getElementById("togglevisibility");
const passwordField = document.querySelector("#pass");

toggleVis.addEventListener("click", function () {
  const isHidden = passwordField.getAttribute("type") === "password";

  passwordField.setAttribute("type", isHidden ? "text" : "password");

  if (isHidden) {
    this.classList.remove("fa-eye-slash");
    this.classList.add("fa-eye");
  } else {
    this.classList.remove("fa-eye");
    this.classList.add("fa-eye-slash");
  }
});

async function call() {
  const UImessage = document.getElementById("demo");
  UImessage.style.display = "block";
  UImessage.innerHTML = "Processing...";
  UImessage.className = "show";

  const nameInput = document.getElementById("name").value;
  const passInput = document.getElementById("pass").value;
  const emailInput = document.getElementById("email").value;

  document.getElementById("name").value = "";
  document.getElementById("pass").value = "";
  document.getElementById("email").value = "";

  const userInfo = {
    userName: nameInput,
    userPassword: passInput,
    userEmail: emailInput,
  };

  const response = await fetch("/fetch-grades", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  const data = await response.json();

  if (data.type === "Failure") {
    UImessage.className = "show error";
    UImessage.innerHTML = data.message;
    return;
  }

  UImessage.className = "show success";
  UImessage.innerHTML = data.message;
}
