/**
 * Builds the sidebar from the content tree, the way `vitepress-sidebar` used to.
 *
 * Starlight's own `autogenerate` gets most of the way there, but it labels a
 * nested group with the *directory name* — which is a slug by the time it
 * reaches the collection, so `event-triggers` would show up in place of "Event
 * Triggers". Walking the tree here keeps the human labels, and reads each
 * page's label from `sidebar.label` in frontmatter (falling back to its title),
 * which is what keeps the long titles out of the sidebar.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';

const DOCS = 'src/content/docs';

/** Top-level groups, in sidebar order. */
const GROUPS = [
	{ dir: 'apps-platform', label: 'Apps Platform', collapsed: true },
	{ dir: 'api-documentation', label: 'API Documentation' },
	{ dir: 'api-realms', label: 'API: Realms' },
	{ dir: 'api-objects', label: 'API: Objects' },
];

/** Labels for nested groups, keyed by their path under `src/content/docs`. */
const NESTED_LABELS = {
	'apps-platform/sample-apps': 'Sample Apps',
	'api-documentation/event-triggers': 'Event Triggers',
};

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;

async function readEntry(path) {
	const source = await readFile(join(DOCS, path), 'utf8');
	const data = parse(FRONTMATTER.exec(source)?.[1] ?? '') ?? {};
	const slug = path.replace(/\.mdx?$/, '').replace(/\/index$/, '');
	return {
		label: data.sidebar?.label ?? data.title ?? slug,
		link: '/' + slug,
		order: data.sidebar?.order ?? Infinity,
	};
}

/** Leaves before subgroups, each set sorted by `sidebar.order` then label. */
async function walk(dir) {
	const entries = await readdir(join(DOCS, dir), { withFileTypes: true });

	const pages = await Promise.all(
		entries
			.filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
			.map((entry) => readEntry(`${dir}/${entry.name}`))
	);

	const groups = await Promise.all(
		entries
			.filter((entry) => entry.isDirectory())
			.map(async (entry) => {
				const path = `${dir}/${entry.name}`;
				return {
					label: NESTED_LABELS[path] ?? entry.name,
					items: await walk(path),
					order: Infinity,
				};
			})
	);

	const byOrder = (a, b) => a.order - b.order || a.label.localeCompare(b.label);
	return [...pages.sort(byOrder), ...groups.sort(byOrder)].map(({ order, ...item }) => item);
}

/** The sidebar Starlight is configured with. */
export async function buildSidebar() {
	const sidebar = await Promise.all(
		GROUPS.map(async ({ dir, label, collapsed }) => ({
			label,
			...(collapsed ? { collapsed } : {}),
			items: await walk(dir),
		}))
	);
	sidebar[0].collapsed = true; // as the VitePress config did
	return sidebar;
}
