import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export default function Cursor() {
  // Raw mouse position
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Signals as MotionValues — zero React re-renders
  const visible = useMotionValue(0);
  const hover = useMotionValue(0);
  const click = useMotionValue(0);

  // Smooth signals
  const hoverSpring = useSpring(hover, { damping: 20, stiffness: 350 });
  const clickSpring = useSpring(click, { damping: 20, stiffness: 350 });

  // Ring follows mouse with lag
  const ringX = useSpring(mouseX, { damping: 25, stiffness: 280, mass: 0.4 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 280, mass: 0.4 });

  // Derived values — no re-renders, pure transforms
  const ringSize = useTransform(
    [hoverSpring, clickSpring] as Parameters<typeof useTransform>[0],
    ([h, c]: number[]) => 36 + h * 18 - c * 14
  );
  const dotScale = useTransform(
    [hoverSpring, clickSpring] as Parameters<typeof useTransform>[0],
    ([h, c]: number[]) => Math.max(0, 1 - h + c * 1.5)
  );
  const borderColor = useTransform(hoverSpring, [0, 1], ['#ffffff', '#10b981']);
  const opacity = useTransform(visible, [0, 1], [0, 1]);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      visible.set(1);
    };
    const onLeave = () => visible.set(0);
    const onEnter = () => visible.set(1);
    const onDown = () => click.set(1);
    const onUp = () => click.set(0);
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      hover.set(el.closest('a, button, input, textarea, select, label, [role="button"]') ? 1 : 0);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
    };
  }, [mouseX, mouseY, visible, hover, click]);

  return (
    <>
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: ringSize,
          height: ringSize,
          borderWidth: 1.5,
          borderStyle: 'solid',
          borderColor,
          opacity,
          willChange: 'transform',
        }}
      />
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          scale: dotScale,
          opacity,
          willChange: 'transform',
        }}
      />
    </>
  );
}
