const { damage, damageDetail } = require('mhwdmg')

// basic
const weapon = {
  attack: 200,
  affinity: 0,
  element: 200,
  elementHidden: false,
  sharpness: 'purple'
}

const motion = {
  value: 20
}

const target = {
  physicalEffectiveness: 40,
  elementalEffectiveness: 20,
  anger: false,
  wounded: false
}

const condition = {
  weapon,
  motion,
  target
}

console.log(damage(condition)) // return 27


// with skills
const skill = {
  // attackBoost Lv.7
  attackBoost: 7,
  // criticalEye Lv.3
  criticalEye: 3
}

condition.skill = skill

console.log(damage(condition)) // return 31.2


// with buff
const buff = {
  demondrug: true,
  canteen: 'L'
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
