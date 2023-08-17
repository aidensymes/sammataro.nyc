import { Collection } from "tinacms";

export const postConfig: Collection = {
  name: "post",
  label: "Posts",
  path: "_posts",
  ui: {
    // Take the title, slugify it, prefix with current date for Jekyll to find
    // Source: https://dev.to/huwfulcher/how-to-integrate-tinacms-with-jekyll-1m6j
    filename: {
      readonly: false,
      slugify: (values) => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let currentDate = `${year}-${month}-${day}`;
        return `${currentDate}-${values?.title
          ?.toLowerCase()
          .replace(/ /g, "-")}`;
      },
    },
  },
  defaultItem: {
    layout: "default",
  },
  fields: [
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
    {
      name: "published",
      label: "Published",
      type: "boolean",
      required: true,
      description: "Should this be published",
    },
    {
      name: "title",
      label: "Title",
      type: "string",
      isTitle: true,
      required: true,
    },
    {
      name: "body",
      label: "Body",
      type: "rich-text",
      isBody: true,
    },
  ],
};
