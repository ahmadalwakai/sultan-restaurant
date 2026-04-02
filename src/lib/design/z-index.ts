/** Application-wide z-index scale — single source of truth */

export const zIndex = {
  base: 0,
  overlay: 1,
  content: 2,
  stickyBar: 30,
  header: 50,
  mobileMenu: 55,
  drawer: 60,
  modal: 70,
  toast: 80,
  tooltip: 90,
} as const;
