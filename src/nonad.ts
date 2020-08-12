import { If, BoolToString } from "./bool"
import { Eq, Intersects } from "./typeops"
import { Tail, IsNil } from "./list"

export type Nonad<Type, Keys extends keyof Type> = {
  [Prop in Keys]: Type[Prop];
}

// This can be written in a much better way after https://github.com/microsoft/TypeScript/pull/40002
export type Full<T, List extends any[], Acc = {}> = {
  "true":
    If<Eq<T, Acc>,
      Acc,
      never>
  "false":
    If<Intersects<Acc, List[0]>,
      never,
      Full<T, Tail<List>, Acc & List[0]>>
}[BoolToString<IsNil<List>>]

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
