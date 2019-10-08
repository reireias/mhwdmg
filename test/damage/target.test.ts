import { damage } from '../../src/damage'
import { buildPhysicalCondition, ITestCondition } from '../helper'

describe('physicalDamage', (): void => {
  let condition: ITestCondition
  beforeEach((): void => {
    condition = buildPhysicalCondition()
  })

  test('wounded is applied', (): void => {
    condition.target.physicalEffectiveness = 20
    condition.target.wounded = true
    expect(damage(condition)).toBe(40)
  })
})
