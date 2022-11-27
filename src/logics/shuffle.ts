
export type ShuffledType = {
    old: number
    new: number
}

export function HinduShuffle(array: any[]): ShuffledType[] {
    const n = array.length
    const upper = getRandomInt(n - 1)
    const lower = getRandomInt(upper)
    const num = upper - lower + 1

    return array.map((v, i) => {
        if (i <= lower) {
            return {
                old: i,
                new: i + num - 1
            }
        } else if (lower < i && i <= upper) {
            return {
                old: i,
                new: i - lower - 1
            }
        } else {
            return {
                old: i,
                new: i
            }
        }
    })
}

// ShotgunShuffle is curried function
export function ShotgunShuffle(decks: number) {
    return (array: any[]): ShuffledType[] => {
        const n = array.length
        const decksNum: number[] = []
        decksNum.push(0)
        for (var i: number = 0; i < decks; i++) {
            if (i < n % decks) {
                decksNum.push(Math.trunc(n / decks) + 1)
            } else {
                decksNum.push(Math.trunc(n / decks))
            }
        }
        for (var i: number = 0; i < decks; i++) {
            decksNum[i + 1] += decksNum[i]
        }
        return array.map((_, i) => {
            return {
                old: i,
                new: Math.trunc(i / decks) + decksNum[(i % decks)]
            }
        })
    }
}

export function FarrowShuffle(array: any[]): ShuffledType[] {
    const n = array.length
    const halfN = Math.trunc(n/2)

    return array.map((v, i) => {
        if (i < halfN) {
            return {
                old: i,
                new: i * 2
            }
        }
        return {
            old: i,
            new: (i - halfN) * 2 + 1
        }
    })
}

function getRandomInt(max: number) {
    return Math.trunc(Math.random() * max);
}
