import { IBuff, IWeapon } from './types/mhwdmg'

export function applyBuff(weapon: IWeapon, buff: IBuff): IWeapon {
  const result: IWeapon = { ...weapon }

  // 力の護符
  if (buff.powerCharm) {
    result.attack += 6
  }
  // 力の爪
  if (buff.powerTalon) {
    result.attack += 9
  }
  // 怪力の種/丸薬
  if (buff.mightPill) {
    result.attack += 25
  } else if (buff.mightSeed) {
    result.attack += 10
  }
  // 食事
  switch (buff.canteen) {
    case 'S':
      result.attack += 5
      break
    case 'M':
      result.attack += 10
      break
    case 'L':
      result.attack += 15
      break
  }
  // 鬼人薬/鬼人薬G
  if (buff.megaDemondrug) {
    result.attack += 7
  } else if (buff.demondrug) {
    result.attack += 5
  }
  // 鬼人の粉塵
  if (buff.demonPowder) {
    result.attack += 10
  }
  return result
}
