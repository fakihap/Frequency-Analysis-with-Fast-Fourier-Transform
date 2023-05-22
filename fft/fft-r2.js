const math = require('mathjs')

const fftdit = (X) => {
    if (X.length == 1) return [X[0]]

    let xe = [], xo = []
    for (let i = 0; i < X.length; i++) {
        if (i % 2 == 0) // odd
            xo.push(X[i])
        else
            xe.push(X[i])
    }

    xe = fftdit(xe)
    xo = fftdit(xo)

    let result = []

    for (let k = 0; k < X.length/2; k++) {
        let p = xo[k];
        let q = math.multiply(xe[k], math.exp(math.multiply(-2 * math.pi * k / X.length, math.i)));
        
        result[k] = math.add(p, q)
        result[k + X.length/2] = math.subtract(p, q)
    }
    
    return result
}

const ifftdit = (X) => {
    if (X.length == 1) return [X[0]]

    let xe = [], xo = []
    for (let i = 0; i < X.length; i++) {
        if (i % 2 == 0) // odd
            xo.push(X[i])
        else
            xe.push(X[i])
    }

    xe = ifftdit(xe)
    xo = ifftdit(xo)

    let result = []

    for (let k = 0; k < X.length/2; k++) {
        let p = xo[k];
        let q = math.multiply(xe[k], math.exp(math.multiply(2 * math.pi * k / X.length, math.i)));
        
        result[k] = math.add(p, q)
        result[k + X.length/2] = math.subtract(p, q)
    }

    return result
}

const fftRadix2 = (X) => {
    if (X.length != 0 && !math.isComplex(X[0]))
        return fftdit(X.map(e => math.complex(e, 0))).map(e => e.toVector())
    
    return fftdit(X).map(e => e.toVector())
}

const ifftRadix2 = (X) => {
    return ifftdit(X).map(e => math.divide(e, X.length))
}

// const sui = [ 3, 1, 2, 1, 3, 1, 2, 1,
// 6, 7, 1, 2, 4, 1, 9, 10]
const sui = [ 3, 1, 2, 1]
// console.log(fftRadix2(sui))
// console.log(fft(sui))
// console.log(dft(sui))
// console.log(ifftRadix2(fftRadix2(sui)))
// console.log(idft(dft(sui)))

module.exports = {fftRadix2, ifftRadix2}