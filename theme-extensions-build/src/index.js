import { isSupported, setup } from "@loomhq/loom-sdk/dist/cjs/safe";

async function init() {
  const api_key = document.getElementById("loom-key").value;
  const root = document.getElementById("app");
  const button = document.getElementById("loom-sdk-button");
  if (!root) return;

  const { supported, error } = await isSupported();
  button.setAttribute("supported", supported);
  if (!button) return;

  if (!supported) {
    button.setAttribute("error", error);
    return;
  }

  const { configureButton } = await setup({
    apiKey: api_key,
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
