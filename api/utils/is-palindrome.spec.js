const isPalindrome = require("./is-palindrome")

test("should return true if string is palindrome", () => {
  expect(isPalindrome("racecar")).toBeTruthy()
  expect(isPalindrome("rac3232e$$ca(()r")).toBeTruthy()
  expect(isPalindrome("rac3232e$$ca(()r")).toBeTruthy()
  expect(isPalindrome("CiViC")).toBeTruthy()
  expect(isPalindrome("ka1y-a-k")).toBeTruthy()
  expect(isPalindrome("Rotator")).toBeTruthy()
  expect(isPalindrome("mom")).toBeTruthy()
})

test("should return false if string is not palindrome", () => {
  expect(isPalindrome("qlik")).toBeFalsy()
  expect(isPalindrome("racecarr")).toBeFalsy()
  expect(isPalindrome("computer")).toBeFalsy()
  expect(isPalindrome("table top tennis")).toBeFalsy()
  expect(isPalindrome("Palindrome")).toBeFalsy()
})
