//============================================
//Gallery — converted from HTML to JavaScript
//Module 1, Week 3, Day 3 Lab Assignment
//Photos display in a RANDOM order on every refresh,
//without changing the original arrays.
//============================================
var photos = []; //Declare an empty array to store image elements
var fileNames = []; //Declare an empty array to store image file names
var imageList = []; //Declare an empty array to store html list that contain an image
var image; //Declare an empty variable to store the assembled image list codes
var openList = "<li id='photo"; //Declare a variable to contain open list tag (class changed to id — photo1, photo2 and so on)
var closeList = "</li>"; //Declare a variable to contain close list tag
var openCaptionTag = "<p class='caption'>"; //Declare a variable to contain open caption tag
var closeCaptionTag = "</p>"; //Declare a variable to contain close caption tag
var openDescTag = "<p class='description'>"; //Declare a variable to contain open description tag
var closeDescTag = "</p>"; //Declare a variable to contain close description tag
var starTag = "<span class='star'>☆</span>"; //Declare a variable to contain the favorite star (empty star to start)

//Array that contains a collection of caption texts, one per photo
var captionTexts = [
  "Adoption Day",
  "Max the Golden",
  "Luna the Kitten",
  "Bailey the Puppy",
  "Clover the Rabbit",
  "Willow the Cat",
  "Shelter Buddies",
  "Aspen in the Snow",
  "Emerald Eyes",
  "Tigger the Tabby",
  "Daisy the Lab"
];

//Array that contains a collection of description texts, one per photo
var descTexts = [
  "Families meeting their new best friends at our Piedmont Park adoption event.",
  "Max sprinting across his new Marietta backyard, one year after adoption.",
  "Luna proves that black cats are the luckiest choice you can make.",
  "Bailey is eight weeks old and already an expert at napping in the grass.",
  "Clover does a joyful binky hop whenever the hay bin opens.",
  "Willow waited five months at the shelter for her forever home.",
  "These bonded buddies are hoping to be adopted together.",
  "Aspen discovered snow on a rare Georgia winter morning and loved it.",
  "Those emerald eyes have charmed every volunteer at the shelter.",
  "Tigger inspects every visitor personally before nap number four.",
  "Gentle Daisy is our most patient listener at kids' reading hour."
];

//============================================
//Random order — build a separate ORDER array and shuffle it.
//The original arrays (captionTexts, descTexts) are never touched;
//we only shuffle this list of index numbers.
//============================================
var order = []; //Declare an empty array to store the photo index numbers

//Fill the order array with indexes 0 - 10, one for each photo
for (var i = 0; i < 11; i++) {
  order.push(i);
}

//Shuffle the order array (Fisher-Yates shuffle): walk backwards through the
//array and swap each position with a randomly picked earlier position
for (var i = order.length - 1; i > 0; i--) {
  var j = Math.floor(Math.random() * (i + 1)); //Pick a random position from 0 to i
  var temp = order[i]; //Hold the current value
  order[i] = order[j]; //Move the randomly picked value here
  order[j] = temp; //Put the held value in the picked spot
}

//Create a loop to create 11 images following the shuffled order
for (var i = 0; i < 11; i++) {
  var pick = order[i]; //The original index of the photo to show at this position
  fileNames.push("gallery" + (pick + 1)); //Create image file name and store in the array
  photos.push("<img src='images/gallery/" + fileNames[i] + ".jpg' alt='" + captionTexts[pick] + "'>"); //Assemble file name into image element and store in an array
  image = openList + (pick + 1) + "'>" + photos[i] + starTag + openCaptionTag + captionTexts[pick] + closeCaptionTag + openDescTag + descTexts[pick] + closeDescTag + closeList; //Assemble image element, star, caption and description from arrays with list elements and store in a variable
  imageList.push(image); //Store(push) the assembled list codes into an array
}

//Display all eleven image codes stored in the array
//join("") glues the list items together with nothing in between (no commas)
document.getElementById("album").innerHTML = imageList.join("");

//TESTS: refresh the page and watch the display order change while the
//original captionTexts array always stays in its original order
console.log("Display order this refresh →", order);
console.log("Original captionTexts (unchanged) →", captionTexts);

//============================================
//Search filter — as the user types, only photos whose caption
//contains the typed text stay visible. No page reload needed.
//============================================
var searchBox = document.getElementById("search"); //The text input above the gallery
var listItems = document.getElementById("album").getElementsByTagName("li"); //All 11 photo list items

//INPUT EVENT LISTENER: runs every time the text in the box changes
searchBox.addEventListener("input", function () {
  var searchText = searchBox.value.toLowerCase(); //Lowercase the typed text (case-insensitive match)

  //Loop through every photo in the gallery
  for (var i = 0; i < listItems.length; i++) {
    var captionText = listItems[i].getElementsByClassName("caption")[0].innerText.toLowerCase(); //Lowercase this photo's caption

    //indexOf returns -1 when the typed text is NOT found in the caption.
    //An empty search box is "found" in every caption (indexOf returns 0),
    //so all photos become visible again automatically.
    if (captionText.indexOf(searchText) == -1) {
      listItems[i].classList.add("hidden"); //No match — hide this photo
    } else {
      listItems[i].classList.remove("hidden"); //Match — show this photo
    }
  }
});

//============================================
//Favorites — click the star near a photo to add it to favorites.
//A counter shows how many are starred. Maximum of 3: starring a
//4th photo throws an alert instead.
//============================================
var favCount = 0; //How many photos are currently starred
var maxFavs = 3; //The most photos allowed in favorites
var stars = document.getElementsByClassName("star"); //All 11 star elements

//The function that runs when any star is clicked
function starClick() {
  //"this" is the exact star that was clicked
  if (this.classList.contains("starred")) {
    //Already starred — clicking again removes it from favorites
    this.classList.remove("starred");
    this.innerText = "☆"; //Back to the empty star
    favCount--; //One less favorite
  } else if (favCount == maxFavs) {
    //Trying to star a 4th photo — not allowed!
    alert("You can star only " + maxFavs + " photos at max! Unstar one first.");
  } else {
    //Room available — add this photo to favorites
    this.classList.add("starred");
    this.innerText = "★"; //Filled star
    favCount++; //One more favorite
  }

  //Update the favorites counter on the page
  document.getElementById("fav-count").innerText = favCount;
}

//Attach the click listener to every star in the gallery
for (var i = 0; i < stars.length; i++) {
  stars[i].addEventListener("click", starClick);
}
