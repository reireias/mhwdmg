import { ISkill, ITarget, IWeapon } from './types/mhwdmg'

export function applySkill(
  weapon: IWeapon,
  skill: ISkill,
  target: ITarget
): IWeapon {
  const result: IWeapon = { ...weapon }
  const elementMax =
    weapon.element < 250
      ? weapon.element + 150
      : Math.round((weapon.element / 10) * 1.6) * 10

  // 攻撃
  if (skill.attackBoost) {
    result.attack += skill.attackBoost * 3
    if (skill.attackBoost >= 4) {
      result.affinity += 5
    }
  }

  // 見切り
  if (skill.criticalEye) {
    result.affinity += skill.criticalEye * 5
    if (skill.criticalEye === 7) {
      result.affinity += 5
    }
  }

  // 弱点特効
  if (skill.weaknessExploit) {
    switch (skill.weaknessExploit) {
      case 1:
        result.affinity += target.wounded ? 15 : 10
        break
      case 2:
        result.affinity += target.wounded ? 30 : 15
        break
      case 3:
        result.affinity += target.wounded ? 50 : 30
        break
    }
  }

  // 挑戦者
  if (skill.agitator && target.anger) {
    result.attack += skill.agitator * 4
    if (skill.agitator < 4) {
      result.affinity += 5
    } else {
      result.affinity += 5 * (skill.agitator - 3)
    }
  }

  // フルチャージ
  if (skill.peakPerformance) {
    result.attack += skill.peakPerformance * 5
    if (skill.peakPerformance === 3) {
      result.attack += 5
    }
  }

  // 力お解放
  if (skill.latentPower) {
    result.affinity += skill.latentPower * 10
    if (skill.latentPower >= 6) {
      result.affinity -= 10
    }
  }

  // 属性解放 & 属性加速(解放部分)
  // TODO: 切り捨てか四捨五入か確認
  if (weapon.elementHidden) {
    let point = 0
    if (skill.freeElem) {
      point += skill.freeElem
    }
    if (skill.elementBoost) {
      point += skill.elementBoost + 1
    }
    if (point === 1 || point === 2) {
      result.element = Math.round((weapon.element * point) / 3 / 10) * 10
      result.elementHidden = false
    }
    if (point >= 3) {
      result.elementHidden = false
    }
  }

  // 属性強化
  if (weapon.element) {
    switch (skill.elementAttack) {
      case 1:
        result.element += 30
        break
      case 2:
        result.element += 60
        break
      case 3:
        result.element += 100
        break
      case 4:
        result.element *= 1.05
        result.element += 100
        break
      case 5:
        result.element *= 1.1
        result.element += 100
        break
      case 6:
        result.element *= 1.2
        result.element += 100
        break
    }
  }

  // 属性加速
  if (skill.elementBoost === 1 && weapon.element) {
    result.element += 60
  } else if (skill.elementBoost === 2 && weapon.element) {
    result.element += 150
  }

  // 属性上限チェック
  if (result.element > elementMax) {
    result.element = elementMax
  }
  return result
}
