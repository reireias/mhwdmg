import { damage } from '@/index.ts'

describe('damage', (): void => {
  it('damage test dummy', (): void => {
    const weapon: IWeapon = {
      affinity: 0,
      attack: 100,
      element: 0
    }
    const target: ITarget = {
      elementalEffectiveness: 10,
      physicalEffectiveness: 50
    }
    const motion: IMotion = {
      value: 30
    }
    expect(damage(weapon, target, motion)).toBe(15)
  })
})
