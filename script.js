var activeCardId = null;

function openCard(cardId) {
  const card = document.getElementById(cardId + '-card');
  if (card) {
    if (activeCardId) {
      closeCard(activeCardId);
    }
    card.style.display = 'block';
    activeCardId = cardId;
  }
}

function closeCard(cardId) {
  const card = document.getElementById(cardId + '-card');
  if (card) {
    card.style.display = 'none';
    activeCardId = null;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(function(item) {
    item.addEventListener('click', function() {
      const alt = item.querySelector('img').getAttribute('alt');
      openCard(alt.toLowerCase().replace(/\s/g, ''));
    });
  });

  const floatingCards = document.querySelectorAll('.floating-card');
  floatingCards.forEach(function(card) {
    const cardId = card.getAttribute('id').replace('-card', '');
    card.addEventListener('click', function(event) {
      if (event.target === card) {
        closeCard(cardId);
      }
    });
  });
});



// Get the calendar element
const calendar = document.getElementById('calendar');

// Define available and booked dates (dummy data)
const availableDates = ['2023-06-15', '2023-06-20', '2023-06-25'];
const bookedDates = ['2023-06-18', '2023-06-22'];

// Function to generate the calendar
function generateCalendar() {
  // Get the current date
  const currentDate = new Date();
  
  // Get the year and month of the current date
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Set the calendar header with the current month and year
  const header = document.createElement('h2');
  header.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
  calendar.innerHTML = '';
  calendar.appendChild(header);

  // Create the table structure for the calendar
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);

  // Create table header row with weekdays
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekdaysRow = document.createElement('tr');
  weekdays.forEach((weekday) => {
    const th = document.createElement('th');
    th.textContent = weekday;
    weekdaysRow.appendChild(th);
  });
  thead.appendChild(weekdaysRow);

  // Get the first day and last day of the month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Get the number of days in the month
  const daysInMonth = lastDay.getDate();

  // Calculate the starting position of the first day in the calendar
  const startingPos = firstDay.getDay();

  // Calculate the number of rows needed in the calendar
  const numRows = Math.ceil((daysInMonth + startingPos) / 7);

  // Generate calendar cells
  let day = 1;
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');

      if (i === 0 && j < startingPos) {
        // Empty cell before the first day of the month
        cell.classList.add('empty');
      } else if (day > daysInMonth) {
        // Empty cell after the last day of the month
        cell.classList.add('empty');
      } else {
        // Regular calendar cell
        cell.textContent = day;

        // Check if the date is available or booked
        const date = new Date(year, month, day).toISOString().split('T')[0];
        if (availableDates.includes(date)) {
          cell.classList.add('available');
        } else if (bookedDates.includes(date)) {
          cell.classList.add('booked');
        } else {
          cell.classList.add('unavailable');
        }

        // Add event listener to handle date selection
        cell.addEventListener('click', () => {
          if (!cell.classList.contains('empty') && !cell.classList.contains('unavailable')) {
            // Set the selected date value in the date input field
            const dateInput = document.getElementById('date');
            dateInput.value = date;

            // Highlight the selected date cell
            const selectedCell = document.querySelector('.selected');
            if (selectedCell) {
              selectedCell.classList.remove('selected');
            }
            cell.classList.add('selected');
          }
        });

        day++;
      }

      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  calendar.appendChild(table);
}

// Generate the calendar on page load
generateCalendar();


// confirmation page 

// Handle form submission
const bookingForm = document.getElementById('booking-form');
bookingForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the form inputs
  const artistSelect = document.getElementById('artist');
  const selectedArtist = artistSelect.options[artistSelect.selectedIndex].text;
  const selectedDate = document.getElementById('date').value;
  const selectedTime = document.getElementById('time').value;
  const email = document.getElementById('email').value;

  // Store the form data in sessionStorage
  sessionStorage.setItem('selectedArtist', selectedArtist);
  sessionStorage.setItem('selectedDate', selectedDate);
  sessionStorage.setItem('selectedTime', selectedTime);
  sessionStorage.setItem('email', email);

  // Redirect to the confirmation page
  window.location.href = 'confirmation.html';
});

document.getElementById('selected-artist').textContent = sessionStorage.getItem('selectedArtist');
document.getElementById('selected-date').textContent = sessionStorage.getItem('selectedDate');
document.getElementById('selected-time').textContent = sessionStorage.getItem('selectedTime');
document.getElementById('email').textContent = sessionStorage.getItem('email');


// for the booking page

// Add event listener to the "Book Now" button
const bookNowButton = document.getElementById('book-now');
bookNowButton.addEventListener('click', function() {
  // Get the selected artist, date, and time values
  const artistSelect = document.getElementById('artist');
  const selectedArtist = artistSelect.options[artistSelect.selectedIndex].text;
  const selectedDate = document.getElementById('date').value;
  const selectedTime = document.getElementById('time').value;

  // Construct the URL for the confirmation page
  const confirmationURL = `confirmation.html?artist=${encodeURIComponent(selectedArtist)}&date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(selectedTime)}`;

  // Redirect to the confirmation page
  window.location.href = confirmationURL;
});


// for the confirmation page 

// Get the query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);

// Get the values from the query parameters
const artist = urlParams.get('artist');
const date = urlParams.get('date');
const time = urlParams.get('time');
const email = urlParams.get('email');

// Display the values on the confirmation page
document.getElementById('selected-artist').textContent = artist;
document.getElementById('selected-date').textContent = date;
document.getElementById('selected-time').textContent = time;
document.getElementById('email').textContent = email;


// footer javascript

// JavaScript for Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// script.js
var modals = document.querySelectorAll('.modal');
var cards = document.querySelectorAll('.card');

modals.forEach(function(modal) {
  modal.addEventListener('show.bs.modal', function() {
    // Find the corresponding card for the modal
    var cardId = modal.getAttribute('data-bs-target');
    var card = document.querySelector(cardId);
    
    // Calculate the position of the card
    var cardRect = card.getBoundingClientRect();
    var cardOffsetTop = window.pageYOffset + cardRect.top;
    
    // Set the top position of the modal
    modal.style.top = cardOffsetTop + cardRect.height + 'px';
    
    // Add class to show the modal
    modal.classList.add('show');
  });
  
  modal.addEventListener('hidden.bs.modal', function() {
    // Remove the top position of the modal
    modal.style.top = '';
    
    // Remove class to hide the modal
    modal.classList.remove('show');
  });
});

