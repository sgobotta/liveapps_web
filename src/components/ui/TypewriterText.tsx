import { memo, useEffect, useId, useState } from 'react';

export default memo(function TypewriterText({ text }: { text: string }) {
  const id = useId();
  const [isDeleting, setDeleting] = useState(false);

  let i = 0;
  let j = 0;
  function type() {
    const currentWord = text;
    if (isDeleting) {
      const maybe_element = document.getElementById(id);
      if (maybe_element)
        maybe_element.textContent = currentWord.substring(0, j - 1);
      j--;
      if (j === 0) {
        setDeleting(false);
        i++;
        if (i === [text].length) {
          i = 0;
        }
      }
    } else {
      const maybe_element = document.getElementById(id);
      if (maybe_element)
        maybe_element.textContent = currentWord.substring(0, j + 1);
      j++;
      if (j === currentWord.length) {
        setDeleting(true);
      }
    }
    setTimeout(type, 40);
  }

  useEffect(() => {
    type();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <p id={id}>{text}</p>;
});
