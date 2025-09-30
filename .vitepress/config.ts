import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";

const sidebar = generateSidebar({
  removePrefixAfterOrdering: true,
  prefixSeparator: "-",
  collapseDepth: 2,
}) as any;
sidebar[0].collapsed = true;
sidebar.push({
  text: "Terms of Use (US)",
  link: "https://developers.schoology.com/terms/",
});
sidebar.push({
  text: "PowerSchool Responsible Disclosure Program",
  link: "https://www.powerschool.com/security/responsible-disclosure-program/",
});
export default defineConfig({
  title: "Schoology Dev Docs",
  description: "Documentation for Schoology developers",

  themeConfig: {
    nav: [
      { text: "Apps Platform", link: "/1-Apps Platform/1-Index" },
      {
        text: "API Documentation",
        link: "/2-API Documentation/1-An Introduction to APIs",
      },
    ],

    sidebar,

    outline: [2, 3],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/KTibow/schoology-docs-md",
      },
    ],

    search: {
      provider: "local",
    },
  },
});
