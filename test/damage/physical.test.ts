import { damage } from '../../src/damage'
import { Sharpness } from '../../src/types/mhwdmg'
import { buildPhysicalCondition, ITestCondition } from '../helper'

describe('physicalDamage', (): void => {
  describe('sharpness', (): void => {
    const condition: ITestCondition = buildPhysicalCondition()
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
        expect(damage(condition)).toBe(100 * sharpness.value)
      })
    })
  })

  describe('affinity', (): void => {
    const condition: ITestCondition = buildPhysicalCondition()

    describe('0%', (): void => {
      it('is correct', (): void => {
        condition.weapon.affinity = 0
        expect(damage(condition)).toBe(100)
      })
    })

    describe('50%', (): void => {
      it('is correct', (): void => {
        condition.weapon.affinity = 50
        expect(damage(condition)).toBe(112.5)
      })
    })

    describe('100%', (): void => {
      it('is correct', (): void => {
        condition.weapon.affinity = 100
        expect(damage(condition)).toBe(125)
      })
    })

    describe('-50%', (): void => {
      it('is correct', (): void => {
        condition.weapon.affinity = -50
        expect(damage(condition)).toBe(87.5)
      })
    })
  })

  describe('target physicalEffectiveness', (): void => {
    const condition: ITestCondition = buildPhysicalCondition()
    const effectivenessList: number[] = [100, 50, 10]

    it('is correct', (): void => {
      effectivenessList.forEach((effectiveness: number) => {
        condition.target.physicalEffectiveness = effectiveness
        expect(damage(condition)).toBe(effectiveness)
      })
    })
  })

  describe('motion', (): void => {
    const condition: ITestCondition = buildPhysicalCondition()
    const motionList: number[] = [100, 50, 10]

    it('is correct', (): void => {
      motionList.forEach((motionValue: number) => {
        condition.motion.value = motionValue
        expect(damage(condition)).toBe(motionValue)
      })
    })
  })

  describe('anger', (): void => {
    const condition: ITestCondition = buildPhysicalCondition()

    it('is 1.1 times normal', (): void => {
      condition.target.anger = true
      expect(damage(condition)).toBe(110)
    })
  })
})

