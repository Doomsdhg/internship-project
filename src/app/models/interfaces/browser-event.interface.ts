export interface BrowserEvent {
    target: Target,
    currentTarget: CurrentTarget
}

export interface Target {
    value: string
}

export interface CurrentTarget {
    dataset: Dataset
}

export interface Dataset {
    id: string
}


export interface El {
    value: string
  }