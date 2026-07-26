import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const isHoveredRef = useRef(false);
  const isMouseDownRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const visibleRef = useRef(false);

  const updateCursor = () => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const { x, y } = positionRef.current;
    const isHovered = isHoveredRef.current;
    const isMouseDown = isMouseDownRef.current;

    outer.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0) scale(${isMouseDown ? 0.8 : isHovered ? 1.8 : 1})`;
    outer.style.borderColor = isHovered ? '#FF9F00' : '#00E5FF';
    inner.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0) scale(${isMouseDown ? 1.5 : isHovered ? 0.5 : 1})`;
    inner.style.backgroundColor = isHovered ? '#FF9F00' : '#00E5FF';
  };

  useEffect(() => {
    const scheduleUpdate = () => {
      if (animationFrameRef.current !== null) return;
      animationFrameRef.current = requestAnimationFrame(() => {
        animationFrameRef.current = null;
        updateCursor();
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };

      if (!visibleRef.current) {
        visibleRef.current = true;
        if (outerRef.current && innerRef.current) {
          outerRef.current.style.display = 'block';
          innerRef.current.style.display = 'block';
        }
      }

      const target = e.target as HTMLElement | null;
      const isHovered =
        !!target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          !!target.closest('button') ||
          !!target.closest('a') ||
          target.classList.contains('interactive-hover'));

      if (isHovered !== isHoveredRef.current) {
        isHoveredRef.current = isHovered;
      }

      scheduleUpdate();
    };

    const handleMouseDown = () => {
      isMouseDownRef.current = true;
      scheduleUpdate();
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
      scheduleUpdate();
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      if (outerRef.current && innerRef.current) {
        outerRef.current.style.display = 'none';
        innerRef.current.style.display = 'none';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[10000] overflow-hidden">
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/60 shadow-[0_0_15px_rgba(0,229,255,0.6)]"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          display: 'none',
        }}
      />
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#00E5FF]"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          display: 'none',
        }}
      />
    </div>
  );
};
