import { defineConfig } from "tinacms";
import {
  settingsConfig,
  homeConfig,
  defaultPageConfig,
  postConfig,
} from "./configs";

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
      settingsConfig,
      postConfig,
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
        templates: [homeConfig, defaultPageConfig],
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
