import { Collection } from "tinacms";

export const settingsConfig: Collection = {
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
        return `${values?.type?.toLowerCase().replace(/ /g, "-")}`;
      },
    },
  },
  templates: [
    {
      name: "global",
      label: "Global Settings",
      ui: {
        defaultItem: {
          type: "Global Settings",
        },
      },
      fields: [
        {
          name: "type",
          label: "Settings Type",
          type: "string",
          options: ["Global Settings"],
          isTitle: true,
          required: true,
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
          name: "thumbnail",
          label: "Thumbnail",
          type: "image",
          description: "A thumbnail to display on social media and in links.",
        },
        {
          name: "logo",
          label: "Logo",
          type: "image",
          description: "The full logo as an SVG.",
        },
        {
          name: "icon",
          label: "Icon",
          type: "image",
          description: "A smaller icon as an SVG.",
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
              description: "Day of the week for the listed hours.",
              options: [
                "Mon",
                "Tue",
                "Wed",
                "Thurs",
                "Fri",
                "Sat",
                "Sun",
                "Tue-Fri",
                "Mon-Fri",
              ],
            },
            {
              name: "hours",
              label: "Hours",
              type: "string",
              description: "Open hours for this day.",
            },
          ],
        },
        {
          name: "pickup",
          label: "Pickup URL",
          description: "Link to order pickup (used across the site).",
          type: "string",
        },
        {
          name: "delivery",
          label: "Delivery URL",
          description: "Link to order delivery (used across the site).",
          type: "string",
        },
      ],
    },
    {
      name: "nav",
      label: "Navigation Settings",
      ui: {
        defaultItem: {
          type: "Navigation Settings",
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
          options: ["Navigation Settings"],
          isTitle: true,
          required: true,
        },
        {
          name: "navbar",
          label: "Nav Bar",
          type: "object",
          description: "Settings for the upper navigation bar.",
          fields: [
            {
              name: "pickup",
              label: "Show pickup button?",
              type: "boolean",
            },
            {
              name: "delivery",
              label: "Show delivery button?",
              type: "boolean",
            },
            {
              name: "buttons",
              label: "Additional Buttons",
              type: "object",
              description: "Any additional buttons for the nav.",
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
              name: "show_email",
              label: "Show email sign up?",
              type: "boolean",
            },
            {
              name: "email_label",
              label: "Email Label",
              type: "string",
            },
            {
              name: "email_placeholder",
              label: "Email Placeholder Text",
              type: "string",
            },
            {
              name: "sections",
              label: "Sections",
              type: "object",
              description: "Sections for the footer. There should be three.",
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
};
