window.onload = function () {

    window.openModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };


    window.closeModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };


    window.onclick = function (event) {
    const profilepopupModal = document.getElementById('profilepopupModal');

    if (event.target === profilepopupModal) {
        closeModal('profilepopupModal');
    }
};
};
