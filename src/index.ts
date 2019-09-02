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
const ELEMENTAL_SHARPNESS_RATE: { [key: string]: number } = {
  blue: 1.0625,
  green: 1.0,
  orange: 0.5,
  purple: 1.2,
  red: 0.25,
  white: 1.125,
  yellow: 0.75
}

function calcAffinity(baseDamage: number, weapon: IWeapon): number {
  const affinityRate: number = 1.25
  const plusAffinity: number = Math.round(baseDamage * affinityRate) * Math.max(0, weapon.affinity) / 100
  const minusAffinity: number = Math.round(baseDamage * 0.75) * Math.max(0, -weapon.affinity) / 100
  const normalAffinity: number = Math.round(baseDamage) * (100 - Math.max(0, weapon.affinity) - Math.max(0, -weapon.affinity)) / 100
  return plusAffinity + minusAffinity + normalAffinity
}

function physicalDamage(weapon: IWeapon, target: ITarget, motion: IMotion): number {
  // モーション値 * 武器倍率 / 100 * 会心補正 * 斬れ味補正 * 怒り補正 * 肉質 / 100
  // motion * attack / 100 * affinityRate * sharpnessRate * angerRate * physicalEffectiveness / 100
  const sharpnessRate: number = PHYSICAL_SHARPNESS_RATE[weapon.sharpness]
  const angerRate: number = target.anger ? 1.1 : 1.0
  const baseDamage = motion.value * weapon.attack / 100 * sharpnessRate * angerRate * target.physicalEffectiveness / 100
  return calcAffinity(baseDamage, weapon)
}

function elementalDamage(weapon: IWeapon, target: ITarget): number {
  // 属性値 / 10 * 属性補正 * 斬れ味補正 * 怒り補正 * 肉質 / 100
  // element / 10 * elementRate * sharpnessRate * angerRate * elementalEffectiveness / 100
  const sharpnessRate: number = ELEMENTAL_SHARPNESS_RATE[weapon.sharpness]
  const angerRate: number = target.anger ? 1.1 : 1.0
  return Math.round(weapon.element / 10 * sharpnessRate * angerRate * target.elementalEffectiveness / 100)
}

export function damage(weapon: IWeapon, target: ITarget, motion: IMotion): number {
  return physicalDamage(weapon, target, motion) + elementalDamage(weapon, target)
}
