import { Sharpness } from '../../src/types/mhwdmg'
import { buildElementalCondition, damageWithCondition, ICondition } from '../helper'

describe('elementalDamage', (): void => {
  describe('sharpness', (): void => {
    const condition: ICondition = buildElementalCondition()
    const sharpnessList: Array<{ key: Sharpness; value: number }> = [
      { key: 'red', value: 0.25 },
      { key: 'orange', value: 0.5 },
      { key: 'yellow', value: 0.75 },
      { key: 'green', value: 1.0 },
      { key: 'blue', value: 1.0625 },
      { key: 'white', value: 1.125 },
      { key: 'purple', value: 1.2 },
      { key: 'ammo', value: 1.0 }
    ]

    it('is correct', (): void => {
      sharpnessList.forEach((sharpness: { key: Sharpness, value: number }) => {
        condition.weapon.sharpness = sharpness.key
        expect(damageWithCondition(condition)).toBe(Math.round(100 * sharpness.value))
      })
    })
  })

  describe('target elementalEffectiveness', (): void => {
    const condition: ICondition = buildElementalCondition()
    const effectivenessList: number[] = [100, 50, 10]

    it('is correct', (): void => {
      effectivenessList.forEach((effectiveness: number) => {
        condition.target.elementalEffectiveness = effectiveness
        expect(damageWithCondition(condition)).toBe(effectiveness)
      })
    })
  })

  describe('anger', (): void => {
    const condition: ICondition = buildElementalCondition()

    it('is 1.1 times normal', (): void => {
      condition.target.anger = true
      expect(damageWithCondition(condition)).toBe(110)
    })
  })

  describe('elementRate', (): void => {
    const condition: ICondition = buildElementalCondition()
    const elementRate = 0.5

    it('is 0.5 times normal', (): void => {
      condition.motion.elementRate = elementRate
      expect(damageWithCondition(condition)).toBe(50)
    })
  })
})
