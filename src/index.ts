export function expectedValue(value: number): number {
  return value * 2
}

export function damage(weapon: IWeapon, target: ITarget, motion: IMotion): number {
  const physical = weapon.attack * target.physicalEffectiveness / 100 * motion.value / 100
  const elemental = weapon.element * target.elementalEffectiveness / 100
  return physical + elemental
}
