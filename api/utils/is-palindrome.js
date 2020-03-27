const cleanString = str => {
  // Remove anything that's not a letter
  return str.replace(/[^A-Za-z]/g, "").toLowerCase()
}

module.exports = message => {
  if (typeof message !== "string" || !message) return false

  const cleanedStr = cleanString(message)
  const reversedStr = cleanedStr
    .split("")
    .reverse("")
    .join("")

  return cleanedStr === reversedStr
}
