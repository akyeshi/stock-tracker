/*
const options = {
  bottom: "0px", // default: '32px'
  right: "32px", // default: '32px'
  left: "unset", // default: 'unset'
  time: "0.3s", // default: '0.3s'
  mixColor: "#fff", // default: '#fff'
  backgroundColor: "#fff", // default: '#fff'
  buttonColorDark: "#100f2c", // default: '#100f2c'
  buttonColorLight: "#fff", // default: '#fff'
  saveInCookies: true, // default: true,
  label: "☽", // default: ''
  autoMatchOsTheme: true, // default: true
};

const darkmode = new Darkmode(options);
darkmode.showWidget();
// darkmode.toggle();
*/

const darkModeIcon = document.getElementById("dark-mode-icon");
darkModeIcon.addEventListener("click", toggleTheme);

function toggleTheme() {
  // toggle the background color and text color
  document.body.style.backgroundColor =
    document.body.style.backgroundColor === "black" ? "white" : "black";
  document.body.style.color =
    document.body.style.color === "white" ? "black" : "white";

  // toggle the icon class (toggle add/remove the class attribute to the element)
  // darkModeIcon.classList.toggle("fa-moon fa-regular");
  // darkModeIcon.classList.toggle("fa-sun");

  // save theme preference as cookie
  // saveThemePreference();
}

function saveThemePreference() {
  // Get the current theme
  const currentTheme = document.body.classList.contains("dark-mode")
    ? "dark"
    : "light";

  // Set a cookie with the theme preference
  document.cookie = `theme=${currentTheme}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
}

function checkThemePreference() {
  // Get the theme preference from the cookie
  const cookieTheme = getCookieValue("theme");

  // Apply the saved theme preference
  if (cookieTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    darkModeIcon.classList.remove("fa-moon");
    darkModeIcon.classList.add("fa-sun");
  } else {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
    darkModeIcon.classList.add("fa-moon");
    darkModeIcon.classList.remove("fa-sun");
  }
}

function getCookieValue(cookieName) {
  // Helper function to get the value of a cookie
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
}

// click logo takes you to home page
const logoImg = document.querySelector("#logo-img");
logoImg.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "/";
});
