import React, { Fragment, useState, useEffect } from "react";
import { RadioGroup, Switch } from "@headlessui/react";
import { PencilAltIcon, XIcon } from "@heroicons/react/outline";
import { useCountDispatch } from "../src/app-context";
import useStorefront from "../hooks/useStorefront";
import { useTranslation } from "react-i18next";
import Loading from "../components/loading";
import EmptyState from "./empty-state.tsx";
import classnames from "classnames";
import Avatar from "./avatar";
import Toast from "./toast";
import set from "lodash/set";
import cn from "classnames";

export default function Accounts() {
  const { data: storefront, isLoading } = useStorefront();
  const dispatch = useCountDispatch();
  const { t } = useTranslation();

  const [profile, setProfile] = useState(); // Selected profile
  const handleProfile = (el) => {
    // Find profie by it's input nickname
    const selected = profiles.find(({ nickname }) => nickname === el);
    setProfile(selected);
  };

  const [value, setValue] = useState(false); // selected nickname
  const [profiles, setProfiles] = useState([]); // Available profiles
  const [selectedEdit, setSelectedEdit] = useState(false); // Last edited

  const handleEdit = (v) => {
    setSelectedEdit(v === selectedEdit ? false : v);
    setValue(v.nickname);
    setProfile(v);
  };

  useEffect(() => {
    setProfiles(storefront?.profiles ?? []);
    const current = storefront?.profiles?.find((el) => el?.selected);

    setValue(current?.nickname);
    setProfile(current);
  }, []);

  return (
    <section
      aria-labelledby="profile_heading"
      class="border border-gray-300 rounded-md sm:rounded-lg"
    >
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-6 space-y-6 bg-white sm:p-6">
            <div className="flex flex-row justify-between">
              <h2
                id="profile_heading"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {t("headings.shipping_profiles")}
              </h2>
            </div>

            <RadioGroup value={profile?.nickname} onChange={handleProfile}>
              <RadioGroup.Label className="sr-only">
                Profiles for each team member
              </RadioGroup.Label>
              <div
                className={cn({
                  "bg-shopify-grey border border-gray-300":
                    profiles?.length === 0,
                  "relative -space-y-px bg-white py-4 rounded-md": true,
                })}
              >
                {isLoading && <Loading />}

                {!isLoading && profiles?.length === 0 && (
                  <EmptyState
                    headshot={"/marketing/D2wEMMUD_400x400.jpg"}
                    title={t("headings.engineering_role")}
                    quote={t("quotes.profile_tutorial")}
                    author={t("quotes.name")}
                  />
                )}

                {profiles?.map((profile, index) => (
                  <RadioGroup.Option
                    key={index}
                    value={profile.nickname}
                    className={({ checked, active }) =>
                      classnames({
                        "rounded-tl-md rounded-tr-md": index === 0,
                        "rounded-bl-md rounded-br-md":
                          index === profiles.length - 1,
                        "bg-green-100 border-green-300 z-10": checked || active,
                        "relative group border p-4 flex flex-col hover:bg-green-100 cursor-pointer md:pl-4 md:pr-6 sm:items-center sm:justify-between sm:flex-row focus:outline-none": true,
                      })
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex items-center justify-between w-full text-sm ">
                          <span className="flex items-center">
                            <span
                              className={classnames({
                                "bg-green-500 border-transparent group-hover:bg-green-500":
                                  checked || active,
                                "h-4 w-4 flex-0 rounded-full border flex items-center justify-center group-hover:bg-green-300": true,
                              })}
                              aria-hidden="true"
                            >
                              <span className="w-1 h-1 bg-white rounded-full" />
                            </span>

                            <Avatar name={profile.nickname} />

                            {selectedEdit?.nickname === profile.nickname ? (
                              <input
                                type="text"
                                value={value}
                                defaultValue={selectedEdit.nickname}
                                className="flex-1 block w-3/4 ml-3 border-gray-300 rounded-md shadow-sm sm:w-full h-9 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                onChange={(event) => {
                                  setValue(event?.target?.value);
                                }}
                              />
                            ) : (
                              <RadioGroup.Label
                                as="span"
                                className="flex-1 py-2 ml-3 font-semibold text-gray-900 capitalize"
                              >
                                {profile.nickname}
                              </RadioGroup.Label>
                            )}
                          </span>

                          <span>
                            <button
                              onClick={() => handleEdit(profile)}
                              className="outline-none focus:outline-none"
                            >
                              <span className="sr-only">Edit profile</span>
                              <PencilAltIcon className="inline-block w-5 h-5 ml-2 text-green-700 hover:text-green-800" />
                            </button>

                            <button
                              onClick={() => {
                                profiles.splice(index, 1);
                                setProfiles(profiles);

                                dispatch({
                                  type: "SAVE_PROFILES",
                                  profiles: profiles,
                                });
                              }}
                              className="outline-none focus:outline-none"
                            >
                              <span className="sr-only">Delete profile</span>
                              <XIcon className="inline-block w-5 h-5 ml-2 text-green-700 hover:text-red-600" />
                            </button>
                          </span>
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-row flex-wrap items-center justify-between px-4 py-3 text-left bg-white sm:px-6">
            <div className="flex-1 flex-shrink-0 w-3/5 pr-4 text-xs text-gray-700 sm:text-sm"></div>
            <div className="flex flex-row">
              <button
                onClick={() => {
                  if (!storefront?.plan && profiles?.length > 0) {
                    Toast({ message: "Upgrade plans to invite your team" });
                    return;
                  }

                  const modified = profiles.concat([
                    { nickname: "Partner account" },
                  ]);

                  setProfiles(modified);
                }}
                className={cn({
                  "inline-flex justify-center px-4 py-2 text-sm font-medium text-white sm:text-white bg-green-600 border rounded-md shadow-sm hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900":
                    !isLoading && profiles?.length === 0,
                  "inline-flex justify-center px-4 py-2 mr-4 text-sm font-medium text-black bg-white border rounded-md shadow-sm hover:border-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900": true,
                })}
              >
                {t("forms.add_profile")}
              </button>

              <button
                type="submit"
                onClick={() => {
                  // Find index position in profiles
                  const index = profiles.findIndex(
                    ({ nickname }) => nickname === profile?.nickname
                  );

                  // If selected is different from state
                  if (selectedEdit.nickname !== value) {
                    set(profiles, [[index], "nickname"], value);
                    setProfiles(profiles);
                  }

                  // Remove non-selected profiles
                  let pendingUpdate = profiles.map((el) => {
                    return { ...el, selected: false };
                  });

                  // Set the profile
                  setSelectedEdit(false);
                  set(pendingUpdate, [[index], "selected"], Date.now());
                  // Save the selection and eny edits alongside it.
                  // Future actions can find the selected object themselves
                  dispatch({ type: "SAVE_PROFILES", profiles: pendingUpdate });
                  Toast({ message: "Saved your profiles", success: true });
                }}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border rounded-md shadow-sm hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                {t("forms.save")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
