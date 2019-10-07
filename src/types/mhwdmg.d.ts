export interface IWeapon {
  attack: number
  affinity: number
  element: number
  sharpness: Sharpness
}

export type Sharpness = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'white' | 'purple' | 'ammo'

export interface ITarget {
  physicalEffectiveness: number
  elementalEffectiveness: number
  anger: boolean
}

export interface IMotion {
  value: number
  elementRate?: number
}

export interface IBuff {
  // 力の護符
  powerCharm?: boolean
  // 力の爪
  powerTalon?: boolean
  // 怪力の種
  mightSeed?: boolean
  // 怪力の丸薬
  mightPill?: boolean
  // 食事
  canteen?: 'S' | 'M' | 'L'
  // 鬼人薬
  demondrug?: boolean
  // 鬼人薬G
  megaDemondrug?: boolean
  // 鬼人の粉塵
  demonPowder?: boolean
  // ビン
  coating?: 'power' | 'crossRange'
}
