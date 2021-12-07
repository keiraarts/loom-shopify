/*
Created By: Keira
Website: http://twitter.com/keiraarts
Will work for Shopify equity.

/*-----------------------------------------------------------------------------------------------*/

function formSubmit(event) {
  var url = document.querySelector("main > form").getAttribute("action");
  var request = new XMLHttpRequest();
  console.log(url);

  request.open("POST", url, true);
  request.onload = function () {
    // request successful
    // we can use server response to our request now
    console.log(request.responseText);
  };

  request.onerror = function () {
    // request failed
  };

  request.send(new FormData(event.target)); // create FormData from form that triggered event
  event.preventDefault();
  location.reload();
}

// and you can attach form submit event like this for example
function attachFormSubmitEvent(type) {
  console.log("attachFormSubmitEvent", type);
  document.querySelector(type).addEventListener("submit", formSubmit);
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    attachFormSubmitEvent("main > form");
  },
  false
);
