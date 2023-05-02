/* eslint-disable prefer-named-capture-group -- disabled */
/* eslint-disable max-len -- disabled */

export const RegexConstants = {
    CONTAINS_DIGIT: /[\d]+/mu,
    CONTAINS_LOWERCASE: /[a-z]+/mu,
    CONTAINS_SYMBOL: /[\W_]+/mu,
    CONTAINS_UPPERCASE: /[A-Z]+/mu,
    EMAIL: /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/mu,
    NO_DIGITS_SYMBOLS_SPACES: /^[\w]+-{0,}[\w]{0,}$/u,
    NO_SPACES: /[\s]+/mu,
    NO_SYMBOLS: /^[\w]+$/mu,
};
