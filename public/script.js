async function call(boolAutomation) {
  const UImessage = document.getElementById("demo");
  UImessage.style.display = "block";
  UImessage.innerHTML = "Processing...";
  UImessage.className = "show";

  if (boolAutomation === 'yes') {
    const response = await fetch("/startAutomation", {
      //automation trigger request
      method: "POST",
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
  else {
    const response = await fetch("/stopAutomation", {
      //automation stop trigger request
      method: "POST",
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
}
