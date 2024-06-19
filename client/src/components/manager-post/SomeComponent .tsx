import React from 'react'
import { useState } from 'react';
import MarkdownViewer from './MarkdownViewer';
export default function SomeComponent () {
    const [markdownContent, setMarkdownContent] = useState<string>('# Hello, Markdown!');
  return (
    <div>
      <textarea value={markdownContent} onChange={(e) => setMarkdownContent(e.target.value)}></textarea>
      <MarkdownViewer content={markdownContent} />
    </div>
  )
}
