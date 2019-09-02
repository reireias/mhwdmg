import { damage } from '@/index.ts'

interface ICondition {
  weapon: IWeapon
  target: ITarget
  motion: IMotion
}


describe('physicalDamage', (): void => {
  // base condition: damage = 100
  function buildCondition(): ICondition {
    return {
      motion: {
        value: 100
      },
      target: {
        anger: false,
        elementalEffectiveness: 0,
        physicalEffectiveness: 100
      },
      weapon: {
        affinity: 0,
        attack: 100,
        element: 0,
        sharpness: 'yellow'
      }
    }
  }

  describe('sharpness', (): void => {
    const condition: ICondition = buildCondition()
    const sharpnessList: Array<{ key: Sharpness; value: number }> = [
      { key: 'red', value: 0.5 },
      { key: 'orange', value: 0.75 },
      { key: 'yellow', value: 1.0 },
      { key: 'green', value: 1.05 },
      { key: 'blue', value: 1.2 },
      { key: 'white', value: 1.32 },
      { key: 'purple', value: 1.39 }
    ]
    it('is correct', (): void => {
      sharpnessList.forEach((sharpness: { key: Sharpness, value: number }) => {
        condition.weapon.sharpness = sharpness.key
        expect(damage(condition.weapon, condition.target, condition.motion)).toBe(100 * sharpness.value)
      })
    })
  })

  describe('affinity', (): void => {
    const condition: ICondition = buildCondition()

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
    const condition: ICondition = buildCondition()
    const effectivenessList: number[] = [100, 50, 10]

    it('is correct', (): void => {
      effectivenessList.forEach((effectiveness: number) => {
        condition.target.physicalEffectiveness = effectiveness
        expect(damage(condition.weapon, condition.target, condition.motion)).toBe(effectiveness)
      })
    })
  })

  describe('motion', (): void => {
    const condition: ICondition = buildCondition()
    const motionList: number[] = [100, 50, 10]

    it('is correct', (): void => {
      motionList.forEach((motionValue: number) => {
        condition.motion.value = motionValue
        expect(damage(condition.weapon, condition.target, condition.motion)).toBe(motionValue)
      })
    })
  })

  describe('anger', (): void => {
    const condition: ICondition = buildCondition()

    it('is 1.1 times normal', (): void => {
      condition.target.anger = true
      expect(damage(condition.weapon, condition.target, condition.motion)).toBe(110)
    })
  })
})

describe('elementalDamage', (): void => {
  // base condition: damage = 100
  function buildCondition(): ICondition {
    return {
      motion: {
        value: 0
      },
      target: {
        anger: false,
        elementalEffectiveness: 100,
        physicalEffectiveness: 0
      },
      weapon: {
        affinity: 0,
        attack: 100,
        element: 1000,
        sharpness: 'green'
      }
    }
  }

  describe('sharpness', (): void => {
    const condition: ICondition = buildCondition()
    const sharpnessList: Array<{ key: Sharpness; value: number }> = [
      { key: 'red', value: 0.25 },
      { key: 'orange', value: 0.5 },
      { key: 'yellow', value: 0.75 },
      { key: 'green', value: 1.0 },
      { key: 'blue', value: 1.0625 },
      { key: 'white', value: 1.125 },
      { key: 'purple', value: 1.2 }
    ]

    it('is correct', (): void => {
      sharpnessList.forEach((sharpness: { key: Sharpness, value: number }) => {
        condition.weapon.sharpness = sharpness.key
        expect(damage(condition.weapon, condition.target, condition.motion)).toBe(Math.round(100 * sharpness.value))
      })
    })
  })

  describe('target elementalEffectiveness', (): void => {
    const condition: ICondition = buildCondition()
    const effectivenessList: number[] = [100, 50, 10]

    it('is correct', (): void => {
      effectivenessList.forEach((effectiveness: number) => {
        condition.target.elementalEffectiveness = effectiveness
        expect(damage(condition.weapon, condition.target, condition.motion)).toBe(effectiveness)
      })
    })
  })

  describe('anger', (): void => {
    const condition: ICondition = buildCondition()

    it('is 1.1 times normal', (): void => {
      condition.target.anger = true
      expect(damage(condition.weapon, condition.target, condition.motion)).toBe(110)
    })
  })
})
