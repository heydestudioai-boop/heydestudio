export function formatLineBreaks(text: string): string {
  if (!text) return '';
  return text.replace(/\n/g, '<br />');
}

export function getLineBreaksHTML(text: string): { __html: string } {
  return {
    __html: formatLineBreaks(text),
  };
}
