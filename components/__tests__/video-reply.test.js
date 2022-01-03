/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "../../src/test-utils";
import userEvent from "@testing-library/user-event";
import VideoReply from "../video-reply";

test("Test the form to submit a mock video reply", () => {
  let submittedData;
  const mAlias = "Alice.C";
  const mBody = "This is a test that messaging works!";

  const onComplete = (data) => {
    submittedData = data;
  };

  render(<VideoReply onComplete={onComplete} />);

  // Clear any placeholders
  userEvent.clear(screen.getByRole("textbox", { name: /comment/i }));
  userEvent.clear(screen.getByRole("textbox", { name: /initials/i }));
  // Write new content
  userEvent.type(screen.getByRole("textbox", { name: /comment/i }), mBody);
  userEvent.type(screen.getByRole("textbox", { name: /initials/i }), mAlias);
  // Submit event data
  userEvent.click(screen.getByRole("button", { name: /send message/i }));
  expect(submittedData).toEqual({ body: mBody, alias: mAlias });
});
