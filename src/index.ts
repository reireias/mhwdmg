// TODO: check purple rate in IB
const PHYSICAL_SHARPNESS_RATE: { [key: string]: number } = {
  blue: 1.20,
  green: 1.05,
  orange: 0.75,
  purple: 1.39,
  red: 0.5,
  white: 1.32,
  yellow: 1.0
}

export function expectedValue(value: number): number {
  return value * 2
}

function physicalDamage(weapon: IWeapon, target: ITarget, motion: IMotion): number {
  // モーション値 * 武器倍率 / 100 * 会心補正 * 斬れ味補正 * 怒り補正 * 肉質 / 100
  // motion * attack / 100 * affinityRate * sharpnessRate * angerRate * physicalEffectiveness / 100
  const affinityRate: number = 1.0
  const sharpnessRate: number = PHYSICAL_SHARPNESS_RATE[weapon.sharpness]
  const angerRate: number = 1.0
  const result = motion.value * weapon.attack / 100 * affinityRate * sharpnessRate * angerRate * target.physicalEffectiveness / 100
  return Math.round(result)
}

function elementalDamage(weapon: IWeapon, target: ITarget): number {
  // 属性値 / 10 * 属性補正 * 斬れ味補正 * 怒り補正 * 肉質 / 100
  // element / 10 * elementRate * sharpnessRate * angerRate * elementalEffectiveness / 100
  return Math.round(weapon.element / 10 * target.elementalEffectiveness / 100)
}

export function damage(weapon: IWeapon, target: ITarget, motion: IMotion): number {
  return physicalDamage(weapon, target, motion) + elementalDamage(weapon, target)
}
