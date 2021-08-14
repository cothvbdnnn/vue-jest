export function upperText([firstCharacter, ...rest]) {
  return firstCharacter.toUpperCase() + rest.join('')
}