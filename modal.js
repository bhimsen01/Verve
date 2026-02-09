window.onload = function () {
    // Open any modal by ID
    window.openModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    // Close any modal by ID
    window.closeModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    // Close modal when clicking outside content
    window.onclick = function (event) {
    const signupModal = document.getElementById('signupModal');
    const loginModal = document.getElementById('loginModal');

    if (event.target === signupModal) {
        closeModal('signupModal');
    }
    if (event.target === loginModal) {
        closeModal('loginModal');
    }
};
};
