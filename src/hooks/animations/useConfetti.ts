import confetti from 'canvas-confetti';

export const useConfetti = () => {
  function _confetti() {
    var duration = 5 * 1000;
    const animationEnd = Date.now() + duration;

    const interval: NodeJS.Timer = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 250);
  }

  return {
    confetti: _confetti,
  };
};
