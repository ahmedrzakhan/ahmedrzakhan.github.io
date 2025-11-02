let isScrolling = false;

export const scrollToSection = (href: string, offset: number = 80) => {
  if (isScrolling) return;

  const element = document.querySelector(href);
  if (!element) return;

  isScrolling = true;

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800;
  let startTime: number | null = null;

  const easeInOutQuart = (t: number): number => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  };

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutQuart(progress);

    window.scrollTo({
      top: startPosition + distance * ease,
      behavior: 'auto'
    });

    if (progress < 1) {
      requestAnimationFrame(animation);
    } else {
      isScrolling = false;
    }
  };

  requestAnimationFrame(animation);
};

export const scrollToTop = () => {
  if (isScrolling) return;

  isScrolling = true;

  const startPosition = window.pageYOffset;
  const duration = 600;
  let startTime: number | null = null;

  const easeInOutQuart = (t: number): number => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  };

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutQuart(progress);

    window.scrollTo({
      top: startPosition * (1 - ease),
      behavior: 'auto'
    });

    if (progress < 1) {
      requestAnimationFrame(animation);
    } else {
      isScrolling = false;
    }
  };

  requestAnimationFrame(animation);
};
