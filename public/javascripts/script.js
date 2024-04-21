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
darkModeIcon.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  // toggle the background color and text color
  document.body.style.backgroundColor =
    document.body.style.backgroundColor === "black" ? "white" : "black";
  document.body.style.color =
    document.body.style.color === "white" ? "black" : "white";

  // toggle the icon class (toggle add/remove the class attribute to the element)
  darkModeIcon.classList.toggle("fa-moon fa-regular");
  darkModeIcon.classList.toggle("fa-sun");
}
