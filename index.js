const he = require("he");

const replaceLabels = (htmlString, labelData) => {
  let modifiedHtml = htmlString;

  const labelRegex = /{{(.*?)}}/g; // Match any content inside {{ }}

  modifiedHtml = modifiedHtml.replace(labelRegex, (match, labelId) => {
    const labelText = labelData[labelId];
    if (labelText) {
      let decodedText = he.decode(labelText);
      const anchorRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gi;

      decodedText = decodedText.replace(
        anchorRegex,
        (anchorMatch, quote, href) => {
          if (href && !href.startsWith("http")) {
            const formattedURL = `https://${href}`;
            return anchorMatch.replace(href, formattedURL);
          }
          return anchorMatch;
        }
      );

      return decodedText;
    }
    return match; // Return the original label if not found in labelData
  });

  // Replace className with class globally in the modifiedHtml
  modifiedHtml = modifiedHtml.replace(/className/g, "class");

  return modifiedHtml;
};

module.exports = replaceLabels;
