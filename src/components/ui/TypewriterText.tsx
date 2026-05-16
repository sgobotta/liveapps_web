import { memo, useEffect, useId, useRef } from 'react';

export default memo(function TypewriterText({ text }: { text: string }) {
  const id = useId();
  const isDeletingRef = useRef(false);
  const jRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    function runTypewriter(): () => void {
      isDeletingRef.current = false;
      jRef.current = 0;

      const element = document.getElementById(id);
      if (element != null) {
        element.textContent = '';
      }

      function clearTimer(): void {
        if (timeoutRef.current != null) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }

      function type(): void {
        const maybeElement = document.getElementById(id);

        if (isDeletingRef.current) {
          if (maybeElement != null) {
            maybeElement.textContent = text.substring(0, jRef.current - 1);
          }
          jRef.current--;
          if (jRef.current === 0) {
            isDeletingRef.current = false;
          }
        } else {
          if (maybeElement != null) {
            maybeElement.textContent = text.substring(0, jRef.current + 1);
          }
          jRef.current++;
          if (jRef.current === text.length) {
            isDeletingRef.current = true;
          }
        }

        timeoutRef.current = setTimeout(type, 40);
      }

      type();

      return function cleanup(): void {
        clearTimer();
      };
    },
    [text, id],
  );

  return <p id={id} />;
});
