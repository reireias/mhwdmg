interface IWeapon {
  attack: number
  affinity: number
  element: number
  sharpness: Sharpness
}

type Sharpness = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'white' | 'purple'

interface ITarget {
  physicalEffectiveness: number
  elementalEffectiveness: number
  anger: boolean
}

interface IMotion {
  value: number
}
