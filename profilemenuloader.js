// Dynamically load profile modal HTML into the page
function loadProfileModal() {
  fetch('profilemenu.html')
    .then(response => response.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);


      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (user) {
        document.getElementById('profileEmail').innerText = `Email: ${user.email}`;
        document.getElementById('profileRole').innerText = `Role: ${user.role}`;
      }
    })
    .catch(err => console.error('Error loading profile modal:', err));
}
