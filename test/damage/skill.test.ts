import { damage } from '../../src/damage'
import {
  buildElementalCondition,
  buildPhysicalCondition,
  ITestCondition
} from '../helper'

describe('skill', (): void => {
  describe('physical skill', (): void => {
    let condition: ITestCondition
    beforeEach((): void => {
      condition = buildPhysicalCondition()
    })

    test('attackBoost is applied', (): void => {
      for (let i: number = 1; i <= 7; i++) {
        condition.skill.attackBoost = i
        if (i >= 4) {
          condition.weapon.affinity = -5
        }
        expect(damage(condition)).toBe(100 + i * 3)
      }
    })

    test('criticalEye is applied', (): void => {
      condition.weapon.attack = 400
      for (let i: number = 1; i <= 6; i++) {
        condition.skill.criticalEye = i
        expect(damage(condition)).toBe(400 + 5 * i)
      }
      // Lv7
      condition.skill.criticalEye = 7
      expect(damage(condition)).toBe(440)
    })

    test('weaknessExploit is applied', (): void => {
      condition.weapon.attack = 400
      condition.skill.weaknessExploit = 1
      expect(damage(condition)).toBe(410)
      condition.skill.weaknessExploit = 2
      expect(damage(condition)).toBe(415)
      condition.skill.weaknessExploit = 3
      expect(damage(condition)).toBe(430)
      condition.target.wounded = true
      condition.skill.weaknessExploit = 1
      expect(damage(condition)).toBe(415)
      condition.skill.weaknessExploit = 2
      expect(damage(condition)).toBe(430)
      condition.skill.weaknessExploit = 3
      expect(damage(condition)).toBe(450)
    })

    test('criticalBoost is applied', (): void => {
      condition.weapon.affinity = 100
      condition.skill.criticalBoost = 1
      expect(damage(condition)).toBe(130)
      condition.skill.criticalBoost = 2
      expect(damage(condition)).toBe(135)
      condition.skill.criticalBoost = 3
      expect(damage(condition)).toBe(140)
    })

    test('agitator is applied', (): void => {
      const expected = [0, 115.45, 120.5, 124.55, 129.6, 135.3, 141.25, 148]
      condition.target.anger = true
      for (let i = 1; i <= 7; i++) {
        condition.skill.agitator = i
        expect(damage(condition)).toBe(expected[i])
      }
    })

    test('criticalBoost is applied', (): void => {
      condition.skill.peakPerformance = 1
      expect(damage(condition)).toBe(105)
      condition.skill.peakPerformance = 2
      expect(damage(condition)).toBe(110)
      condition.skill.peakPerformance = 3
      expect(damage(condition)).toBe(120)
    })

    test('latentPower is applied', (): void => {
      condition.weapon.attack = 400
      for (let i = 1; i <= 5; i++) {
        condition.skill.latentPower = i
        expect(damage(condition)).toBe(400 + i * 10)
      }
      condition.skill.latentPower = 6
      expect(damage(condition)).toBe(450)
      condition.skill.latentPower = 7
      expect(damage(condition)).toBe(460)
    })

    test('latentPower is applied', (): void => {
      condition.skill.fortify = 1
      expect(damage(condition)).toBe(110)
      condition.skill.fortify = 2
      expect(damage(condition)).toBe(120)
    })
  })

  describe('elemental skill', (): void => {
    let condition: ITestCondition
    beforeEach((): void => {
      condition = buildElementalCondition()
    })

    test('elementAttack is applied', (): void => {
      condition.skill.elementAttack = 1
      expect(damage(condition)).toBe(103)
      condition.skill.elementAttack = 2
      expect(damage(condition)).toBe(106)
      condition.skill.elementAttack = 3
      expect(damage(condition)).toBe(110)
      condition.skill.elementAttack = 4
      expect(damage(condition)).toBe(115)
      condition.skill.elementAttack = 5
      expect(damage(condition)).toBe(120)
      condition.skill.elementAttack = 6
      expect(damage(condition)).toBe(130)
    })

    test('freeElem is applied', (): void => {
      condition.weapon.elementHidden = true
      expect(damage(condition)).toBe(0)
      condition.skill.freeElem = 1
      expect(damage(condition)).toBe(33)
      condition.skill.freeElem = 2
      expect(damage(condition)).toBe(67)
      condition.skill.freeElem = 3
      expect(damage(condition)).toBe(100)
    })

    test('criticalElement is applied', (): void => {
      condition.weapon.affinity = 100
      condition.skill.criticalElement = 1
      expect(damage(condition)).toBe(135)
      condition.skill.criticalElement = 2
      expect(damage(condition)).toBe(155)
    })

    test('elementBoost is applied', (): void => {
      condition.skill.elementBoost = 1
      expect(damage(condition)).toBe(106)
      condition.skill.elementBoost = 2
      expect(damage(condition)).toBe(115)

      condition.weapon.elementHidden = true
      condition.skill.elementBoost = 1
      expect(damage(condition)).toBe(73)
      condition.skill.elementBoost = 2
      expect(damage(condition)).toBe(115)
    })

    test('freeElem & elementBoost is applied', (): void => {
      condition.weapon.elementHidden = true
      condition.skill.freeElem = 1
      condition.skill.elementBoost = 1
      expect(damage(condition)).toBe(106)
      condition.skill.freeElem = 2
      condition.skill.elementBoost = 1
      expect(damage(condition)).toBe(106)
      condition.skill.freeElem = 1
      condition.skill.elementBoost = 2
      expect(damage(condition)).toBe(115)
    })

    test('over element max', (): void => {
      // max = 250 = 100 + 150
      condition.weapon.element = 100
      expect(damage(condition)).toBe(10)
      condition.skill.elementAttack = 6
      expect(damage(condition)).toBe(22)
      condition.skill.elementBoost = 1
      expect(damage(condition)).toBe(25)
      condition.skill.elementBoost = 2
      expect(damage(condition)).toBe(25)

      // max = 480 = 300 * 1.6
      condition.weapon.element = 300
      condition.skill.elementAttack = 0
      condition.skill.elementBoost = 0
      expect(damage(condition)).toBe(30)
      condition.skill.elementAttack = 6
      expect(damage(condition)).toBe(46)
      condition.skill.elementBoost = 1
      expect(damage(condition)).toBe(48)
      condition.skill.elementBoost = 2
      expect(damage(condition)).toBe(48)
    })
  })
})
