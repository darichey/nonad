export type If<A extends boolean, Then, Else> =
  A extends true ? Then : Else

export type And<A extends boolean, B extends boolean> =
  If<A, B, false>
  