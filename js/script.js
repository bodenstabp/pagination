// Add Search Bar
document.querySelector('header').innerHTML +=  
   `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;

// Global Variables
let stored = [];
const studentSearch = document.querySelector('.student-search');
const searchButton = document.querySelector('header button')
const studentList = document.querySelector('.student-list');
const noMatch = document.querySelector('.no-match');
const itemsPerPage = 9

// Display data items for a fixed page
function showPage(list, page) {
   // Creates number of cards to be displayed
   const firstIndex = ( page * itemsPerPage) - itemsPerPage;
   const lastIndex = page * itemsPerPage;

   // Selects HTML Element that will have cards displayed and empties it
   studentList.innerHTML = '';

   // Takes data and maps to page on cards
   for (let i = 0; i < list.length; i++ ) {
      if ( i >= firstIndex && i < lastIndex) {
         studentList.insertAdjacentHTML('beforeend',
            `<li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li> `
         )
      }
   }
}


// Creates pagination and allows for viewing of whole data set
function addPagination(list, info) {
   // Determines page numbers
   const pages = Math.ceil( list.length / itemsPerPage );

   // Selects HTML element that will display page numbers and empties it
   const linkList = document.querySelector( '.link-list' );
   linkList.innerHTML = '';

   // Creates buttons for pages and displays them
   for ( i = 1; i <= pages; i++) {
      linkList.insertAdjacentHTML('beforeend', 
         ` <li>
               <button type="button">${i}</button>
           </li> `
      )
   }

   // Sets first page to active
   let buttons = document.querySelectorAll('button');
   if ( buttons[1] ) { buttons[1].className += 'active' } 

   // Adds fuctionality to page buttons
   linkList.addEventListener('click', (e) => {
         if ( e.target.type === 'button' ) {
            document.querySelector('.active').className = '';
            e.target.className += 'active';
            showPage(list, e.target.innerHTML)
         }
   })
}


// Add functionality to search bar
function searchFunction () {
      //Gets info from search field and students   
      const value = document.querySelector('#search').value.toLowerCase()
      stored = []

      // Compare search field to student info
      for ( i = 0; i < data.length; i++ ) {
         if ( `${data[i].name.first} ${data[i].name.last}`.includes(value)) {
           stored.push(data[i]);
         } 
      }

      // Call functions
      showPage(stored, 1)
      addPagination(stored) 
      
      // Display a message if no results are met
      if ( stored.length === 0) {
         noMatch.style.display = 'block'
      }
}


// Functionality for Enter key
studentSearch.addEventListener('keypress', (e) => {
   if ( e.key === 'Enter') {
      searchFunction()
   }
})

// Functionality for search button
searchButton.addEventListener('click', (e) => {
      searchFunction()  
})


// Call functions
showPage(data, 1);
addPagination(data);