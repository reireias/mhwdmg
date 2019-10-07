import { applyBuff } from './buff'
import { ELEMENTAL_SHARPNESS_RATE, PHYSICAL_SHARPNESS_RATE } from './constant'
import { applySkill } from './skill'
import { ICondition, IWeapon } from './types/mhwdmg'

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

function physicalDamage(weapon: IWeapon, condition: ICondition): number {
  // モーション値 * 武器倍率 / 100 * 会心補正 * 斬れ味補正 * 怒り補正 * 肉質 / 100
  // motion * attack / 100 * affinityRate * sharpnessRate * angerRate * physicalEffectiveness / 100
  const sharpnessRate: number = PHYSICAL_SHARPNESS_RATE[weapon.sharpness]
  const angerRate: number = condition.target.anger ? 1.1 : 1.0
  let coatingRate: number = 1
  if (condition.buff && condition.buff.coating) {
    switch (condition.buff.coating) {
      case 'power':
        coatingRate = 1.35
        break
      case 'crossRange':
        coatingRate = 1.2
        break
    }
  }
  const baseDamage =
    (((condition.motion.value * weapon.attack) / 100) *
      coatingRate *
      sharpnessRate *
      angerRate *
      condition.target.physicalEffectiveness) /
    100
  return calcExpected(baseDamage, weapon)
}

function elementalDamage(weapon: IWeapon, condition: ICondition): number {
  // 属性値 / 10 * 属性補正 * 斬れ味補正 * 怒り補正 * 肉質 / 100
  // element / 10 * elementRate * sharpnessRate * angerRate * elementalEffectiveness / 100
  const sharpnessRate: number = ELEMENTAL_SHARPNESS_RATE[weapon.sharpness]
  const angerRate: number = condition.target.anger ? 1.1 : 1.0
  const elementRateValue = condition.motion.elementRate || 1
  return Math.round(
    ((weapon.element / 10) *
      elementRateValue *
      sharpnessRate *
      angerRate *
      condition.target.elementalEffectiveness) /
      100
  )
}

export function damage(condition: ICondition): number {
  let applied: IWeapon = condition.weapon
  if (condition.buff) {
    applied = applyBuff(applied, condition.buff)
  }
  if (condition.skill) {
    applied = applySkill(applied, condition.skill, condition.target)
  }
  return (
    physicalDamage(applied, condition) + elementalDamage(applied, condition)
  )
}
