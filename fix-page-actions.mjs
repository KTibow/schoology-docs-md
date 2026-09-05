/**
 * Rewrites `dist/llms.txt` after the build.
 *
 * `starlight-page-actions` generates one, but its `normalizeUrl()` reduces the
 * configured `baseUrl` to `origin`, so a site served under an Astro `base` —
 * this one is at /schoology-docs-md/ — gets URLs missing that segment. It also
 * links the HTML page rather than the `.md` an agent actually wants to fetch.
 *
 * Both are upstream issues; this rebuilds the file from the same sidebar the
 * site is configured with, which already has the titles in reading order.
 */
import { writeFile } from 'node:fs/promises';
import { buildSidebar } from './sidebar.mjs';

const SITE = 'https://kendell.dev';
const BASE = '/schoology-docs-md';

const sidebar = await buildSidebar();
const url = (slug) => `${SITE}${BASE}${slug}.md`;

const lines = ['# Schoology Dev Docs', '', '> Documentation for Schoology developers', ''];

/** Leaves before subgroups, so a nested heading never splits its parent's list. */
const walk = (items, depth) => {
	for (const item of items.filter((i) => i.link?.startsWith('/'))) {
		lines.push(`- [${item.label}](${url(item.link)})`);
	}
	for (const group of items.filter((i) => i.items)) {
		lines.push('', `${'#'.repeat(depth)} ${group.label}`, '');
		walk(group.items, depth + 1);
	}
};

for (const group of sidebar) {
	lines.push(`## ${group.label}`, '');
	walk(group.items, 3);
	lines.push('');
}

await writeFile('dist/llms.txt', lines.join('\n').replace(/\n{3,}/g, '\n\n') + '\n');
console.log('rewrote dist/llms.txt');

