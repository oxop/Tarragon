document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('date');
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('it-IT', options);
    dateElement.textContent = formattedDate;
});