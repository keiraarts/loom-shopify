import { useRef, useState, useEffect, useLayoutEffect } from "react";
const API_KEY = "b2f23052-4a5d-4f06-a26e-308d91786767";
import { setup } from "@loomhq/loom-sdk";
import { oembed } from "@loomhq/loom-embed";

let calledSetup = false;
function RecordButton({ onInsert }) {
  const [loomSDK, setLoomSDK] = useState(null);

  const buttonRef = useRef(null);

  useEffect(() => {
    async function fetchLoom() {
      if (calledSetup) {
        return;
      } else {
        calledSetup = true;
        const response = await setup({
          apiKey: API_KEY,
        });
        console.log(response);
        if (!loomSDK) {
          setLoomSDK(response);
        }
      }
    }

    fetchLoom();
  }, [loomSDK]);

  useLayoutEffect(() => {
    if (buttonRef?.current && loomSDK !== null) {
      loomSDK.configureButton({
        element: buttonRef.current,
        hooks: {
          onInsertClicked: (shareData) => {
            onInsert(shareData.sharedUrl);
          },
        },
      });
    }
  }, [loomSDK, onInsert]);

  return <button ref={buttonRef}>Click to Record</button>;
}

export default function LoomComponent() {
  const [embedHTML, setEmbedHTML] = useState("");

  return (
    <div className="loom">
      <RecordButton
        onInsert={(url) =>
          oembed(url).then((embed) => setEmbedHTML(embed.html))
        }
      />
      <div dangerouslySetInnerHTML={{ __html: embedHTML }} />
    </div>
  );
}
