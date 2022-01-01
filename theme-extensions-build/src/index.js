import { isSupported, setup } from "@loomhq/loom-sdk/dist/cjs/safe";

async function init() {
  const APP_ID = "47a9781a-1c42-4f28-b857-7ff9e72bed19";
  // The user_id does not have an expection to be provided
  const USER_ID = document.getElementById("loom-key").value;
  const root = document.getElementById("app");
  const button = document.getElementById("loom-sdk-button");
  if (!root) return;

  const { supported, error } = await isSupported();
  if (!button) return;

  if (!supported) {
    button.setAttribute("supported", supported);
    button.setAttribute("error", error.toString());
    return;
  }

  const { configureButton } = await setup({
    // Use the user's secret, otherwise defaults
    apiKey: USER_ID || APP_ID,
  });

  let loom; // hold the loom sdk response
  const sdkButton = configureButton({ element: button });

  sdkButton.on("insert-click", async (video) => {
    const email = document.getElementById("reply-email").value;
    // Submit video if a valid email is provided
    if (email !== "") SubmitVideo(video);
    // Else prompt the user to enter email before POST request
    else {
      document.getElementById("reply-email").style.display = "block";
      document.getElementById("submit-email").style.display = "block";
      document.getElementById("reply-email").focus();
      button.style.display = "none";
      loom = video;
    }
  });

  // If the record button is clicked again, but a video is available
  // Shows that a previous recording should be submitted with the email input
  document.getElementById("submit-email").addEventListener("click", () => {
    if (loom && document.getElementById("reply-email").value !== "")
      SubmitVideo(loom);
  });

  document.getElementById("loom-sdk-button").addEventListener("click", () => {
    if (!supported) {
      const errorMessage = document.getElementById("loom-error-message");
      // show the default error if the button isn't supported
      errorMessage.style.display = "block";
      // highlight the error message in red
      errorMessage.style.color = "rgb(179, 27, 27);";
    }
  });

  sdkButton.on("cancel", () => {
    console.log("Recording cancelled");
    loom = false;
  });
}

async function SubmitVideo(video) {
  // Hide form to prevent another recording
  const username = document.getElementById("username").value;
  document.getElementById("submit-video").style.display = "none";
  // Hide icon and replace with a checkmark
  document.getElementById("icon-section").style.display = "none";
  document.getElementById("checkmark-section").style.display = "flex";
  // Replace headline text
  document.getElementById("video-headlines").style.display = "none";
  document.getElementById("success-message").style.display = "flex";

  // Attach meta to form for debugging
  document.getElementById("loom-url").setAttribute("href", video.sharedUrl);

  const xhr = new XMLHttpRequest();
  const url = `https://sr3cicodqk.execute-api.us-east-1.amazonaws.com/Production/loom-dynamodb`;
  xhr.open("POST", url);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
    }
  };

  const params = {
    TableName: "loom-core",
    Item: {
      ...video,
      // liquid
      page_title: document.getElementById("page-title").value,
      page_url: document.getElementById("page-url").value,
      customer: document.getElementById("customer").value,
      email: document.getElementById("reply-email").value,
      date_created: new Date().toISOString(),
      // primary keys
      pk: `USERNAME#` + username.replace(".myshopify.com", ""),
      sk: `LOOM#` + video.id,
      status: "unread",
    },
  };

  xhr.send(JSON.stringify(params));
}

init();
