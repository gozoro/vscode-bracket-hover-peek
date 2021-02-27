const config = require('../config');

const CLOSURES = {
  PARENTHESES: { opening: '(', closing: ')', openingRegex: '\\(', closingRegex: '\\)'  },
  CURLY_BRACKET: { opening: '{', closing: '}', openingRegex: '{', closingRegex: '}' },
  SQUARE_BRACKET: { opening: '[', closing: ']', openingRegex: '\\[', closingRegex: '\\]' },
  TAG: { opening: '<', closing: '</', openingRegex: '<', closingRegex: '<\/' }
}

const RUBY_OPENINGS = ['if', 'unless', 'elsif', 'else', 'case', 'while', 'until', 'for', 'def', 'class', 'begin', 'rescue', '(.* )do'];
const RUBY_CLOSINGS = ['end', 'elsif', 'else', 'rescue'];

function getEnabledClosures() {
  let closures = [];
  if (config.previewParentheses) closures.push(CLOSURES.PARENTHESES);
  if (config.previewCurlyBrackets) closures.push(CLOSURES.CURLY_BRACKET);
  if (config.previewSquareBrackets) closures.push(CLOSURES.SQUARE_BRACKET);
  if (config.previewTags) closures.push(CLOSURES.TAG);
  return closures;
}

function getEnabledClosings(activeEditor) {
  let closings = getEnabledClosures().map(closure => closure.closing);
  
  if (activeEditor.document.languageId == 'ruby')
    closings = closings.concat(RUBY_CLOSINGS);
  
  return closings;
}

function getEnabledClosingsRegex(activeEditor) {
  
  let closings = getEnabledClosures()
    .map(closure => closure.closingRegex);
  
  if (activeEditor.document.languageId == 'ruby')
    closings = closings.concat(RUBY_CLOSINGS);

  // \)|}|]|<\/
  let regexString = closings.join('|');
  
  return new RegExp(regexString, 'g');
}


module.exports = {
  CLOSURES,
  RUBY_OPENINGS,
  RUBY_CLOSINGS,
  getEnabledClosures,
  getEnabledClosings,
  getEnabledClosingsRegex
}