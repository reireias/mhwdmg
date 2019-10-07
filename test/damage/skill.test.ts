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
      condition.skill.attackBoost = 1
      expect(damage(condition)).toBe(103)
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
    })
  })
})