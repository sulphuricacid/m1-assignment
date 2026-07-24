var photos = [];
var fileNames = [];
var imageList = [];
var image;
var openList = "<li id='photo";
var closeList = "</li>";
var openCaptionTag = "<p class='caption'>";
var closeCaptionTag = "</p>";
var openDescTag = "<p class='description'>";
var closeDescTag = "</p>";
var starTag = "<span class='star'>☆</span>";

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

//Only shown in the info box, not on the hover description bar
var funFacts = [
  "Fun fact: our adoption events run every first Saturday of the month at Piedmont Park.",
  "Fun fact: golden retrievers are one of the most popular family dog breeds in Georgia.",
  "Fun fact: black cats are adopted less often than any other color — Luna is out to change that.",
  "Fun fact: puppies Bailey's age need a potty break at least twice an hour!",
  "Fun fact: pet rabbits can live up to 10 years — a longer commitment than most people expect.",
  "Fun fact: Willow is already spayed, vaccinated, and microchipped, ready to go home today.",
  "Fun fact: bonded pairs like these two get a discounted adoption fee when adopted together.",
  "Fun fact: Georgia sees snow so rarely most of our shelter pets have never seen it before!",
  "Fun fact: a cat's eye color is fully set by around 12 weeks old.",
  "Fun fact: 'tabby' isn't a breed — it describes any cat with that classic striped coat pattern.",
  "Fun fact: Labrador retrievers have been America's most popular dog breed for over 30 years."
];

//Shuffle a separate array of index numbers so captionTexts/descTexts
//stay in their original order and can still be indexed by photo number
var order = [];
for (var i = 0; i < 11; i++) {
  order.push(i);
}

for (var i = order.length - 1; i > 0; i--) {
  var j = Math.floor(Math.random() * (i + 1));
  var temp = order[i];
  order[i] = order[j];
  order[j] = temp;
}

for (var i = 0; i < 11; i++) {
  var pick = order[i];
  fileNames.push("gallery" + (pick + 1));
  photos.push("<img src='images/gallery/" + fileNames[i] + ".jpg' alt='" + captionTexts[pick] + "'>");
  image = openList + (pick + 1) + "'>" + photos[i] + starTag + openCaptionTag + captionTexts[pick] + closeCaptionTag + openDescTag + descTexts[pick] + closeDescTag + closeList;
  imageList.push(image);
}

document.getElementById("album").innerHTML = imageList.join("");

console.log("Display order this refresh →", order);
console.log("Original captionTexts (unchanged) →", captionTexts);

//Search filter — hides photos whose caption doesn't match as the user types
var searchBox = document.getElementById("search");
var listItems = document.getElementById("album").getElementsByTagName("li");

searchBox.addEventListener("input", function () {
  var searchText = searchBox.value.toLowerCase();

  for (var i = 0; i < listItems.length; i++) {
    var captionText = listItems[i].getElementsByClassName("caption")[0].innerText.toLowerCase();

    if (captionText.indexOf(searchText) == -1) {
      listItems[i].classList.add("hidden");
    } else {
      listItems[i].classList.remove("hidden");
    }
  }
});

//Favorites — star up to 3 photos, counter updates as you star/unstar
var favCount = 0;
var maxFavs = 3;
var stars = document.getElementsByClassName("star");

function starClick() {
  if (this.classList.contains("starred")) {
    this.classList.remove("starred");
    this.innerText = "☆";
    favCount--;
  } else if (favCount == maxFavs) {
    alert("You can star only " + maxFavs + " photos at max! Unstar one first.");
  } else {
    this.classList.add("starred");
    this.innerText = "★";
    favCount++;
  }

  document.getElementById("fav-count").innerText = favCount;
}

for (var i = 0; i < stars.length; i++) {
  stars[i].addEventListener("click", starClick);
}

//Info box — click a photo's description bar to open a box that floats
//above the gallery with its heading, extra info, and a close link
var infoBoxData = [];
for (var i = 0; i < captionTexts.length; i++) {
  infoBoxData.push({
    heading: captionTexts[i],
    text: descTexts[i] + " " + funFacts[i],
    closeText: "Click This To Close"
  });
}

var openHeadingTag = "<h3>";
var closeHeadingTag = "</h3>";
var openTextTag = "<p>";
var closeTextTag = "</p>";

var infoBox = document.getElementById("info-box");
var descBars = document.getElementsByClassName("description");
var openCount = 0;
var openCountDisplay = document.getElementById("open-count");

//All description bars share this one #info-box element, so opening a new
//photo's box always overwrites whatever was showing — only one box can
//ever be visible, and a close can never reach a different photo's box
function openInfoBox() {
  var photoId = this.parentElement.id;
  var index = parseInt(photoId.replace("photo", "")) - 1;
  var data = infoBoxData[index];

  var heading = openHeadingTag + data.heading + closeHeadingTag;
  var text = openTextTag + data.text + closeTextTag;
  var closeLink = "<a href='#' id='info-close'>" + data.closeText + "</a>";

  infoBox.innerHTML = heading + text + closeLink;
  infoBox.classList.add("is-open");

  openCount++;
  openCountDisplay.innerText = openCount;
}

function closeInfoBox() {
  infoBox.classList.remove("is-open");
}

for (var i = 0; i < descBars.length; i++) {
  descBars[i].addEventListener("click", openInfoBox);
}

//Delegated listener registered once, instead of re-attaching to a new
//close link every time innerHTML rebuilds the box
infoBox.addEventListener("click", function (e) {
  if (e.target.id === "info-close") {
    e.preventDefault();
    closeInfoBox();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeInfoBox();
  }
});

//Ignores clicks inside the box and the description-bar click that just
//opened it — both fire on this same document listener via bubbling, so
//without the checks the box would open and instantly close in one click
document.addEventListener("click", function (e) {
  var clickedInsideBox = infoBox.contains(e.target);
  var clickedADescriptionBar = e.target.classList.contains("description");
  if (!clickedInsideBox && !clickedADescriptionBar) {
    closeInfoBox();
  }
});
