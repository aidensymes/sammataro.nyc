import { defineConfig } from "tinacms";

const BRANCH = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

const TINA_PUBLIC_CLIENT_ID = String(process.env.TINA_PUBLIC_CLIENT_ID ?? "");
const TINA_TOKEN = String(process.env.TINA_TOKEN ?? "");
const TINA_SEARCH_TOKEN = String(process.env.TINA_SEARCH_TOKEN ?? "");

export default defineConfig({
  branch: BRANCH,
  clientId: TINA_PUBLIC_CLIENT_ID,
  token: TINA_TOKEN,
  build: {
    publicFolder: "/",
    outputFolder: "admin",
    basePath: "",
  },
  media: {
    tina: {
      publicFolder: "/",
      mediaRoot: "assets/uploads",
    },
  },
  schema: {
    collections: [
      {
        name: "settings",
        label: "Settings",
        path: "_settings",
        ui: {
          // Don't allow editors to create new settings items
          allowedActions: {
            create: false,
            delete: false,
          },
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.type?.toLowerCase()}-settings`;
            },
          },
        },
        templates: [
          {
            name: "global",
            label: "Global Settings",
            ui: {
              defaultItem: {
                type: "Global",
              },
            },
            fields: [
              {
                name: "type",
                label: "Settings Type",
                type: "string",
                options: ["Global"],
              },
              {
                name: "title",
                label: "Title",
                type: "string",
                description: "The title for the site.",
              },
              {
                name: "tagline",
                label: "Tagline",
                type: "string",
                description: "A short tagline for the site.",
              },
              {
                name: "description",
                label: "Description",
                type: "string",
                description: "A meta description of the site.",
              },
              {
                name: "logo",
                label: "Logo",
                type: "image",
                description: "The full logo.",
              },
              {
                name: "icon",
                label: "Icon",
                type: "image",
                description: "A smaller icon.",
              },
              {
                name: "hours",
                label: "Hours",
                type: "object",
                description: "The hours of operation.",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return {
                      label: item.day ? item.day : "New Day",
                    };
                  },
                },
                fields: [
                  {
                    name: "day",
                    label: "Day(s)",
                    type: "string",
                    description:
                      "Format as a three letter abbreviation (Mon, Tue, etc.).",
                  },
                  {
                    name: "hours",
                    label: "Hours",
                    type: "string",
                    description: "Open hours for this day.",
                  },
                ],
              },
            ],
          },
          {
            name: "nav",
            label: "Navigation Settings",
            ui: {
              defaultItem: {
                type: "Navigation",
                footer: {
                  sections: [
                    {
                      title: "Links",
                    },
                    {
                      title: "Social",
                    },
                    {
                      title: "Contact",
                    },
                  ],
                },
              },
            },
            fields: [
              {
                name: "type",
                label: "Settings Type",
                type: "string",
                options: ["Navigation"],
              },
              {
                name: "navbar",
                label: "Nav Bar",
                type: "object",
                description: "Settings for the upper navigation bar.",
                fields: [
                  {
                    name: "buttons",
                    label: "Buttons",
                    type: "object",
                    description:
                      "Buttons for the nav. There should be less than three.",
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return {
                          label: item.label ? item.label : "New Button",
                        };
                      },
                    },
                    fields: [
                      {
                        name: "label",
                        label: "Label",
                        type: "string",
                        description: "The label for the button.",
                      },
                      {
                        name: "url",
                        label: "URL",
                        type: "string",
                        description: "The url for the button.",
                      },
                    ],
                  },
                ],
              },
              {
                name: "footer",
                label: "Footer",
                type: "object",
                description: "Settings for the site's footer.",
                fields: [
                  {
                    name: "sections",
                    label: "Sections",
                    type: "object",
                    description:
                      "Sections for the footer. There should be three.",
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return {
                          label: item.title ? item.title : "New Section",
                        };
                      },
                    },
                    fields: [
                      {
                        name: "title",
                        label: "Title",
                        type: "string",
                      },
                      {
                        name: "links",
                        label: "Links",
                        type: "object",
                        description: "Links for this footer section.",
                        list: true,
                        ui: {
                          itemProps: (item) => {
                            return {
                              label: item.label ? item.label : "New Link",
                            };
                          },
                        },
                        fields: [
                          {
                            name: "label",
                            label: "Label",
                            type: "string",
                            description: "The label for the link.",
                          },
                          {
                            name: "url",
                            label: "URL",
                            type: "string",
                            description: "The url for the link.",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "pages",
        label: "Pages",
        path: "_pages",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/\s/g, "-")}`;
            },
          },
        },
        templates: [
          {
            name: "home",
            label: "Home Page",
            ui: {
              defaultItem: {
                title: "Home",
                layout: "home",
                permalink: "/",
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
          },
          {
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
          },
        ],
      },
      {
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
      },
    ],
  },
  search: {
    tina: {
      indexerToken: TINA_SEARCH_TOKEN,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
