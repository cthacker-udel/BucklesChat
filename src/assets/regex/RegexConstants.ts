export const RegexConstants = {
    CONTAINS_DIGIT: /[\d]+/gmu,
    CONTAINS_LOWERCASE: /[a-z]+/gmu,
    CONTAINS_SYMBOL: /[\W_]+/gmu,
    CONTAINS_UPPERCASE: /[A-Z]+/gmu,
    NO_DIGITS_SYMBOLS_SPACES: /^[\w]+-{0,}[\w]{0,}$/gu,
    NO_SPACES: /[\s]+/gmu,
    NO_SYMBOLS: /^[\w]/gmu,
};
