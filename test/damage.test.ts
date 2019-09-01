import { damage } from '@/index.ts'

describe('damage', (): void => {
  it('damage test dummy', (): void => {
    const weapon: Weapon = {
      attack: 100
    }
    expect(damage(weapon)).toBe(weapon.attack)
  })
})
