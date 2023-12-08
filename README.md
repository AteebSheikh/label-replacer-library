# HTML Label Replacer Library

This library provides a function to replace label placeholders in an HTML string with corresponding values from a provided JSON object.

## Installation

Install the library using npm:

```bash


import React, { useEffect, useState } from 'react';
import replaceLabels from 'html-label-replacer-library';

const YourComponent = () => {
  const [modifiedHTML, setModifiedHTML] = useState('');

  useEffect(() => {
    const labels = {
      L001: 'HELLO',
      L002: 'visit my homepage &lt;a href="www.abc.com" &gt; here &lt;/a&gt;',
      L003: 'https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg',
    };

    const htmlString = `
      <div>
        <h1>{{L001}}</h1>
        <p>{{L002}}</p>
        <img src="{{L003}}" alt="Test Image" />
      </div>
    `;

    const modified = replaceLabels(htmlString, labels);

    const parsedHTML = React.createElement('div', {
      dangerouslySetInnerHTML: { __html: modified },
    });

    setModifiedHTML(parsedHTML);
  }, []);

  return (
    <div>
      <p>Modified HTML:</p>
      {modifiedHTML}
    </div>
  );
};

export default YourComponent;
```
