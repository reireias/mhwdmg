import { applyBuff } from './buff'
import { ELEMENTAL_SHARPNESS_RATE, PHYSICAL_SHARPNESS_RATE } from './constant'
import { applySkill } from './skill'
import { ICondition, IDamageDetail, IWeapon } from './types/mhwdmg'

function applyWounded(condition: ICondition): ICondition {
  const result: ICondition = { ...condition, target: { ...condition.target } }
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
  return baseDamage
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
  return baseDamage
}

export function damageDetail(condition: ICondition): IDamageDetail {
  let applied: IWeapon = condition.weapon
  if (condition.buff) {
    applied = applyBuff(applied, condition.buff)
  }
  if (condition.skill) {
    applied = applySkill(applied, condition.skill, condition.target)
  }
  let appliedCondition: ICondition
  if (condition.target.wounded) {
    appliedCondition = applyWounded(condition)
  } else {
    appliedCondition = condition
  }

  // physical
  let affinityRate = 1.25
  if (appliedCondition.skill && appliedCondition.skill.criticalBoost) {
    affinityRate = 1.25 + appliedCondition.skill.criticalBoost * 0.05
  }
  const physicalBase = physicalDamage(applied, appliedCondition)
  const physicalCritical = physicalBase * affinityRate
  const physicalExpected = calcExpected(physicalBase, applied, affinityRate, 0.75)

  // elemental
  const elementalBase = elementalDamage(applied, appliedCondition)
  let elementalCritical: number
  let elementalExpected: number
  if (appliedCondition.skill && appliedCondition.skill.criticalElement) {
    affinityRate = appliedCondition.skill.criticalElement === 1 ? 1.35 : 1.55
    elementalCritical = elementalBase * affinityRate
    elementalExpected = calcExpected(elementalBase, applied, affinityRate, 1)
  } else {
    elementalCritical = Math.round(elementalBase)
    elementalExpected = elementalCritical
  }
  return {
    base: {
      elemental: Math.round(elementalBase),
      physical: Math.round(physicalBase)
    },
    critical: {
      elemental: Math.round(elementalCritical),
      physical: Math.round(physicalCritical)
    },
    expected: {
      elemental: elementalExpected,
      physical: physicalExpected
    }
  }
}

export function damage(condition: ICondition): number {
  const detail = damageDetail(condition)
  return detail.expected.physical + detail.expected.elemental
}
