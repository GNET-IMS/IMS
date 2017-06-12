import pathToRegexp from 'path-to-regexp';

export default class MatchPach {
    constructor(path) {
        this.isMatched = false;
        this.path = path;
        this.next = true;
    }
    match(rule, callback) {
        if (this.isMatched) this.next = false;
        if (this.next) {
            const path = this.path;
            if (pathToRegexp(rule).test(path)) {
                this.isMatched = true;
                const match = pathToRegexp(rule).exec(path);
                callback(match);
            }
        }
        return this;
    }
    unmatched(callback) {
        if (!this.isMatched) callback();
    }
}