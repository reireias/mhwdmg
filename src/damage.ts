import { applyBuff } from './buff'
import { ELEMENTAL_SHARPNESS_RATE, PHYSICAL_SHARPNESS_RATE } from './constant'
import { IBuff, IMotion, ITarget, IWeapon } from './types/mhwdmg'

function calcExpected(baseDamage: number, weapon: IWeapon): number {
  const affinityRate: number = 1.25
  const plusAffinity: number =
    (Math.round(baseDamage * affinityRate) * Math.max(0, weapon.affinity)) / 100
  const minusAffinity: number =
    (Math.round(baseDamage * 0.75) * Math.max(0, -weapon.affinity)) / 100
  const normalAffinity: number =
    (Math.round(baseDamage) *
      (100 - Math.max(0, weapon.affinity) - Math.max(0, -weapon.affinity))) /
    100
  return plusAffinity + minusAffinity + normalAffinity
}

function physicalDamage(
  weapon: IWeapon,
  target: ITarget,
  motion: IMotion,
  coating: 'power' | 'crossRange' | undefined
): number {
  // モーション値 * 武器倍率 / 100 * 会心補正 * 斬れ味補正 * 怒り補正 * 肉質 / 100
  // motion * attack / 100 * affinityRate * sharpnessRate * angerRate * physicalEffectiveness / 100
  const sharpnessRate: number = PHYSICAL_SHARPNESS_RATE[weapon.sharpness]
  const angerRate: number = target.anger ? 1.1 : 1.0
  let coatingRate: number
  switch(coating) {
    case 'power':
      coatingRate = 1.35
      break
    case 'crossRange':
      coatingRate = 1.2
      break
    default:
      coatingRate = 1
      break
  }
  const baseDamage =
    (((motion.value * weapon.attack) / 100) *
      coatingRate *
      sharpnessRate *
      angerRate *
      target.physicalEffectiveness) /
    100
  return calcExpected(baseDamage, weapon)
}

function elementalDamage(
  weapon: IWeapon,
  target: ITarget,
  elementRate?: number,
): number {
  // 属性値 / 10 * 属性補正 * 斬れ味補正 * 怒り補正 * 肉質 / 100
  // element / 10 * elementRate * sharpnessRate * angerRate * elementalEffectiveness / 100
  const sharpnessRate: number = ELEMENTAL_SHARPNESS_RATE[weapon.sharpness]
  const angerRate: number = target.anger ? 1.1 : 1.0
  const elementRateValue = elementRate === undefined ? 1 : elementRate
  return Math.round(
    ((weapon.element / 10) *
      elementRateValue *
      sharpnessRate *
      angerRate *
      target.elementalEffectiveness) /
      100
  )
}

export function damage(
  weapon: IWeapon,
  target: ITarget,
  motion: IMotion,
  buff: IBuff
): number {
  const updatedWeapon = applyBuff(weapon, buff)
  return (
    physicalDamage(updatedWeapon, target, motion, buff.coating) +
    elementalDamage(updatedWeapon, target, motion.elementRate)
  )
}
