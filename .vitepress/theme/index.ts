import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { onContentUpdated } from "vitepress";
import { enhanceApiHeadings } from "./enhance";
import RealmObjects from "./components/RealmObjects.vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    onContentUpdated(enhanceApiHeadings);
    app.component("RealmObjects", RealmObjects);
  },
} satisfies Theme;
