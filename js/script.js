let stored = [];

// Display data items for a fixed page
function showPage(list, page) {
   // Creates number of cards to be displayed
   const firstIndex = ( page * 9) - 9;
   const lastIndex = page * 9;

   // Selects HTML Element that will have cards displayed and empties it
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   // Takes data and maps to page on cards
   for (let i = 0; i < list.length; i++ ) {
      if ( i >= firstIndex && i < lastIndex) {
         studentList.insertAdjacentHTML('beforeend',
            `
               <li class="student-item cf">
                  <div class="student-details">
                     <img class="avatar" src=${data[i].picture.large} alt="Profile Picture">
                     <h3>${data[i].name.first} ${data[i].name.last}</h3>
                     <span class="email">${data[i].email}</span>
                  </div>
                  <div class="joined-details">
                     <span class="date">Joined ${data[i].registered.date}</span>
                  </div>
               </li>
            `
         )
      }
   }
}


// Creates pagination and allows for viewing of whole data set
function addPagination(list) {
   // Determines page numbers
   const pages = Math.ceil( list.length / 9 );

   // Selects HTML element that will display page numbers and empties it
   const linkList = document.querySelector( '.link-list' );
   linkList.innerHTML = '';

   // Creates buttons for pages and displays them
   for ( i = 1; i <= pages; i++) {
      linkList.insertAdjacentHTML('beforeend', 
         `
            <li>
               <button type="button">${i}</button>
            </li>
         `
      )
   }

   // Sets first page to active
   let buttons = document.querySelectorAll('button');
   buttons[1].className += 'active'
   // Adds fuctionality to page buttons
   linkList.addEventListener('click', (e) => {
         if (e.target.type === 'button') {
            document.querySelector('.active').className = '';
            e.target.className += 'active';
            showPage(data, e.target.innerHTML)
         }
   })
}


// Add functionality to search bar
const studentSearch = document.querySelector('.student-search')

function searchFunction () {
      //Gets info from search field and students   
      const value = document.querySelector('#search').value.toLowerCase()
      let studentItems = data
      stored = []
      // Compare search field to student info
      for ( i = 0; i < data.length; i++ ) {
         if ( `${data[i].name.first} ${data[i].name.last}`.includes(value)) {
           stored.push(data[i])
         } 
      }
      showPage(stored, 1)
      addPagination(stored)
}


// Functionality for Enter key

// studentSearch.addEventListener('keypress', (e) => {
//    if ( e.key = 'Enter') {
//       searchFunction()
//    }
// })

// Functionality for search button
studentSearch.addEventListener('click', (e) => {
   if( e.target = 'button') { 
      searchFunction()
   }
})


// Call functions
showPage(data, 1);
addPagination(data);