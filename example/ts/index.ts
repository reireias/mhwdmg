import { damage, damageDetail } from 'mhwdmg'
import { IBuff, ICondition, IMotion, ISkill, ITarget, IWeapon } from 'mhwdmg/dist/types/mhwdmg'

// basic
const weapon: IWeapon = {
  affinity: 0,
  attack: 200,
  element: 200,
  elementHidden: false,
  sharpness: 'purple'
}

const motion: IMotion = {
  value: 20
}

const target: ITarget = {
  anger: false,
  elementalEffectiveness: 20,
  physicalEffectiveness: 40,
  wounded: false
}

const condition: ICondition = {
  motion,
  target,
  weapon
}

console.log(damage(condition)) // return 27


// with skills
const skill: ISkill = {
  // attackBoost Lv.7
  attackBoost: 7,
  // criticalEye Lv.3
  criticalEye: 3
}

condition.skill = skill

console.log(damage(condition)) // return 31.2


// with buff
const buff: IBuff = {
  canteen: 'L',
  demondrug: true
}

condition.buff = buff

console.log(damage(condition)) // return 32.4


// damageDetail returns detail of calcuration result
console.log(damageDetail(condition))
/*
{
  base: { elemental: 5, physical: 26 },
  critical: { elemental: 5, physical: 33 },
  expected: { elemental: 5, physical: 27.4 }
}
*/
