export interface browserEvent {
    target: target,
    currentTarget: currentTarget
}

export interface target {
    value: string
}

export interface currentTarget {
    dataset: dataset
}

export interface dataset {
    id: string
}