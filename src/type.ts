export type GraphConstructorType = {
  node: Array<string> | null | undefined,
  edge: EdgeType | null | undefined,
  isUnforked: boolean | null | undefined
}

export type EdgeType = {
  [key: string | number] : Array<string>
}

export type GraphClassType = {
  node: Array<string>,
  edge: EdgeType,
  start: null
  end: null
}