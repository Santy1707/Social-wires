/* eslint-disable prettier/prettier */
function convertEmojiToAscii(text: string) {
  let asciiText = '';
  for (let i = 0; i < text.length; i++) {
    const emoji = text.charAt(i);
    const asciiCode = emoji.codePointAt(0).toString(16);
    asciiText += `&#x${asciiCode};`;
  }
  return asciiText;
}

export default convertEmojiToAscii;