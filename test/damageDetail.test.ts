import { damageDetail } from '../src/damage'
import { ITestCondition } from './helper'

describe('damageDetail', (): void => {
  let condition: ITestCondition
  beforeAll((): void => {
    condition = {
      buff: {},
      motion: {
        value: 100
      },
      skill: {},
      target: {
        anger: false,
        elementalEffectiveness: 100,
        physicalEffectiveness: 100,
        wounded: false
      },
      weapon: {
        affinity: 0,
        attack: 100,
        element: 1000,
        elementHidden: false,
        sharpness: 'ammo'
      }
    }
  })

  test('no affinity', (): void => {
    const detail = damageDetail(condition)
    expect(detail.base.physical).toBe(100)
    expect(detail.base.elemental).toBe(100)
    expect(detail.critical.physical).toBe(125)
    expect(detail.critical.elemental).toBe(100)
    expect(detail.expected.physical).toBe(100)
    expect(detail.expected.elemental).toBe(100)
  })

  test('affinity', (): void => {
    condition.weapon.affinity = 50
    condition.skill.criticalBoost = 3
    condition.skill.criticalElement = 2
    const detail = damageDetail(condition)
    expect(detail.base.physical).toBe(100)
    expect(detail.base.elemental).toBe(100)
    expect(detail.critical.physical).toBe(140)
    expect(detail.critical.elemental).toBe(155)
    expect(detail.expected.physical).toBe(120)
    expect(detail.expected.elemental).toBe(127.5)
  })

  test('no side effect', () => {
    condition = {
      buff: {
        canteen: 'L',
        demonPowder: true,
        demondrug: true,
        megaDemondrug: true,
        mightPill: true,
        mightSeed: true,
        powerCharm: true,
        powerTalon: true
      },
      motion: {
        elementRate: 0.5,
        value: 100
      },
      skill: {
        agitator: 7,
        attackBoost: 7,
        criticalBoost: 3,
        criticalElement: 1.55,
        criticalEye: 7,
        elementAttack: 6,
        elementBoost: 2,
        fortify: 2,
        freeElem: 3,
        latentPower: 7,
        peakPerformance: 3,
        weaknessExploit: 3
      },
      target: {
        anger: true,
        elementalEffectiveness: 100,
        physicalEffectiveness: 100,
        wounded: true
      },
      weapon: {
        affinity: 10,
        attack: 100,
        element: 100,
        elementHidden: true,
        sharpness: 'purple'
      }
    }
    expect(damageDetail(condition)).toStrictEqual(damageDetail(condition))
  })
})
