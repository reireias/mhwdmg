[![npm version](https://badge.fury.io/js/mhwdmg.svg)](https://badge.fury.io/js/mhwdmg) [![Build Status](https://travis-ci.org/reireias/mhwdmg.svg?branch=master)](https://travis-ci.org/reireias/mhwdmg)
# MHW DMG

TypeScript and JavaScript library for damage calcuration at MonsterHunterWorld: Iceborne.

## Install

```console
# use yarn
$ yarn add mhwdmg
# use npm
$ npm install --save mhwdmg
```

## Examples
### JavaScript

```js
const { damage, damageDetail } = require('mhwdmg')

// basic
const weapon = {
  attack: 200,
  affinity: 0,
  element: 200,
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
```

### TypeScript
```typescript
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
```
