import sunset from "../assets/landing-background.jpg";
import logo from "../assets/logo.png";
import searchIcon from "../assets/search-icon.svg";

const content = document.getElementById("content");

function appendBackground() {
  const bgIMG = document.createElement("img");
  bgIMG.src = sunset;
  bgIMG.id = "landing-bg";
  bgIMG.alt = "Cloudy sky at sunset";

  content.appendChild(bgIMG);

  const bgCredit = document.createElement("p");
  bgCredit.innerHTML = `Photo by <a href="https://unsplash.com/@noaa">NOAA</a> from <a href="https://unsplash.com/photos/wind-blown-cloud-tops-in-the-setting-sun-SLDSYepv0n8">Unsplash</a>`;
  bgCredit.id = "landing-bg-credit";
  content.appendChild(bgCredit);
}

function initializeSearch() {
    const landingMain = document.createElement("div");
    landingMain.id = "landing-main";
    content.appendChild(landingMain);

    // Add logo
    const logoIMG = document.createElement("img");
    logoIMG.id = "landing-logo"
    logoIMG.src = logo;
    logoIMG.alt = "Logo of sun behind rain clouds";
    landingMain.appendChild(logoIMG);

    // Add search bar
    const form = document.createElement("form");
    landingMain.appendChild(form);

    const searchBar = document.createElement("input");
    searchBar.id = "landing-search-bar";
    searchBar.classList.add("landing-search");
    searchBar.type = "text";
    searchBar.name = "landing-search-bar";
    form.appendChild(searchBar);

    const searchButton = document.createElement("button");
    searchButton.type = "submit";
    searchButton.id = "landing-search-btn";
    searchButton.classList.add("landing-search");
    searchButton.innerHTML = `<img src=${searchIcon} alt="Search Icon">`;
    form.appendChild(searchButton);
    
}

appendBackground();
initializeSearch();
