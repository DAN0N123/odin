const {capitalize, reverseString, calculator, caesarCipher, analyzeArray } = require('../testing.js')


test('Capitalize first letter', () => {
    expect(capitalize('heyo')).toBe('Heyo')
});

test('reverseString', () => {
    expect(reverseString('Heyo')).toBe('oyeH')
})

test('calculator addition', () => {
    expect(calculator.add(7,3)).toBe(10)
})

test('calculator subtraction',  () => {
    expect(calculator.subtract(7,3)).toBe(4)
})

test('calculator multiplication',  () => {
    expect(calculator.multiply(7,3)).toBe(21)
})

test('calculator division',  () => {
    expect(calculator.divide(21,3)).toBe(7)
})

test('caesar cipher', () => {
    expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!")
})

test('analyze array', () => {
    expect(analyzeArray([1,8,3,4,2,6])).toEqual({
        average: 4,
        min: 1,
        max: 8,
        length: 6
    })
})