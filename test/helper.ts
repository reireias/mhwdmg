import { IMotion, ITarget, IWeapon } from '../src/types/mhwdmg'

export interface ICondition {
  weapon: IWeapon
  target: ITarget
  motion: IMotion
}

// base condition: damage = 100
export const buildPhysicalCondition = (): ICondition => {
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

// base condition: damage = 100
export const buildElementalCondition = (): ICondition => {
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
