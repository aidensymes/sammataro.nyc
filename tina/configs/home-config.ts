import { Template } from "tinacms";

// Create our number formatter.
// const formatter = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
// });

// function formatCurrency(value: string): string {
//   const number = Number(value?.replace(/[^0-9.-]+/g, ""));
//   return number ? formatter.format(number) : "";
// }

export const homeConfig: Template = {
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
    {
      name: "header",
      label: "Header",
      type: "object",
      fields: [
        {
          name: "hours",
          label: "Hours",
          description: "Shorthand hours for the header.",
          type: "string",
        },
        {
          name: "address",
          label: "Address",
          description: "Shorthand address for the header.",
          type: "string",
        },
        {
          name: "left_image",
          label: "Left Image",
          description: "The left hand image in the header.",
          type: "image",
        },
        {
          name: "right_image",
          label: "Right Image",
          description: "The right hand image in the header.",
          type: "image",
        },
      ],
    },
    {
      name: "about",
      label: "About",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "blurb",
          label: "Blurb",
          description: "A blurb for the about section.",
          type: "rich-text",
        },
        {
          name: "callout",
          label: "Callout",
          description: "A short hand written callout.",
          type: "string",
        },
        {
          name: "images",
          label: "Images",
          type: "image",
          description: "Images for the about section. Select four.",
          list: true,
        },
      ],
    },
    {
      name: "menus",
      label: "Menus",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
        },
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
          name: "limit",
          label: "Menu Item Limit",
          description:
            "The number of items to display before cutting off the menu.",
          type: "number",
        },
        {
          name: "menus",
          label: "Menus",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return {
                label: item.name ? item.name : "New Menu",
              };
            },
          },
          fields: [
            {
              name: "name",
              label: "Menu Name",
              type: "string",
              description: "The name of the menu.",
            },
            {
              name: "item",
              label: "Menu Item",
              type: "object",
              list: true,
              ui: {
                itemProps: (item) => {
                  return {
                    label: item.name ? item.name : "New Menu Item",
                  };
                },
              },
              fields: [
                {
                  name: "name",
                  label: "Item Name",
                  type: "string",
                },
                {
                  name: "description",
                  label: "Item Description",
                  type: "string",
                },
                {
                  name: "price",
                  label: "Item Price",
                  type: "string",
                  // ui: {
                  //   format: (val) => {
                  //     return formatCurrency(val);
                  //   },
                  // },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "order",
      label: "Order",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "blurb",
          label: "Blurb",
          description: "A blurb for the Order section.",
          type: "rich-text",
        },
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
          name: "callout",
          label: "Callout",
          description: "A short hand written callout.",
          type: "string",
        },
        {
          name: "images",
          label: "Images",
          type: "image",
          description: "Images for the about section. Select two.",
          list: true,
        },
      ],
    },
  ],
};
