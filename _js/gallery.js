"use strict";

//Wählt mid math. beliebigen link tag aus, liest URL und Beschreibung aus, gibts an a andere function weiter und markiert des ausgewählte Bild
function showRandomImageAtStart() {
  const linkSelector = document.querySelectorAll("#thumbnails a");
  const randomNumber = Math.floor(Math.random() * linkSelector.length);
  const randomEntry = linkSelector[randomNumber];
  const imageUrl = randomEntry.href;
  const imageDescription = randomEntry.querySelector("img").alt;
  switchFullImage(imageUrl, imageDescription);
  const cardBody = randomEntry.nextElementSibling;
  cardBody.classList.add("bg-dark", "text-white");
  //All done and working
}

//Funktion mit integrierter callback/arrow-function die de bildmarkierungen ändert und die neue URL/Beschreibung selektiert
function prepareLinks() {
  const linkSelector = document.querySelectorAll("#thumbnails a");
  linkSelector.forEach((newEvent) => {
    newEvent.addEventListener("click", function (actualEvent) {
      actualEvent.preventDefault();
      const usedCardBody = document.querySelector(".bg-dark.text-white");
      usedCardBody.classList.remove("bg-dark", "text-white");
      this.nextElementSibling.classList.add("bg-dark", "text-white");
      const imageUrl = this.href;
      const imageDescription = this.querySelector("img").alt;
      switchFullImage(imageUrl, imageDescription);
      const key = imageUrl;
      loadNotes(key);
    });
  });
  //All done and working
}

//  Stores or deletes the updated notes of an image after they have been changed.
function storeNotes() {
  const notes = document.querySelector("#notes");
  notes.addEventListener("blur", function (event) {
    const notesValue = event.target.value;
    const imgUrl = document.querySelector(".figure-img");
    const key = imgUrl.src;
    localStorage.setItem(key, notesValue);
    if (notesValue === "") {
      localStorage.removeItem(key);
    }
  });
}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
//i vasteh neh wos der kommentar/code da drüber bedeutet owa hey, i habs trotzdem gschafft dass de funktion drunter trotzdem des große Bild tauschen kann :D
function switchFullImage(imageUrl, imageDescription) {
  const fullImage = document.querySelector(".figure-img");
  fullImage.src = imageUrl;
  fullImage.alt = imageDescription;
  let figCaptionElement = document.querySelector(".figure-caption");
  figCaptionElement.textContent = imageDescription;
  //All done and working
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
  const allNotes = document.querySelector("#notes");
  const checkStorage = localStorage.getItem(key);
  if (checkStorage !== null) {
    allNotes.innerText = checkStorage;
  } else {
    allNotes.innerText = "Enter your notes here!";
  }
}

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();
