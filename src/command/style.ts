/**
 * Terminal style output colorizen
 * Inspiring picocolors(https://www.npmjs.com/package/picocolors)
 */

import process from 'node:process'
import tty from 'node:tty'

/**
 * @description: check current is support color command text
 * @param colorSupoort can force color not output. [default] true
 */
export function isColorizenSupport(colorSupoort = true) {
    return (
        colorSupoort
        && !('NO_COLOR' in process.env)
        && (
            process.platform === 'win32'
            || (tty.isatty(1) && process.env.TERM !== 'dumb')
            || 'CI' in process.env
        )
    )
    || (!process.env.VITEST && 'FORCE_COLOR' in process.env)
}

export function replaceClose(string: string, close: string, replace: any, index: number): string {
    const start = string.substring(0, index) + replace
    const end = string.substring(index + close.length)
    const nextIndex = end.indexOf(close)
    return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end
}

function formatter(open: string, close: string, replace = open) {
    return (input: string) => {
        const string = `${input}`
        const index = string.indexOf(close, open.length)
        return ~index
            ? open + replaceClose(string, close, replace, index) + close
            : open + string + close
    }
}

function styleFn(enabled = isColorizenSupport()) {
    const init = enabled ? formatter : () => String
    return {
        isColorSupported: enabled,
        reset: init('\x1B[0m', '\x1B[0m'),
        bold: init('\x1B[1m', '\x1B[22m', '\x1B[22m\x1B[1m'),
        dim: init('\x1B[2m', '\x1B[22m', '\x1B[22m\x1B[2m'),
        italic: init('\x1B[3m', '\x1B[23m'),
        underline: init('\x1B[4m', '\x1B[24m'),
        inverse: init('\x1B[7m', '\x1B[27m'),
        hidden: init('\x1B[8m', '\x1B[28m'),
        strikethrough: init('\x1B[9m', '\x1B[29m'),

        black: init('\x1B[30m', '\x1B[39m'),
        red: init('\x1B[31m', '\x1B[39m'),
        green: init('\x1B[32m', '\x1B[39m'),
        yellow: init('\x1B[33m', '\x1B[39m'),
        blue: init('\x1B[34m', '\x1B[39m'),
        magenta: init('\x1B[35m', '\x1B[39m'),
        cyan: init('\x1B[36m', '\x1B[39m'),
        white: init('\x1B[37m', '\x1B[39m'),
        gray: init('\x1B[90m', '\x1B[39m'),

        bgBlack: init('\x1B[40m', '\x1B[49m'),
        bgRed: init('\x1B[41m', '\x1B[49m'),
        bgGreen: init('\x1B[42m', '\x1B[49m'),
        bgYellow: init('\x1B[43m', '\x1B[49m'),
        bgBlue: init('\x1B[44m', '\x1B[49m'),
        bgMagenta: init('\x1B[45m', '\x1B[49m'),
        bgCyan: init('\x1B[46m', '\x1B[49m'),
        bgWhite: init('\x1B[47m', '\x1B[49m'),

        rgb: (rgbColor = '38;5;036') => init(`\u001B[${rgbColor}m`, '\x1B[0m'),
    }
}

/**
 * Support control isColorizen as param's style generator
 * @param {boolen} enabled
 * @return {Function} style
 */
export const createStyle = styleFn

/**
 * commandline style output colorizen
 *
 * Automatically determine whether output coloring is required
 * @tip the rgb color see to check your number: https://github.com/sindresorhus/xterm-colors
 */
export const style = styleFn()
