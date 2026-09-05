// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import vitepress from 'i-cant-believe-its-not-vitepress';
import pageActions from 'starlight-page-actions';

import oldUrls from './redirects.json' with { type: 'json' };

const BASE = '/schoology-docs-md/';

/*
 * The old VitePress URLs, pointed at their Starlight slugs. Astro prefixes
 * `base` onto a redirect's source but not its destination, and pages are
 * directories, so the destinations need the base and a trailing slash here.
 */
const redirects = Object.fromEntries(
	Object.entries(oldUrls).map(([from, to]) => [from, `${BASE}${to.replace(/^\//, '')}/`])
);
import { buildSidebar } from './sidebar.mjs';
import { satteri } from '@astrojs/markdown-satteri';
import apiHeadings from './rehype-api-headings.mjs';

/**
 * The one piece of the API-heading treatment that has to run in the browser.
 * One delegated listener for the whole site, rather than a script that walks
 * every heading on every page load.
 */
const apiCopyButton = {
	name: 'api-copy-button',
	hooks: {
		'astro:config:setup'({ injectScript }) {
			injectScript(
				'page',
				`document.addEventListener('click', async (event) => {
					const button = event.target.closest?.('[data-copy-url]');
					if (!button) return;
					await navigator.clipboard.writeText(button.dataset.copyUrl);
					button.title = 'Copied!';
					setTimeout(() => (button.title = 'Copy to clipboard'), 1200);
				});`
			);
		},
	},
};

export default defineConfig({
	site: 'https://kendell.dev',
	base: BASE,
	/*
	 * Pages are directories, so a page lives at `/a/b/` and the relative links in
	 * the content resolve against that. Without this the dev server also answers
	 * `/a/b`, where those links resolve one level too high — GitHub Pages
	 * redirects to the slash, so it would break only in dev.
	 */
	trailingSlash: 'always',
	redirects,
	// Sätteri is Astro 7's default Markdown processor; `hastPlugins` is its
	// equivalent of a rehype plugin, and keeps us off the legacy unified path.
	markdown: { processor: satteri({ hastPlugins: [apiHeadings()] }) },
	integrations: [
		apiCopyButton,
		starlight({
			title: 'Schoology Dev Docs',
			description: 'Documentation for Schoology developers',
			plugins: [
				vitepress(),
				/*
				 * Publishes every page at `<page>.md` plus an `/llms.txt` index, and adds
				 * the copy-page button. This is the half of the port that matters if the
				 * docs are checked out as a submodule to give an agent API context.
				 */
				pageActions({
					baseUrl: 'https://kendell.dev/schoology-docs-md',
					position: 'page-title',
					actions: { markdown: true, chatgpt: true, claude: true },
					share: false,
				}),
			],
			routeMiddleware: './src/routeData.ts',
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'meta',
					attrs: { name: 'algolia-site-verification', content: 'C6EF93F18F189AF8' },
				},
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/KTibow/schoology-docs-md' },
			],
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			sidebar: [
				// Built from the content tree, the way `vitepress-sidebar` did.
				...(await buildSidebar()),
				{ label: 'Terms of Use (US)', link: 'https://developers.schoology.com/terms/' },
				{
					label: 'PowerSchool Responsible Disclosure Program',
					link: 'https://www.powerschool.com/security/responsible-disclosure-program/',
				},
			],
		}),
	],
});
