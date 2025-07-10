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
        return `settings`;
      },
    },
  },
  fields: [
    {
      name: "global",
      label: "Global Settings",
      type: "object",
      fields: [
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
          name: "logo_light",
          label: "Light Logo",
          type: "image",
          description: "A light version of the logo.",
        },
        {
          name: "icon",
          label: "Icon",
          type: "image",
          description: "A smaller icon as an SVG.",
        },
        {
          name: "icon_light",
          label: "Light Icon",
          type: "image",
          description: "A light version smaller of the icon.",
        },
        {
          name: "address",
          label: "Address",
          type: "string",
        },
        {
          name: "address_url",
          label: "Address URL",
          description:
            "The URL you want your address to link to (Google Maps, etc.)",
          type: "string",
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
          name: "show_pickup",
          label: "Show pickup button",
          description:
            "Should we show the pickup button on the home page and footer?",
          type: "boolean",
        },
        {
          name: "pickup",
          label: "Pickup URL",
          description: "Link to order pickup (used across the site).",
          type: "string",
        },
        {
          name: "show_delivery",
          label: "Show delivery button?",
          description:
            "Should we show the delivery button on the home page and footer?",
          type: "boolean",
        },
        {
          name: "delivery",
          label: "Delivery URL",
          description: "Link to order delivery (used across the site).",
          type: "string",
        },
        {
          name: "announcement_text",
          label: "Announcement Text",
          description:
            "Enter an announcement. If this field is blank, the bar will not show on the site.",
          type: "string",
        },
        {
          name: "announcement_url",
          label: "Announcement URL",
          type: "string",
          description:
            "Enter an URL. If this field is blank, the bar will not link to anywhere.",
        },
        {
          name: "popup_script",
          label: "Popup Script",
          description: "Paste the code for an embedded popup below.",
          type: "string",
        },
      ],
    },
    {
      name: "nav",
      label: "Navigation Settings",
      type: "object",
      ui: {
        defaultItem: {
          footer_sections: [
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
      fields: [
        {
          name: "buttons",
          label: "Additional Buttons",
          type: "object",
          description: "Any additional buttons for the upper nav.",
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
        {
          name: "show_email",
          label: "Show email sign up",
          description: "Should we display the email sign up in the footer?",
          type: "boolean",
        },
        {
          name: "email_label",
          label: "Email Label",
          description: "Label for the email signup",
          type: "string",
        },
        {
          name: "email_placeholder",
          label: "Email Placeholder Text",
          description: "Placeholder text for the email signup",
          type: "string",
        },
        {
          name: "footer_sections",
          label: "Footer Sections",
          type: "object",
          description:
            "Sections to hold links in the footer. The first section will always contain pickup and delivery buttons (if enabled).",
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
};
