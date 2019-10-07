import { damage } from '../../src/damage'
import { buildPhysicalCondition, ITestCondition } from '../helper'

describe('buff', (): void => {
  let condition: ITestCondition
  beforeEach((): void => {
    condition = buildPhysicalCondition()
  })

  test('powerCharm is applied', (): void => {
    condition.buff.powerCharm = true
    expect(damage(condition)).toBe(106)
  })

  test('powerTalon is applied', (): void => {
    condition.buff.powerTalon = true
    expect(damage(condition)).toBe(109)
  })

  test('mightPill and mightSeed is applied', (): void => {
    condition.buff.mightSeed = true
    condition.buff.mightPill = false
    expect(damage(condition)).toBe(110)
    condition.buff.mightSeed = false
    condition.buff.mightPill = true
    expect(damage(condition)).toBe(125)
    condition.buff.mightSeed = true
    condition.buff.mightPill = true
    expect(damage(condition)).toBe(125)
  })

  test('canteen is applied', (): void => {
    condition.buff.canteen = 'S'
    expect(damage(condition)).toBe(105)
    condition.buff.canteen = 'M'
    expect(damage(condition)).toBe(110)
    condition.buff.canteen = 'L'
    expect(damage(condition)).toBe(115)
  })

  test('demondrug and megaDemondrug is applied', (): void => {
    condition.buff.demondrug = true
    condition.buff.megaDemondrug = false
    expect(damage(condition)).toBe(105)
    condition.buff.demondrug = false
    condition.buff.megaDemondrug = true
    expect(damage(condition)).toBe(107)
    condition.buff.demondrug = true
    condition.buff.megaDemondrug = true
    expect(damage(condition)).toBe(107)
  })

  test('demonPowder is applied', (): void => {
    condition.buff.demonPowder = true
    expect(damage(condition)).toBe(110)
  })

  test('coating is applied', (): void => {
    condition.buff.coating = 'power'
    expect(damage(condition)).toBe(135)
    condition.buff.coating = 'crossRange'
    expect(damage(condition)).toBe(120)
  })

  test('all applied', (): void => {
    condition.buff.powerCharm = true
    condition.buff.powerTalon = true
    condition.buff.mightSeed = true
    condition.buff.mightPill = true
    condition.buff.canteen = 'L'
    condition.buff.demondrug = true
    condition.buff.megaDemondrug = true
    condition.buff.demonPowder = true
    expect(damage(condition)).toBe(172)
  })
})

