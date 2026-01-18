import { rawTricks } from "./data.js";

/* =============================
 *   LEVEL ORDER + DESCRIPTIONS
 * ============================= */

const LEVEL_ORDER = [
  "Absolute Novice Tricks",
"Beginner Tricks",
"Intermediate Tricks",
"Advanced Tricks",
"Expert Tricks",
"Elite Tricks",
"WTF Tricks",
"Extra Skills",
"Transitions"
];

const LEVEL_DESCRIPTIONS = {
  "Absolute Novice Tricks":
  "If you are new to tricking, start here. Build a solid foundation of these tricks as most of the more advanced tricks are built from this list.",

  "Beginner Tricks":
  "Once you have mastered the tricks in the novice section, try moving on to some of these to expand your tricking arsenal.",

  "Intermediate Tricks":
  "A lot of things happen while learning intermediate tricks: swingthrus, transitions, miss-legs, and step-downs become more interesting, and using them occurs more often. Also, tumbling will become \"commonplace\", and the difficulty of it will surely increase. Mastering these skills will begin to set you apart from your average tricker.",

  "Advanced Tricks":
  "By tricking standards, your gymnastic tumbling should be pretty good at this point. Swingthrus, miss-legs, and other transition skills will be used all the time, and your tricking style will be manifested. Risk of injury increases significantly, and mastery takes years of dedication.",

  "Expert Tricks":
  "The execution of these skills makes you \"top-class\". Most expert tricks are advanced tricks with added complexity, requiring exceptional power, speed, and conditioning.",

  "Elite Tricks":
  "Five years ago these tricks were unheard of. Today, more and more trickers are landing them. If you are here, you really don’t need much guidance anymore.",

  "WTF Tricks":
  "Shouldn’t be humanly possible. Only a select few freak trickers can land these after years of training.",

  "Extra Skills":
  "Applying these extra movements adds style and flair to tricking. Gyros, misslegs, swingthrus, and stance work build finesse.",

  "Transitions":
  "Moves that get you from trick to trick in your combos, but don’t necessarily qualify as tricks themselves."
};

/* =============================
 *   DOM REFERENCES
 * ============================= */

const app = document.getElementById("trick-app");

/* =============================
 *   SIDEBAR
 * ============================= */

window.openSidebar = function (trick) {
  const sidebar = document.getElementById("trickSidebar");
  const content = document.getElementById("sidebarContent");

  content.innerHTML = `
  <h2>${trick.name}</h2>
  ${trick.video ? `<video src="${trick.video}" controls style="width:100%;margin:16px 0;"></video>` : ""}
  ${trick.description ? `<p>${trick.description}</p>` : ""}
  ${trick.prerequisites ? `<p><strong>Prerequisites:</strong> ${trick.prerequisites}</p>` : ""}
  `;

  sidebar.classList.add("open");
  document.body.classList.add("sidebar-open");
};

window.closeSidebar = function () {
  document.getElementById("trickSidebar").classList.remove("open");
  document.body.classList.remove("sidebar-open");
};

/* =============================
 *   RENDER FUNCTION
 * ============================= */

function render(searchText = "") {
  app.innerHTML = "";

  const query = searchText.toLowerCase();

  LEVEL_ORDER.forEach(level => {
    const tricks = rawTricks.filter(t => {
      if (t.level !== level) return false;
      if (!query) return true;

      return (
        t.name?.toLowerCase().includes(query) ||
        t.description?.toLowerCase().includes(query) ||
        t.prerequisites?.toLowerCase().includes(query)
      );
    });

    if (!tricks.length) return;

    const section = document.createElement("section");
    section.className = "level";

    section.innerHTML = `
    <div class="level-bar">${level}</div>
    <p class="level-description">${LEVEL_DESCRIPTIONS[level] || ""}</p>
    <div class="grid"></div>
    `;

    const grid = section.querySelector(".grid");

    tricks.forEach(trick => {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = trick.name;
      card.onclick = () => openSidebar(trick);
      grid.appendChild(card);
    });

    app.appendChild(section);
  });
}

/* =============================
 *   SEARCH SETUP
 * ============================= */

const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", e => {
    render(e.target.value);
  });
}

/* =============================
 *   INITIAL LOAD
 * ============================= */

render();
