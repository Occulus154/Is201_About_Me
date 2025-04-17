function openPage(pageName, elmnt, color) {
  // Hide all tabcontent
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Reset all tab buttons' background color
  const tablinks = document.getElementsByClassName("tablink");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the selected tab
  document.getElementById(pageName).style.display = "block";
  if (elmnt) {
    elmnt.style.backgroundColor = color;
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

// Function to handle tab + anchor combo (e.g. #News-motorcycles)
function handleHashLink() {
  const hash = window.location.hash;
  if (hash && hash.includes('-')) {
    const [tabName, anchorId] = hash.substring(1).split('-');
    const button = document.querySelector(`.tablink[onclick*="'${tabName}'"]`);
    if (button) {
      openPage(tabName, button, 'red');
      setTimeout(() => {
        const anchor = document.getElementById(anchorId);
        if (anchor) anchor.scrollIntoView({ behavior: "smooth" });
      }, 100); // Delay to allow tab to load
    }
  } else if (hash) {
    const tabName = hash.substring(1);
    const button = document.querySelector(`.tablink[onclick*="'${tabName}'"]`);
    if (button) openPage(tabName, button, 'red');
  }
}

window.onload = function () {
  document.getElementById("defaultOpen").click();
  handleHashLink();
};