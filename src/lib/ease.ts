/** Curvas do site: saídas longas, sem rebote. */
export const ease = {
  expo: [0.16, 1, 0.3, 1],
  quint: [0.83, 0, 0.17, 1],
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const

export const molas = {
  suave: { stiffness: 120, damping: 20, mass: 0.6 },
  ima: { stiffness: 180, damping: 14, mass: 0.4 },
  cursor: { stiffness: 500, damping: 40, mass: 0.5 },
} as const

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
