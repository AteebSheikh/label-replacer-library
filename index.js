const he = require("he");

const replaceLabels = (htmlString, labelData) => {
  let modifiedHtml = htmlString;

  const labelRegex = /{{(L\d+)}}/g;

  modifiedHtml = modifiedHtml.replace(labelRegex, (match, labelId) => {
    const labelText = labelData[labelId];
    if (labelText) {
      const decodedText = he.decode(labelText);
      const anchorRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gi;

      modifiedHtml = decodedText.replace(
        anchorRegex,
        (anchorMatch, quote, href) => {
          if (href && !href.startsWith("http")) {
            const formattedURL = `https://${href}`;
            return anchorMatch.replace(href, formattedURL);
          }
          return anchorMatch;
        }
      );

      return modifiedHtml;
    }
    return match;
  });

  // Replace className with class globally in the modifiedHtml
  modifiedHtml = modifiedHtml.replace(/className/g, "class");

  return modifiedHtml;
};

module.exports = replaceLabels;
