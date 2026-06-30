// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from "@instantdb/react";

const rules = {
  $users: {
    allow: {
      // Users can view their own profile. Public profile fields (name, joinedAt)
      // are exposed via the `fields` rules below for a future community directory.
      view: "auth.id == data.id",
      // Anyone can sign up via Google OAuth. Validate extraFields written at signup.
      create: "true",
      // Users can update their own profile (e.g. name).
      update: "auth.id == data.id",
    },
    bind: {},
    fields: {
      // Email is private to the owner.
      email: "auth.id == data.id",
      // Public profile fields visible to anyone.
      name: "true",
      joinedAt: "true",
      imageURL: "true",
    },
  },
} satisfies InstantRules;

export default rules;
