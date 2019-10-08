import { applyBuff } from './buff'
import { ELEMENTAL_SHARPNESS_RATE, PHYSICAL_SHARPNESS_RATE } from './constant'
import { applySkill } from './skill'
import { ICondition, IWeapon } from './types/mhwdmg'

function applyWounded(condition: ICondition): ICondition {
  const result: ICondition = { ...condition }
  const current = condition.target.physicalEffectiveness
  result.target.physicalEffectiveness = current + Math.floor((100 - current) * 0.25)
  return result
}

function calcExpected(
  baseDamage: number,
  weapon: IWeapon,
  affinityRate: number,
  minusAffinityRate: number
): number {
  const plusAffinity: number =
    (Math.round(baseDamage * affinityRate) * Math.max(0, weapon.affinity)) / 100
  const minusAffinity: number =
    (Math.round(baseDamage * minusAffinityRate) * Math.max(0, -weapon.affinity)) / 100
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
  let affinityRate = 1.25
  if (condition.skill && condition.skill.criticalBoost) {
    affinityRate = 1.25 + condition.skill.criticalBoost * 0.05
  }
  return calcExpected(baseDamage, weapon, affinityRate, 0.75)
}

function elementalDamage(weapon: IWeapon, condition: ICondition): number {
  if (weapon.elementHidden) {
    return 0
  }
  // 属性値 / 10 * 属性補正 * 斬れ味補正 * 怒り補正 * 肉質 / 100
  // element / 10 * elementRate * sharpnessRate * angerRate * elementalEffectiveness / 100
  const sharpnessRate: number = ELEMENTAL_SHARPNESS_RATE[weapon.sharpness]
  const angerRate: number = condition.target.anger ? 1.1 : 1.0
  const elementRateValue = condition.motion.elementRate || 1
  const baseDamage =
    ((weapon.element / 10) *
      elementRateValue *
      sharpnessRate *
      angerRate *
      condition.target.elementalEffectiveness) /
    100
  if (condition.skill && condition.skill.criticalElement) {
    const affinityRate = condition.skill.criticalElement === 1 ? 1.35 : 1.55
    return calcExpected(baseDamage, weapon, affinityRate, 1)
  } else {
    return Math.round(baseDamage)
  }
}

export function damage(condition: ICondition): number {
  let applied: IWeapon = condition.weapon
  if (condition.buff) {
    applied = applyBuff(applied, condition.buff)
  }
  if (condition.skill) {
    applied = applySkill(applied, condition.skill, condition.target)
  }
  let appliedCondition = condition
  if (condition.target.wounded) {
    appliedCondition = applyWounded(appliedCondition)
  }
  return (
    physicalDamage(applied, appliedCondition) + elementalDamage(applied, appliedCondition)
  )
}
