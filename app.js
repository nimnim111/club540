const searchInput = document.getElementById("search");
const levelSelect = document.getElementById("level");
const content = document.getElementById("content");
const sidebar = document.getElementById("sidebar");
const detail = document.getElementById("detail");
const closeBtn = document.getElementById("close");
const count = document.getElementById("count");

const LEVEL_INTROS = {
  "Absolute Novice": "If you are new to tricking, start here. Build a solid foundation of these tricks as most of the more advanced tricks are built from this list.",
  "Beginner": "Once you have mastered the tricks in the novice section, try moving on to some of these to expand your tricking arsenal.",
  "Intermediate": "A lot of things happen while learning intermediate tricks: swingthrus, transitions, miss-legs, and step-downs become more interesting, and using them occurs more often. Also, tumbling will become \"commonplace\", and the difficulty of it will surely increase. Mastering these skills will begin to set you apart from your average tricker.",
  "Advanced": "By tricking standards, your gymnastic tumbling should be pretty good at this point. Swingthrus, miss-legs, and other transition skills will be used all the time, and your tricking style (tailor-fitted for you) will be manifested. The risk of injury, however, just shot up a couple of spots! This is where the NASKA competitors/champions are.",
  "Expert": "The execution of these skills makes you \"top-class\"! Most of the expert level tricks are simply Advanced tricks with added complexity.",
  "Elite": "Five years ago, these tricks were unheard of. Today, more and more trickers are landing them.",
  "WTF": "Shouldn't be humanly possible.... Only a select few freak trickers can land these after years of training.",
  "Extra Skills": "Applying these movements adds style and flair to tricking. Gyros, misslegs, swingthrus, and stance work build finesse.",
  "Transitions": "Moves that get you from trick to trick in your combos, but don't necessarily qualify as tricks themselves."
};

closeBtn.onclick = () => sidebar.classList.add("hidden");

function showDetail(trick) {
  detail.innerHTML = `
    <h2>${trick.name}</h2>
    ${trick.video ? `<video controls src="${trick.video}"></video>` : ""}
    <p>${trick.description || ""}</p>
    <p><b>Prerequisites:</b> ${trick.prerequisites || "None"}</p>
  `;
  sidebar.classList.remove("hidden");
}

function render() {
  const search = searchInput.value.toLowerCase();
  const selected = levelSelect.value;

  const visible = TRICKS.filter(t => {
    const matchLevel = selected === "ALL" || t.level === selected;
    const matchSearch =
      !search ||
      t.name.toLowerCase().includes(search) ||
      (t.description || "").toLowerCase().includes(search) ||
      (t.prerequisites || "").toLowerCase().includes(search);
    return matchLevel && matchSearch;
  });

  count.textContent = `${visible.length} tricks`;
  content.innerHTML = "";

  const grouped = {};
  visible.forEach(t => {
    grouped[t.level] = grouped[t.level] || [];
    grouped[t.level].push(t);
  });

  Object.keys(grouped).forEach(level => {
    content.innerHTML += `
      <div class="level-header">
        <h3>${level} Tricks</h3>
      </div>
      ${LEVEL_INTROS[level] ? `<p class="level-description">${LEVEL_INTROS[level]}</p>` : ""}
      <div class="grid">
        ${grouped[level].map(t => {
          const i = TRICKS.indexOf(t);
          return `<div class="card" data-index="${i}">${t.name}</div>`;
        }).join("")}
      </div>
    `;
  });

  document.querySelectorAll(".card").forEach(card => {
    card.onclick = () => {
      const i = card.getAttribute("data-index");
      showDetail(TRICKS[i]);
    };
  });
}

searchInput.addEventListener("input", render);
levelSelect.addEventListener("change", render);
render();
