export type Tail<List extends any[]> =
  List extends [infer _A, ...infer R] ? R : never

export type IsNil<List extends any[]> =
  [] extends List ? true : false
