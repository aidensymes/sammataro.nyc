import { Template } from "tinacms";

export const defaultPageConfig: Template = {
  name: "default",
  label: "Default Page",
  ui: {
    defaultItem: {
      layout: "default",
    },
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
      isTitle: true,
      required: true,
    },
    {
      name: "layout",
      label: "Layout",
      type: "string",
    },
    {
      name: "permalink",
      label: "Permalink",
      type: "string",
    },
  ],
};
