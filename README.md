# nonad
> I'll just find some absurd and very obscure latin-greek word and call it that

> sadly "monad" is taken

> I'll call it nonad

\- ghibli 2k20

Thus, nonad was born.

## What is this?
A joke. Mostly. 

`Nonad` is essentially TypeScript's `Pick`. It allows you to construct a "subset" of a type given keys from that type. 

`full` let's you combine several of these partial types into the "full" version. It requires that every key of the full type can be found between the partials and that none of the partials contain the same key.