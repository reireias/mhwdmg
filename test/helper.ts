import { damage } from '../src/damage'
import { IBuff, IMotion, ISkill, ITarget, IWeapon } from '../src/types/mhwdmg'

export interface ICondition {
  weapon: IWeapon
  target: ITarget
  motion: IMotion
  buff: IBuff
  skill: ISkill
}

// base condition: damage = 100
export const buildPhysicalCondition = (): ICondition => {
  return {
    buff: {},
    motion: {
      value: 100
    },
    skill: {},
    target: {
      anger: false,
      elementalEffectiveness: 0,
      physicalEffectiveness: 100,
      wounded: false
    },
    weapon: {
      affinity: 0,
      attack: 100,
      element: 0,
      elementHidden: false,
      sharpness: 'yellow'
    }
  }
}

// base condition: damage = 100
export const buildElementalCondition = (): ICondition => {
  return {
    buff: {},
    motion: {
      value: 0
    },
    skill: {},
    target: {
      anger: false,
      elementalEffectiveness: 100,
      physicalEffectiveness: 0,
      wounded: false
    },
    weapon: {
      affinity: 0,
      attack: 100,
      element: 1000,
      elementHidden: false,
      sharpness: 'green'
    }
  }
}

export const damageWithCondition = (condition: ICondition): number => {
  return damage(condition.weapon, condition.target, condition.motion, condition.buff, condition.skill)
}
