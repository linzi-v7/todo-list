import logo from "../../assets/logo-square.png";
import { dialogController } from "../controllers/dialogController";
import { DialogActionType } from "../util/enums";

function renderWelcomeScreen() {
  const mainSiteDiv = document.querySelector(".main-site");
  const body = document.querySelector("body");
  mainSiteDiv.classList.add("inactive");

  const welcomeScreen = document.createElement("div");
  welcomeScreen.classList.add("welcome-screen");
  welcomeScreen.innerHTML = `
        <img src="${logo}" alt="tudoo site logo" class="site-logo" width="20%" />
        <h1 class="welcome-title">Welcome to Tudoo</h1>
        <p class="welcome-subtitle">Organize your life, one task at a time</p>
        <button class="add-project-button btn btn-primary float-up">Add Your First Project!</button>
        <p class="welcome-footer">Made with ❤️ by LINZI</p>
      `;
  body.prepend(welcomeScreen);

  const addProjectButton = document.querySelector(".add-project-button");
  addProjectButton.addEventListener("click", () => {
    dialogController.openDialog(DialogActionType.ADD_PROJECT);
  });
}

function removeWelcomeScreen() {
  console.log("Removing welcome screen");
  const welcomeScreen = document.querySelector(".welcome-screen");
  if (welcomeScreen) {
    welcomeScreen.remove();
  }
  const mainSiteDiv = document.querySelector(".main-site");
  mainSiteDiv.classList.remove("inactive");
}

export { renderWelcomeScreen, removeWelcomeScreen };
