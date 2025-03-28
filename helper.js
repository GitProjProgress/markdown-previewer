const STRINGS = {
    'headings-preset': "# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6",
    'code-preset': "<!-- in-line code -->\n`const a = 20;`\n---\n<!-- multi-line code -->\n```js\nconst a = 20;\nconst b = 'str';\n```",
    'block-quote-preset': "> This is a quote",
    'highlight-preset': "<mark>This is Highlighted Text</mark>",
    'list-ul-preset': "- item-1\n- item-2\n- item-3\n- item-4",
    'list-ol-preset': "1. item-1\n2. item-2\n3. item-3\n4. item-4",
    'links-preset': "- [google](https://www.google.com)\n- [facebook](https://www.facebook.com)",
    'images-preset': "![Road](https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1)\n\n![nightsky](https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1)",
    'bold-preset': "**This is bold text**",
    'italic-preset': "_This is italic text_\n_**Italic and Bold Text**_"
};

const CSS = {
    'single_line_codeblock': `line-height: 1rem; background-color: #111111e7; opacity: 0.9; color: #fff; padding: 0.5rem 1rem; border-radius: 5px; margin: 1rem 0;`,
    'block_quote': 'display: flex; gap: 1rem; height: 50px; background-color: #0000001a; font-size: 1rem; margin: 1rem 0;',
    'quote': `width: 10px; height: 100%; background-color: #000;`
};

const presets = ['headings','code','block-quote','highlight','list-ul','list-ol','links','images','bold','italic'];

export {STRINGS,CSS,presets};