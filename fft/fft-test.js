const { random } = require('mathjs')

const fftRadix2 = require('./fft-r2').fftRadix2
const ifftRadix2 = require('./fft-r2').ifftRadix2

const fft = require('fft-js').fft
const ifft = require('fft-js').ifft

const dft = require('./dft').dft
const idft = require('./dft').idft

let samples = []

for (let i = 0; i < 128; i++) {
    samples.push(random(0, 10))
}

let startTime, endTime

startTime = performance.now()
let dft__ = dft(samples)
endTime = performance.now()
console.log("time elapsed for DFT: \t" + (endTime - startTime) + ' ms')

startTime = performance.now()
let fftR2__ = fftRadix2(samples)
endTime = performance.now()
console.log("time elapsed for FFT: \t" + (endTime - startTime) + ' ms')

startTime = performance.now()
let fft__ = fft(samples)
endTime = performance.now()
console.log("time elapsed for FFTJS: " + (endTime - startTime) + ' ms')

startTime = performance.now()
idft(dft__)
endTime = performance.now()
console.log("time elapsed for IDFT: \t" + (endTime - startTime) + ' ms')

startTime = performance.now()
ifftRadix2(fftR2__)
endTime = performance.now()
console.log("time elapsed for IFFT: \t" + (endTime - startTime) + ' ms')

startTime = performance.now()
ifft(fft__)
endTime = performance.now()
console.log("time elapsed for IFFTJS: " + (endTime - startTime) + ' ms')
