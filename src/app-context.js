import React from "react";
import { mutate } from "swr";
import Toast from "../components/toast";
import { CreateInstance } from "./axios";

const CountStateContext = React.createContext();
const CountDispatchContext = React.createContext();

function countReducer(state, action) {
  switch (action.type) {
    case "SET_USERNAME": {
      return { ...state, username: action.username };
    }

    case "UPDATE_SESSION_TOKEN": {
      return {
        ...state,
        session_token: action.token,
        shop_origin: action.shop_origin,
        shopify_token: action?.shopify_token,
      };
    }

    case "SET_VIEW": {
      // Set which tab should be shown on dashboard
      return { ...state, view: action?.view ?? false };
    }

    case "SET_AWAIT_FEEDBACK": {
      return { ...state, await_feedback: action.state };
    }

    case "SET_MODAL_VIEW": {
      const view = action?.view;
      const isDuplicate = state?.modal_view === action?.view;

      return {
        ...state,
        loom: action?.loom,
        modal_view: isDuplicate ? false : view,
      };
    }

    case "SET_STOREFRONT": {
      const storefront = state?.storefront ?? {};
      const update = { ...storefront, ...action.storefront };
      return { ...state, storefront: update };
    }

    case "SAVE_STOREFRONT": {
      // This should not be the action to control shop's state
      // DynamoDB will ignore falsey values
      const update = state?.storefront;
      const username = state?.username;
      const axios = CreateInstance(state);

      axios
        .put(`${username}/storefront`, update)
        .then(() => Toast({ message: "Saved", success: true }))
        .catch(() => {});

      mutate(
        `/storefront`,
        (cache) => {
          return { ...cache, ...update };
        },
        false
      );

      return { ...state, storefront: update };
    }

    case "UPDATE_VIDEO": {
      // This should not be the action to control shop's state
      // DynamoDB will ignore falsey values
      const video = action.video;
      const username = state.username;
      const axios = CreateInstance(state);

      axios
        .put(`${username}/storefront/videos/${video.id}`, video)
        .catch(() => {});

      mutate(
        `/storefront/videos`,
        (cache) => {
          return cache.map((el) => {
            if (el.id === video.id) return video;
            else return el;
          });
        },
        false
      );

      return { ...state };
    }

    case "DELETE_VIDEO": {
      // This should not be the action to control shop's state
      // DynamoDB will ignore falsey values
      const video = action.video;
      const username = state.username;
      const axios = CreateInstance(state);

      axios
        .delete(`${username}/storefront/videos/${video.id}`)
        .then(() => Toast({ message: "Deleted video", success: true }))
        .catch(() => {});

      mutate(
        `/storefront/videos`,
        (cache) => {
          const update = cache.map((el) => {
            if (el.id === video.id) return false;
            else return el;
          });

          return update.filter(Boolean);
        },
        false
      );

      return state;
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CountProvider({ children, ...args }) {
  const [state, dispatch] = React.useReducer(countReducer, {
    session_token: false,
    tutorial: "introduction",
    await_feedback: false,
    view: "dashboard",
    modal_view: false,
    ...args,
  });

  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
}

function useCountState() {
  const context = React.useContext(CountStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
}

function useCountDispatch() {
  const context = React.useContext(CountDispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
}

export { CountProvider, useCountState, useCountDispatch };
