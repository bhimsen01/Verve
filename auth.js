// All workshops data
const workshopsData = [
  {
    name: "Cybersecurity Basics",
    date: "Aug 21, 2025",
    joins: 49,
    description: "Explore ethical hacking, password security, and network protection.",
    image: "cybersecurity.webp"
  },
  {
    name: "Photography Basics",
    date: "Sep 6, 2025",
    joins: 26,
    description: "Learn camera settings, framing, and editing tips to capture stunning photos.",
    image: "photography.jpeg"
  },
  {
    name: "Git and Github Bootcamp",
    date: "Sep 13, 2025",
    joins: 73,
    description: "Version control in tech landscape, featuring Git and Github.",
    image: "gitandgithub.jpg"
  },
  {
    name: "Survival Skills Workshop",
    date: "Sep 20, 2025",
    joins: 88,
    description: "Discover essential survival skills. Great for adventure lovers.",
    image: "survivalskills.avif"
  },
  {
    name: "Digital Art & Animation Workshop",
    date: "Sep 27, 2025",
    joins: 59,
    description: "Learn digital sketching, character design, and basic animation.",
    image: "digitalart.jpg"
  },
  {
    name: "Blockchain Workshop",
    date: "Oct 4, 2025",
    joins: 82,
    description: "Understand blockchain, smart contracts, and digital assets.",
    image: "blockchain.avif"
  },
  {
    name: "AR/VR Experience Workshop",
    date: "Oct 11, 2025",
    joins: 58,
    description: "Explore virtual and augmented reality development with practical demos.",
    image: "arvr.jpg"
  }
];








// Basic storage setup
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}
if (!localStorage.getItem("loggedInUser")) {
  localStorage.setItem("loggedInUser", null);
}

// Pre-defined member emails
const memberEmails = ["member1@example.com", "admin@verve.org", "bhimsen@cps.edu.np"];


// Sign Up function
function signUp(email, password) {
  let users = JSON.parse(localStorage.getItem("users"));

  if (users.some(u => u.email === email)) {
    alert("Email already registered!");
    return;
  }

  // Assign role automatically
  let role = memberEmails.includes(email.toLowerCase()) ? "member" : "user";

  users.push({ email, password, role, myWorkshops: [], myEvents: [] });
  localStorage.setItem("users", JSON.stringify(users));

  alert(`Account created as ${role}. Please log in.`);
}


// Login function
function logIn(email, password) {
  let users = JSON.parse(localStorage.getItem("users"));
  let user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "homepage.html";
  } else {
    alert("Invalid email or password!");
  }
}


// Book Workshop
function bookWorkshop(workshopName) {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  
  console.log("Current user:", user);
  
  if (!user) {
    alert("Please log in first.");
    return;
  }

  // Avoid duplicate bookings
  if (!user.myWorkshops.includes(workshopName)) {
    user.myWorkshops.push(workshopName);
  }

  updateUser(user);
  console.log("Workshops after booking:", user.myWorkshops);
  alert(`You joined the workshop: ${workshopName}`);
}



function unBookWorkshop(workshopName) {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    alert("Please log in first.");
    return;
  }

  // Remove workshop by filtering it out
  user.myWorkshops = user.myWorkshops.filter(w => w !== workshopName);

  updateUser(user);
  alert(`You have removed the workshop: ${workshopName}`);

  // Reload dashboard to show updates
  if (window.location.pathname.includes("dashboard.html")) {
    loadMyData();
  }
}


// Create Event (members only)
function createEvent(eventName) {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    alert("Please log in first.");
    return;
  }
  if (user.role !== "member") {
    alert("Only members can create events!");
    return;
  }
  user.myEvents.push(eventName);
  updateUser(user);
  alert(`Event created: ${eventName}`);
}

// Helper to update user in storage
function updateUser(updatedUser) {
  let users = JSON.parse(localStorage.getItem("users"));
  let index = users.findIndex(u => u.email === updatedUser.email);
  users[index] = updatedUser;
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
}

// Load user data in dashboard
function loadMyData() {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log("Loading data for:", user);

  if (!user) {
    document.body.innerHTML = "<h2>Please log in first.</h2>";
    return;
  }

  let myWorkshopsDiv = document.getElementById("myWorkshops");
  let myEventsDiv = document.getElementById("myEvents");

  if (myWorkshopsDiv) {
  if (user.myWorkshops.length) {
    myWorkshopsDiv.innerHTML = user.myWorkshops
      .map(workshopName => {
        let workshop = workshopsData.find(w => w.name === workshopName);
        if (!workshop) return "";
        return `
          <div class="card">
            <div class="card-body-img">
              <img class="card-img" src="${workshop.image}" alt="${workshop.name}"/>
            </div>
            <div class="card-body">
              <h3 class="card-body-heading">${workshop.name}</h3>
              <p class="card-body-text">${workshop.date} · ${workshop.joins} joins</p>
              <p class="card-body-text">${workshop.description}</p>
              <button class="nav-btn secondary-btn" onclick="window.location.href='dashboard.html'">Details</button>
              <button class="nav-btn primary-delete-btn" onclick="unBookWorkshop('${workshop.name}')">Delete</button>
            </div>
          </div>
        `;
      })
      .join("");
  } else {
    myWorkshopsDiv.innerHTML = "<p>No workshops joined yet.</p>";
  }
}

  if (myEventsDiv) {
    myEventsDiv.innerHTML = user.myEvents.length
      ? user.myEvents.map(e => `<li>${e}</li>`).join("")
      : "<p>No events created yet.</p>";
  }
}

// Logout
function logOut() {
  localStorage.setItem("loggedInUser", null);
  window.location.href = "landing.html";
}
