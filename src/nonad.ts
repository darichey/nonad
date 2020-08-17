import { If } from "./bool"
import { Eq, Intersects } from "./typeops"

export type Nonad<Type, Keys extends keyof Type> = {
  [Prop in Keys]: Type[Prop];
}

export type Full<T, List extends any[], Acc = {}> =
  List extends [infer H, ...infer Tail]
  ? If<Intersects<Acc, H>, never, Full<T, Tail, Acc & H>>
  : If<Eq<T, Acc>, Acc, never>

//// Value Land ////

export function full<T, List extends any[]>(...nonads: List): Full<T, List> {
  // Type instantiation is excessively deep and possibly infinite.
  // feelsbad
  return fullHelper({}, nonads) as any
}

function fullHelper<T, List extends any[]>(acc: any, ...nonads: List): Full<T, List> {
  if (nonads.length == 0) {
    return acc as Full<T, List>
  } else {
    const n = nonads.shift()
    const newAcc = {...acc, ...n}

    // Type instantiation is excessively deep and possibly infinite.
    // feelsbad
    return fullHelper(newAcc, nonads) as any
  }
}
