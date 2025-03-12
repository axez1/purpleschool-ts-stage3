import makeOrdinal from './makeOrdinal';
import { isFinite, isSafeNumber } from './utils';

enum ConstNumberName {
  TEN = 10,
  ONE_HUNDRED = 100,
  ONE_THOUSAND = 1000,
  ONE_MILLION = 1000000,
  ONE_BILLION = 1000000000, //         1.000.000.000 (9)
  ONE_TRILLION = 1000000000000, //     1.000.000.000.000 (12)
  ONE_QUADRILLION = 1000000000000000, // 1.000.000.000.000.000 (15)
  MAX = 9007199254740992, // 9.007.199.254.740.992 (15)
}

const LESS_THAN_TWENTY: string[] = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];

const TENTHS_LESS_THAN_HUNDRED: string[] = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

function toWords(number: number | string, asOrdinal: boolean): string[] {
    let num = parseInt(number.toString(), 10);

    if (!isFinite(num)) {
        throw new TypeError(
            `Not a finite number: ${number} (${typeof number})`
        );
    }
    if (!isSafeNumber(num)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }
    const words = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
}

function generateWords(number: number, words: string[] = []): string[] {
    
    // We’re done
    if (number === 0) {
        return words.length ? words : ['zero'];
    }
    
    // If negative, prepend “minus”
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }

    if (number < 20) {
        words.push(LESS_THAN_TWENTY[number]);
    } else if (number < ConstNumberName.ONE_HUNDRED) {
        const tens = Math.floor(number / ConstNumberName.TEN);
        const remainder = number % ConstNumberName.TEN;
        words.push(TENTHS_LESS_THAN_HUNDRED[tens]);
        if (remainder) {
            words.push(LESS_THAN_TWENTY[remainder]);
        }

    } else {
        const scales: [number, string][] = [
            [ConstNumberName.ONE_QUADRILLION, 'quadrillion'],
            [ConstNumberName.ONE_TRILLION, 'trillion'],
            [ConstNumberName.ONE_BILLION, 'billion'],
            [ConstNumberName.ONE_MILLION, 'million'],
            [ConstNumberName.ONE_THOUSAND, 'thousand'],
            [ConstNumberName.ONE_HUNDRED, 'hundred'],
        ];

    for (const [value, name] of scales) {
            if (number >= value) {
                const scaleNumber = Math.floor(number / value);
                number %= value;
                words.push(...generateWords(scaleNumber));
                words.push(name);
            }
        }

        if (number) {
            words.push(...generateWords(number));
        }
    }

    return words;
}

export default toWords;