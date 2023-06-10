export function toCapitalize(str: string): string {
  if (str.length === 0) {
    return str // Return an empty string if input is empty
  }

  const words = str.split(' ') // Split the string into an array of words
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  ) // Capitalize the first character of each word
  const capitalizedString = capitalizedWords.join(' ') // Join the capitalized words back into a string

  return capitalizedString
}
