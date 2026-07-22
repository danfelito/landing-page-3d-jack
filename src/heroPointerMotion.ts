const HERO_SELECTOR = '.hero-portrait';

const easeToward = (current: number, target: number, amount: number) =>
  current + (target - current) * amount;

export function startHeroPointerMotion() {
  if (typeof window === 'undefined') return () => undefined;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');

  let frameId = 0;
  let targetX = 0;
  let targetY = 0;
  let targetRotateX = 0;
  let targetRotateY = 0;
  let currentX = 0;
  let currentY = 0;
  let currentRotateX = 0;
  let currentRotateY = 0;

  const getPortrait = () => document.querySelector<HTMLImageElement>(HERO_SELECTOR);

  const render = () => {
    const portrait = getPortrait();

    currentX = easeToward(currentX, targetX, 0.12);
    currentY = easeToward(currentY, targetY, 0.12);
    currentRotateX = easeToward(currentRotateX, targetRotateX, 0.12);
    currentRotateY = easeToward(currentRotateY, targetRotateY, 0.12);

    if (portrait) {
      portrait.style.transform = `perspective(1100px) translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;
      portrait.style.transformOrigin = '50% 55%';
      portrait.style.willChange = 'transform';
    }

    const stillMoving =
      Math.abs(targetX - currentX) > 0.05 ||
      Math.abs(targetY - currentY) > 0.05 ||
      Math.abs(targetRotateX - currentRotateX) > 0.02 ||
      Math.abs(targetRotateY - currentRotateY) > 0.02;

    if (stillMoving) {
      frameId = window.requestAnimationFrame(render);
    } else {
      frameId = 0;
    }
  };

  const scheduleRender = () => {
    if (!frameId) frameId = window.requestAnimationFrame(render);
  };

  const reset = () => {
    targetX = 0;
    targetY = 0;
    targetRotateX = 0;
    targetRotateY = 0;
    scheduleRender();
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || reducedMotion.matches || !finePointer.matches) {
      reset();
      return;
    }

    const portrait = getPortrait();
    const hero = portrait?.closest('section');
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const insideHero =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!insideHero) {
      reset();
      return;
    }

    const normalizedX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    targetX = normalizedX * 28;
    targetY = normalizedY * 18;
    targetRotateX = normalizedY * -3.5;
    targetRotateY = normalizedX * 5;
    scheduleRender();
  };

  const handleWindowExit = (event: MouseEvent) => {
    if (!event.relatedTarget) reset();
  };

  const handleMotionPreference = () => reset();
  const handleVisibility = () => {
    if (document.hidden) reset();
  };

  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  window.addEventListener('mouseout', handleWindowExit);
  window.addEventListener('blur', reset);
  document.addEventListener('visibilitychange', handleVisibility);
  reducedMotion.addEventListener('change', handleMotionPreference);
  finePointer.addEventListener('change', handleMotionPreference);

  return () => {
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('mouseout', handleWindowExit);
    window.removeEventListener('blur', reset);
    document.removeEventListener('visibilitychange', handleVisibility);
    reducedMotion.removeEventListener('change', handleMotionPreference);
    finePointer.removeEventListener('change', handleMotionPreference);
    if (frameId) window.cancelAnimationFrame(frameId);

    const portrait = getPortrait();
    portrait?.style.removeProperty('transform');
    portrait?.style.removeProperty('transform-origin');
    portrait?.style.removeProperty('will-change');
  };
}
