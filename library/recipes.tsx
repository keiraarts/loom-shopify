import React from "react";
import { RecipeDetails } from "../components/integration-layout";

const recipes: RecipeDetails[] = [
  {
    key: "product-feedback",
    title: "Collect product questions",
    images: [{ src: "/recipes/support-products-recipe.png" }],
    prose: [
      {
        heading: "How shops use this recipe",
        body: [
          <React.Fragment>
            Customers will make their purchasing decisions from your products'
            landing pages. Designing this page to be informative for customers
            will help you convert the most amount of visitors into customers
            because they won't need to compare products or browse frequently
            asked questions on other pages.
          </React.Fragment>,
          <React.Fragment>
            However it's hard to catch-all customer questions and you can add
            HonestyCore below any product page to let customers record their
            screen to ask questions they have instead of going through a live
            chat where you might forfeit most of the nuances of the customer's
            questions.
          </React.Fragment>,
        ],
      },
      {
        heading: "Most common questions recieved",
        body: [
          <React.Fragment>
            <ul role="list">
              <li>Customers record video comparisons between other products</li>
              <li>Recieve explain a complex purchase decision</li>
              <li>Customers show other brands to understand comptability</li>
            </ul>
          </React.Fragment>,
        ],
      },
      {
        heading: "How to add it",
        body: [
          "This will work on all Shopify Online Store 2.0 Themes",
          <React.Fragment>
            <ul role="list">
              <li>Navigate to your shop's theme editor</li>
              <li>Select the template 'Default product' for editing</li>
              <li>Select 'Add block' on the left menu to add HonestyCore</li>
              <li>Design the button to match your buy button stylings</li>
            </ul>
          </React.Fragment>,
        ],
      },
    ],
  },
  {
    key: "reduce-support-churn",
    title: "Reduce support churn",
    images: [{ src: "/recipes/support-customers.png" }],
    prose: [
      {
        heading: "How shops use this recipe",
        body: [
          <React.Fragment>
            For shops that can't provide 24/7 phone support you can replace your
            generic Zendesk tickets with an easy way for customers to record an
            audio message to ask their questions. Add HonestyCore below your
            contact form and you can give customers the optionally to decide how
            they want to reach your shop.
          </React.Fragment>,
          <React.Fragment>
            Any questions you receive through HonestyCore will be sent to your
            email inbox that'll look exactly like the format of your previous
            email tickets. You'll be able to watch or listen to the customer's
            question and reply back through email.
          </React.Fragment>,
        ],
      },
      {
        heading: "Most common questions recieved",
        body: [
          <React.Fragment>
            <ul role="list">
              <li>
                Reduce support churn; get more inbound questions that can help
                you talk with customers that don't want to type out complex
                problems.
              </li>
              <li>
                Build better relationships with customers by talking to them and
                listening to their problems .
              </li>
              <li>
                If a customer discovers a problem with your site they can record
                a video message instead of attaching several screenshots.
              </li>
            </ul>
          </React.Fragment>,
        ],
      },
      {
        heading: "How to add it",
        body: [
          "This will work on all Shopify Online Store 2.0 Themes",
          <React.Fragment>
            <ul role="list">
              <li>Navigate to your shop's theme editor</li>
              <li>Select the template 'Other pages' for editing</li>
              <li>Then select the 'Contact page' to preview it</li>
              <li>Select 'Add block' on the left menu to add HonestyCore</li>
              <li>Design the button to match your buy button stylings</li>
            </ul>
          </React.Fragment>,
        ],
      },
    ],
  },

  {
    key: "increase-your-sales",
    title: "Increase your product sales",
    images: [{ src: "/recipes/product-search-questions.png" }],
    prose: [
      {
        heading: "How shops use this recipe",
        body: [
          <React.Fragment>
            If customers are searching for products ony our shop that you might
            not have, don't wait to surface up their search query in yur
            analytics month later. Prompt those customers to record a video
            question and let them record their screen, an audio message, or
            themselves to communicate what they're looking to purchase.
          </React.Fragment>,
        ],
      },
      {
        heading: "Most common questions recieved",
        body: [
          <React.Fragment>
            <ul role="list">
              <li>
                Discover new products by seeing what products are looking to
                purchase.
              </li>
              <li>
                Add a clear call-to-action to search pages that capture
                customer's curiosity.
              </li>
            </ul>
          </React.Fragment>,
        ],
      },
      {
        heading: "How to add it",
        body: [
          "This will work on all Shopify Online Store 2.0 Themes",
          <React.Fragment>
            <ul role="list">
              <li>Navigate to your shop's theme editor</li>
              <li>Select the template 'Other pages' for editing</li>
              <li>Then select the 'search' to preview it</li>
              <li>Select 'Add block' on the left menu to add HonestyCore</li>
              <li>Design the button to match your buy button stylings</li>
            </ul>
          </React.Fragment>,
        ],
      },
    ],
  },

  {
    key: "ask-for-videos",
    title: "Ask for video applications",
    images: [{ src: "/recipes/ask-for-video-applications.png" }],
    prose: [
      {
        heading: "How shops use this recipe",
        body: [
          <React.Fragment>
            If customers are searching for products ony our shop that you might
            not have, don't wait to surface up their search query in yur
            analytics month later. Prompt those customers to record a video
            question and let them record their screen, an audio message, or
            themselves to communicate what they're looking to purchase.
          </React.Fragment>,
        ],
      },
      {
        heading: "Most common questions recieved",
        body: [
          <React.Fragment>
            <ul role="list">
              <li>
                Discover new products by seeing what products are looking to
                purchase.
              </li>
              <li>
                Add a clear call-to-action to search pages that capture
                customer's curiosity.
              </li>
            </ul>
          </React.Fragment>,
        ],
      },
      {
        heading: "How to add it",
        body: [
          "This will work on all Shopify Online Store 2.0 Themes",
          <React.Fragment>
            <ul role="list">
              <li>Navigate to your shop's theme editor</li>
              <li>Select the template 'Other pages' for editing</li>
              <li>Then select the 'search' to preview it</li>
              <li>Select 'Add block' on the left menu to add HonestyCore</li>
              <li>Design the button to match your buy button stylings</li>
            </ul>
          </React.Fragment>,
        ],
      },
    ],
  },

  {
    key: "file-attachments",
    title: "Let customers attach files",
    images: [{ src: "/recipes/support-customers.png" }],
    prose: [
      {
        heading: "How shops use this recipe",
        body: [
          <React.Fragment>
            For shops that can't provide 24/7 phone support you can replace your
            generic Zendesk tickets with an easy way for customers to record an
            audio message to ask their questions. Add HonestyCore below your
            contact form and you can give customers the optionally to decide how
            they want to reach your shop.
          </React.Fragment>,
          <React.Fragment>
            Any questions you receive through HonestyCore will be sent to your
            email inbox that'll look exactly like the format of your previous
            email tickets. You'll be able to watch or listen to the customer's
            question and reply back through email.
          </React.Fragment>,
        ],
      },
      {
        heading: "Most common questions recieved",
        body: [
          <React.Fragment>
            <ul role="list">
              <li>
                Reduce support churn; get more inbound questions that can help
                you talk with customers that don't want to type out complex
                problems.
              </li>
              <li>
                Build better relationships with customers by talking to them and
                listening to their problems .
              </li>
              <li>
                If a customer discovers a problem with your site they can record
                a video message instead of attaching several screenshots.
              </li>
            </ul>
          </React.Fragment>,
        ],
      },
      {
        heading: "How to add it",
        body: [
          "This will work on all Shopify Online Store 2.0 Themes",
          <React.Fragment>
            <ul role="list">
              <li>Navigate to your shop's theme editor</li>
              <li>Select the template 'Other pages' for editing</li>
              <li>Then select the 'Contact page' to preview it</li>
              <li>Select 'Add block' on the left menu to add HonestyCore</li>
              <li>Design the button to match your buy button stylings</li>
            </ul>
          </React.Fragment>,
        ],
      },
    ],
  },
];
export default recipes;
