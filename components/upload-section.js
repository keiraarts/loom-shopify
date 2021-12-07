import React, { useState, useEffect, useContext } from "react";
import { Provider, Context } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import useStorefront from "../hooks/useStorefront";
import { useCountState } from "../src/app-context";
import { CreateInstance } from "../src/axios";
import { DokaModal } from "../lib/doka/react";
import Toast from "./toast";
import Button from "./button";

const SELECTION = "soap-bar";

function Section() {
  const state = useCountState();
  const { data: storefront } = useStorefront();
  const handlePDFInput = React.useRef(null);
  const handlePNGInput = React.useRef(null);
  const instance = CreateInstance(state);

  const app = useContext(Context);

  const redirectToCanva = () => {
    const redirect = Redirect.create(app);

    redirect.dispatch(Redirect.Action.REMOTE, {
      url: "https://canva.com",
      newContext: true,
    });
  };

  const [enabled, setEnabled] = useState(false);
  const [png, setPNG] = useState([]);
  const [pdf, setPDF] = useState([]);

  const [pngLoading, setPNGLoading] = useState(false);
  const [pdfLoading, setPDFLoading] = useState(false);

  async function handleChange({ file, requirement }) {
    const imageType = file?.type;

    if (imageType !== requirement) {
      Toast({
        message: `Can you upload an ${requirement} instead?`,
        error: true,
      });

      return;
    }

    if (["image/jpeg", "image/png", "image/svg+xml"].includes(imageType)) {
      setPNG([file]);
      handleToggle();
    } else {
      setPDF([file]);
      handleFileUpload([file]);
    }
  }

  function handleToggle() {
    setEnabled(!enabled);
  }

  function handleDokaConfirm(output) {
    setEnabled(false);
    setPNG([output.file]);

    Toast({
      message: "Next, please Upload Canva's PDF file",
      success: true,
    });
  }

  function handleDokaCancel() {
    setEnabled(false);
    setPDF([]);
    setPNG([]);
  }

  async function handleFileUpload(dokaOuput) {
    const version = Date.now();
    const pngData = new FormData();
    const pdfData = new FormData();

    pdfData.append("username", storefront?.username);
    pdfData.append("product", SELECTION);
    pdfData.append("version", version);
    pdfData.append("file", dokaOuput[0]);

    pngData.append("username", storefront?.username);
    pngData.append("product", SELECTION);
    pngData.append("version", version);
    pngData.append("file", png[0]);

    // /upload/:product/pdf
    setPDFLoading(true);

    await instance
      .post(`upload/pdf`, pdfData)
      .then(async () => {
        setPDFLoading(false);
        setPNGLoading(true);

        await instance
          .post(`upload/png`, pngData)
          .then(() => {
            Toast({
              message: "Your files have uploaded, photos will update shortly",
              success: true,
            });
          })

          .catch(() => {
            Toast({
              message: "The file didn't meet your size requirements",
              cta: "Message support",
              error: true,
            });
          });
      })

      .catch(() => {
        Toast({
          message: "The file couldn't be uploaded",
          cta: "Message support",
          error: true,
        });
      });

    setPDFLoading(false);
    setPNGLoading(false);

    setEnabled(false);
    setPDF([]);
    setPNG([]);
  }

  return (
    <section className="bg-white rounded-lg shadow">
      {enabled && (
        <DokaModal
          utils={["crop", "filter", "color", "markup"]}
          cropAllowInstructionZoom={true}
          cropLimitToImageBounds={false}
          enabled={enabled}
          src={png[0]}
          onConfirm={(output) => handleDokaConfirm(output)}
          onCancel={(value) => handleDokaCancel(value)}
          labelButtonConfirm="Save Design"
          labelCropInstructionZoom="Scroll downwards to zoom into the image"
          cropAspectRatio={1115 + ":" + 610}
        />
      )}

      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Upload your Canva artwork
        </h3>
        <div className="pb-4 mt-2 sm:flex sm:items-start sm:justify-between">
          <div className="">
            <div className="max-w-xl mt-2 text-sm leading-loose text-gray-500 sm:text-sm">
              <p>
                You can upload custom artwork packaging from Canva. After
                creating your design save the image file (ends in .png) and
                print ready PDF file (ends in .pdf) and upload them to our app.
              </p>
            </div>

            <div className="flex justify-start mt-5">
              <p
                onClick={redirectToCanva}
                className="mt-2 text-xs text-center text-gray-800 cursor-pointer hover:underline hover:text-gray-800"
              >
                Create a 1150px by 560px Canva file{" "}
                <svg
                  className="inline-flex w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </p>
            </div>
          </div>
          <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
            <span className="inline-flex w-full rounded-md shadow-sm">
              <input
                type="file"
                ref={handlePNGInput}
                accept={`”image/*”`}
                capture="environment"
                style={{
                  display: "none",
                }}
                onChange={(event) => {
                  console.log({ event });
                }}
              />

              <input
                type="file"
                accept=".pdf"
                ref={handlePDFInput}
                onChange={(event) => {
                  handleChange({
                    file: event.target.files[0],
                    requirement: "application/pdf",
                    type: ["application/pdf"],
                  });
                }}
                style={{
                  display: "none",
                }}
              />

              <span className={`flex justify-between flex-col w-full z-0`}>
                <Button
                  fullWidth={true}
                  loading={pngLoading}
                  onClick={() => handlePNGInput.current.click()}
                  status={!pdf?.length ? "primary" : "outline"}
                  disabled={png?.length}
                >
                  {png.length > 0 ? (
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 mr-2 check"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 mr-2 check"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      ></path>
                    </svg>
                  )}
                  Upload .png
                </Button>

                <Button
                  fullWidth={true}
                  disabled={!png?.length}
                  loading={pdfLoading}
                  onClick={(event) => handlePDFInput.current.click()}
                  status={!png?.length ? "primary" : "outline"}
                >
                  {pdf.length > 0 ? (
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 mr-2 check"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 mr-2 check"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      ></path>
                    </svg>
                  )}
                  Upload .pdf
                </Button>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section;
