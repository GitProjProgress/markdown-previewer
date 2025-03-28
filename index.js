import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.2.4/+esm';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/highlight.min.js';

import {STRINGS,CSS,presets} from './helper.js';

const getElement = query => document.querySelector(`${query}`);

const mdInput = getElement('.md-input');
const mdOutput = getElement('.md-output');
const clearAll = getElement('.action.clear');
const download = getElement('.action.download');
const save = getElement('.action.save');
const tooltip = getElement('.tooltip');
const allPresetButtons = document.querySelectorAll('.sample');

const getPresetText = btn => {
  for(let preset of presets) {
    if(btn.classList.contains(preset)) {
      return STRINGS[`${preset}-preset`];
    }
  }
  return "";
}

const presetButtons = [...allPresetButtons].map(presetBtn => {
  return {
    presetBtn,
    'presetText': getPresetText(presetBtn),
  }
});

const highlightCodeBlockSyntax = userHtml => {
  userHtml.querySelectorAll('code').forEach(codeElement => {
    if(codeElement.parentNode.nodeName == 'PRE')
        hljs.highlightElement(codeElement);
    else
      codeElement.parentNode.style.cssText = CSS['single_line_codeblock'];
  });
}

const highlightBlockQuote = userHtml => userHtml.querySelectorAll('blockquote').forEach(quote => {
    const quoteStyle = document.createElement('span');
    quote.style.cssText = CSS['block_quote'];
    quoteStyle.style.cssText = CSS['quote'];
    quote.insertAdjacentElement("afterbegin",quoteStyle);
});

const addLineFeed = ip => (ip && ip.includes('\n')) ? ip.split('\n').join('\n\n') : ip;
const sanitizeRawHtml = rawHtml => DOMPurify.sanitize(rawHtml);

function createMarkdown(isUserInput,value) {
  if(!isUserInput) mdInput.value = value;
  const tempElement = document.createElement('div');
  const userInput = value;
  const inputWithLF = addLineFeed(userInput);
  const htmlString = marked.parse(inputWithLF);
  tempElement.innerHTML = htmlString;
  highlightCodeBlockSyntax(tempElement);
  highlightBlockQuote(tempElement);
  const sanitizedOutput = sanitizeRawHtml(tempElement.innerHTML);
  mdOutput.innerHTML = sanitizedOutput;
}

mdInput.addEventListener('input',(e) => {
  createMarkdown(true,mdInput.value);
});

presetButtons.forEach(btns => {
  btns.presetBtn.addEventListener('click',() => {
    createMarkdown(false,btns.presetText);
  })
});

clearAll.addEventListener('click',() => {
  createMarkdown(false,"");
});

download.addEventListener('click',() => {
  const text = mdInput.value;
  const blob = new Blob([text], {type: 'text/markdown'});
  const link = document.createElement('a');
  link.download = text ? 'user.md' : 'empty-file.md';
  link.href = URL.createObjectURL(blob);
  link.click();
  link.remove();
});

const loadStorage = () => {
  const savedText = localStorage.getItem('md');
  if(savedText) {
    createMarkdown(false,savedText);
  }
}

save.addEventListener('click',() => {
    localStorage.setItem('md',mdInput.value);
    tooltip.classList.add('show');
    setTimeout(() => {
      if(tooltip.classList.contains('show')) {
        tooltip.classList.remove('show');
      }
    },1200);
});

loadStorage();