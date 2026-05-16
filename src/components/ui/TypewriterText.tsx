import { memo, useEffect, useId, useRef } from 'react';

export default memo(function TypewriterText({ text }: { text: string }) {
  const id = useId();
  const jRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    function runTypewriter(): () => void {
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
        if (jRef.current >= text.length) {
          return;
        }

        const maybeElement = document.getElementById(id);
        jRef.current++;
        if (maybeElement != null) {
          maybeElement.textContent = text.substring(0, jRef.current);
        }

        if (jRef.current < text.length) {
          timeoutRef.current = setTimeout(type, 40);
        }
      }

      type();

      return function cleanup(): void {
        clearTimer();
      };
    },
    [text, id],
  );

  return <span id={id} />;
});
