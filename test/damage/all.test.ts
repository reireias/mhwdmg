import { damage } from '../../src/damage'
import { ICondition } from '../../src/types/mhwdmg'

describe('all', (): void => {
  test('no side effect', (): void => {
    const condition: ICondition = {
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
    const before = JSON.stringify(condition)
    damage(condition)
    const after = JSON.stringify(condition)
    expect(before).toBe(after)
  })
})
