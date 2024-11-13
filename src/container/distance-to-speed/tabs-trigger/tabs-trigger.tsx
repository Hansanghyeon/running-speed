import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '~/lib/utils';

const pathVariants: Variants = {
  normal: { d: 'M5 12h14' },
  animate: {
    d: ['M5 12h14', 'M5 12h9', 'M5 12h14'],
    transition: {
      duration: 0.4,
    },
  },
};

const secondaryPathVariants: Variants = {
  normal: { d: 'm12 5 7 7-7 7', translateX: 0 },
  animate: {
    d: 'm12 5 7 7-7 7',
    translateX: [0, -3, 0],
    transition: {
      duration: 0.4,
    },
  },
};

export function DistanceToSpeedTabsTrigger() {
  const controls = useAnimation();

  return (
    <div
      className={cn("cursor-pointer select-none rounded-md transition-colors duration-200 flex items-center justify-center",
        "flex gap-1"
      )}
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
    >
      거리
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path d="M5 12h14" variants={pathVariants} animate={controls} />
        <motion.path
          d="m12 5 7 7-7 7"
          variants={secondaryPathVariants}
          animate={controls} />
      </svg>
      스피드
    </div>
  );
}
