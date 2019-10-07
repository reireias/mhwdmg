import { damage } from '../../src/damage'
import { Sharpness } from '../../src/types/mhwdmg'
import { buildElementalCondition, buildPhysicalCondition, ICondition } from '../helper'

describe('physicalDamage', (): void => {
  describe('sharpness', (): void => {
    const condition: ICondition = buildPhysicalCondition()
    const sharpnessList: Array<{ key: Sharpness; value: number }> = [
      { key: 'red', value: 0.5 },
      { key: 'orange', value: 0.75 },
      { key: 'yellow', value: 1.0 },
      { key: 'green', value: 1.05 },
      { key: 'blue', value: 1.2 },
      { key: 'white', value: 1.32 },
      { key: 'purple', value: 1.39 },
      { key: 'ammo', value: 1.0 }
    ]
    it('is correct', (): void => {
      sharpnessList.forEach((sharpness: { key: Sharpness, value: number }) => {
        condition.weapon.sharpness = sharpness.key
        expect(damage(condition.weapon, condition.target, condition.motion)).toBe(100 * sharpness.value)
      })
    })
  })

  describe('affinity', (): void => {
    const condition: ICondition = buildPhysicalCondition()

    describe('0%', (): void => {
      it('is correct', (): void => {
        condition.weapon.affinity = 0
        expect(damage(condition.weapon, condition.target, condition.motion)).toBe(100)
      })
    })

    describe('50%', (): void => {
      it('is correct', (): void => {
        condition.weapon.affinity = 50
        expect(damage(condition.weapon, condition.target, condition.motion)).toBe(112.5)
      })
    })

    describe('100%', (): void => {
      it('is correct', (): void => {
        condition.weapon.affinity = 100
        expect(damage(condition.weapon, condition.target, condition.motion)).toBe(125)
      })
    })

    describe('-50%', (): void => {
      it('is correct', (): void => {
        condition.weapon.affinity = -50
        expect(damage(condition.weapon, condition.target, condition.motion)).toBe(87.5)
      })
    })
  })

  describe('target physicalEffectiveness', (): void => {
    const condition: ICondition = buildPhysicalCondition()
    const effectivenessList: number[] = [100, 50, 10]

    it('is correct', (): void => {
      effectivenessList.forEach((effectiveness: number) => {
        condition.target.physicalEffectiveness = effectiveness
        expect(damage(condition.weapon, condition.target, condition.motion)).toBe(effectiveness)
      })
    })
  })

  describe('motion', (): void => {
    const condition: ICondition = buildPhysicalCondition()
    const motionList: number[] = [100, 50, 10]

    it('is correct', (): void => {
      motionList.forEach((motionValue: number) => {
        condition.motion.value = motionValue
        expect(damage(condition.weapon, condition.target, condition.motion)).toBe(motionValue)
      })
    })
  })

  describe('anger', (): void => {
    const condition: ICondition = buildPhysicalCondition()

    it('is 1.1 times normal', (): void => {
      condition.target.anger = true
      expect(damage(condition.weapon, condition.target, condition.motion)).toBe(110)
    })
  })
})

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
        expect(damage(condition.weapon, condition.target, condition.motion)).toBe(Math.round(100 * sharpness.value))
      })
    })
  })

  describe('target elementalEffectiveness', (): void => {
    const condition: ICondition = buildElementalCondition()
    const effectivenessList: number[] = [100, 50, 10]

    it('is correct', (): void => {
      effectivenessList.forEach((effectiveness: number) => {
        condition.target.elementalEffectiveness = effectiveness
        expect(damage(condition.weapon, condition.target, condition.motion)).toBe(effectiveness)
      })
    })
  })

  describe('anger', (): void => {
    const condition: ICondition = buildElementalCondition()

    it('is 1.1 times normal', (): void => {
      condition.target.anger = true
      expect(damage(condition.weapon, condition.target, condition.motion)).toBe(110)
    })
  })

  describe('elementRate', (): void => {
    const condition: ICondition = buildElementalCondition()
    const elementRate = 0.5

    it('is 0.5 times normal', (): void => {
      condition.motion.elementRate = elementRate
      expect(damage(condition.weapon, condition.target, condition.motion)).toBe(50)
    })
  })
})
