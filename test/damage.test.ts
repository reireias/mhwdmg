import { damage } from '@/index.ts'

describe('physicalDamage', (): void => {
  describe('sharpness', (): void => {
    const weapon: IWeapon = {
      affinity: 0,
      attack: 100,
      element: 0,
      sharpness: 'white'
    }
    const target: ITarget = {
      anger: false,
      elementalEffectiveness: 0,
      physicalEffectiveness: 100
    }
    const motion: IMotion = {
      value: 100
    }
    const sharpnessList: Array<{ key: Sharpness; value: number }> = [
      { key: 'red', value: 0.5 },
      { key: 'orange', value: 0.75 },
      { key: 'yellow', value: 1.0 },
      { key: 'green', value: 1.05 },
      { key: 'blue', value: 1.2 },
      { key: 'white', value: 1.32 },
      { key: 'purple', value: 1.39 }
    ]
    it('sharpness rate is correct', (): void => {
      sharpnessList.forEach((sharpness: { key: Sharpness, value: number }) => {
        weapon.sharpness = sharpness.key
        expect(damage(weapon, target, motion)).toBe(100 * sharpness.value)
      })
    })
  })
})
