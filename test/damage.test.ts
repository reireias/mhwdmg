import { damage } from '@/index.ts'

describe('damage', (): void => {
  it('damage test dummy', (): void => {
    const weapon: IWeapon = {
      attack: 100,
      critical: 0
    }
    expect(damage(weapon)).toBe(weapon.attack)
  })
})
