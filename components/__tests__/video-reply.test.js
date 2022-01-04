/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "../../src/test-utils";
import userEvent from "@testing-library/user-event";
import VideoReply from "../video-reply";

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.post(
    "https://undefined/api/v1/demo/storefront/videos/reply",
    async (req, res, ctx) => {
      if (!req.body.body) return res(ctx.status(403));
      return res(ctx.json({}));
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());

test("Test the form to submit a mock video reply", async () => {
  const alias = "Alice.C";
  const body = "This is a test that messaging works!";
  const onComplete = jest.fn();

  render(<VideoReply onComplete={onComplete} />);

  // Clear any placeholders
  userEvent.clear(screen.getByRole("textbox", { name: /comment/i }));
  userEvent.clear(screen.getByRole("textbox", { name: /initials/i }));
  // Write new content
  userEvent.type(screen.getByRole("textbox", { name: /comment/i }), body);
  userEvent.type(screen.getByRole("textbox", { name: /initials/i }), alias);
  // Submit event data
  userEvent.click(screen.getByRole("button", { name: /send message/i }));
  expect(onComplete).toHaveBeenCalledWith({ alias, body });

  await screen.findByText(/sending/i);
  expect(screen.getByText(/Email sent!/i)).toBeInTheDocument();
});

test("Test the form to submit a mock video reply", async () => {
  const alias = "Alice.C";
  const body = "This is a test that messaging works!";
  const onComplete = jest.fn();

  render(<VideoReply onComplete={onComplete} />);

  // Clear any placeholders
  userEvent.clear(screen.getByRole("textbox", { name: /comment/i }));
  userEvent.clear(screen.getByRole("textbox", { name: /initials/i }));
  // Write new content
  userEvent.type(screen.getByRole("textbox", { name: /comment/i }), body);
  userEvent.type(screen.getByRole("textbox", { name: /initials/i }), alias);
  // Submit event data
  userEvent.click(screen.getByRole("button", { name: /send message/i }));
  expect(onComplete).toHaveBeenCalledWith({ alias, body });

  await screen.findByText(/email sent!/i);

  expect(
    screen.getByRole("button", { name: /email sent/i }).textContent
  ).toMatchInlineSnapshot(`"Email sent!"`);
});
