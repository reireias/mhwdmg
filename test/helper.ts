import { IBuff, ICondition, ISkill } from '../src/types/mhwdmg'

export interface ITestCondition extends ICondition {
  buff: IBuff
  skill: ISkill
}

// base condition: damage = 100
export const buildPhysicalCondition = (): ITestCondition => {
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
export const buildElementalCondition = (): ITestCondition => {
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
