/**
 * Turns headings of the form `GET sections/{id}/assignments` into a method
 * badge, a path and a copy button — at build time.
 *
 * The VitePress original did this in the browser on every page load, because a
 * Vue SPA router gives you a DOM and not much else. Astro hands you the tree
 * before it is ever serialised, so there is no reason to ship a walker to the
 * client: this runs once per page at build, and the only JavaScript left is one
 * delegated click handler for the clipboard.
 *
 * Astro runs user hast plugins *before* its heading-id plugin, so the text left
 * behind here is what anchors and the table of contents are derived from. The
 * two spans plus the separating space reproduce the original text exactly, and
 * the button contributes none, which keeps every existing `#fragment` valid.
 */
const METHOD = /^(GET|POST|PUT|DELETE)\s+(.+)$/i;

const span = (className, value) => ({
	type: 'element',
	tagName: 'span',
	properties: { className },
	children: [{ type: 'text', value }],
});

export default function apiHeadings() {
	return {
		name: 'api-headings',
		element: {
			filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
			visit(node, ctx) {
				const match = ctx.textContent(node).trim().match(METHOD);
				if (!match) return;

				const method = match[1].toUpperCase();
				const path = match[2].trim();
				const url = `https://api.schoology.com/v1/${path.split('(')[0].trim()}`;

				for (let i = node.children.length - 1; i >= 0; i--) ctx.removeChildAt(node, i);

				ctx.appendChild(node, [
					span(['method-badge', 'method', method.toLowerCase()], method),
					{ type: 'text', value: ' ' },
					span(['path-display'], path),
					{
						type: 'element',
						tagName: 'button',
						properties: {
							type: 'button',
							className: ['copy-button'],
							title: 'Copy to clipboard',
							'aria-label': `Copy the ${method} ${path} endpoint URL`,
							'data-copy-url': url,
						},
						// The icon's shape comes from CSS via `d: path(…)`, which is how the
						// stylesheet swaps it for a tick once the URL has been copied.
						children: [
							{
								type: 'element',
								tagName: 'svg',
								properties: { width: 16, height: 16, viewBox: '0 0 24 24', 'aria-hidden': 'true' },
								children: [{ type: 'element', tagName: 'path', properties: {}, children: [] }],
							},
						],
					},
				]);

				const existing = node.properties?.className;
				const classes = Array.isArray(existing) ? existing : existing ? [existing] : [];
				ctx.setProperty(node, 'className', [...classes, 'api-path']);
			},
		},
	};
}
