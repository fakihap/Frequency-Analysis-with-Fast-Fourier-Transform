const math = require('mathjs')

const dft = (X) => {
    for (let i = 0; i < X.length; i++) {
        if (!math.isComplex(X[i])) {
            X[i] = math.complex(X[i], 0)
        }
    }

    let result = []

    for (let k = 0; k < X.length; k++) {
        result[k] = 0

        for(let n = 0; n < X.length; n++) {
            result[k] = math.add(result[k], math.multiply(X[n], math.exp(math.multiply(-2 * math.pi * k / X.length, math.i))));
        }
    }

    return result
}


// broken
const idft = (X) => {
    for (let i = 0; i < X.length; i++) {
        if (!math.isComplex(X[i])) {
            X[i] = math.complex(X[i], 0)
        }
    }

    let result = []
    

    for (let k = 0; k < X.length; k++) {
        result[k] = 0

        for(let n = 0; n < X.length; n++) {
            result[k] = math.add(result[k], math.multiply(X[n], math.exp(math.multiply(2 * math.pi * k / X.length, math.i))));
        }
    }

    return result
}

const sui = [ 3, 1, 2, 1]
// console.log(dft(sui))
// console.log(idft(dft(sui)))

module.exports = {dft, idft}