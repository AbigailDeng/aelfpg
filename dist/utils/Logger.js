var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import chalk from "chalk";
// - Trace: The unimportant detail about how the process run. You may hardly use it.
// - Debug: A debug message for processing information to help during troubleshooting.
// - Info: Generally useful information to log (service start/stop, configuration assumptions, etc).
// - Warn: Anything that can potentially cause application oddities.
// - Error: Error has happend, but the user can still use the system after fixing the error.
// - Fatal: The system is unusable.
var levels = [
    {
        level: "Trace",
        color: chalk.gray,
    },
    {
        level: "Debug",
        color: chalk.hex("#D3D3D3"),
    },
    {
        level: "Info",
        color: chalk.hex("#3753d3"),
    },
    {
        level: "Warn",
        color: chalk.yellow,
    },
    {
        level: "Error",
        color: chalk.hex("#cf342f"),
    },
    {
        level: "Fatal",
        color: chalk.hex("#cf0014"),
    },
];
var Logger = /** @class */ (function () {
    /**
     * Constructs a new Logger instance.
     * @param {LoggerProps} props - Logger properties.
     */
    function Logger(props) {
        this.symbol = "";
        this.name = "";
        this.log = props.log !== undefined ? props.log : true; // determin whether console.log or not
        if (!props.onlyWords) {
            this.symbol = "";
            this.name = props.name;
        }
    }
    return Logger;
}());
// The Logger's prototype's method 'info' 'warn' etc. are compatible with console.log
// So you can use it as console.log
levels.forEach(function (item) {
    var level = item.level, color = item.color;
    var fnName = level.toLocaleLowerCase();
    /**
     * Logs a message with a specific log level.
     * @function
     * @memberof Logger.prototype
     * @param {string | object} firstParam - The first parameter to log.
     * @param {...any} rest - Additional parameters to log.
     * @returns {string} - The formatted log message.
     */
    Logger.prototype[fnName] = function fn(firstParam) {
        // if (typeof params === 'obejct') params = JSON.stringify(params);
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var prefix = "".concat(this.symbol ? this.symbol + " " : "").concat(this.name ? this.name + " " : "", "[").concat(level, "]: ");
        if (typeof firstParam === "object" && firstParam !== null) {
            prefix += "\n";
            if (this.log) {
                console.log.apply(console, __spreadArray([color(prefix), firstParam], rest, false));
            }
            return chalk.apply(void 0, __spreadArray([color(prefix), firstParam], rest, false));
        }
        // To compatible with the situation below, We need to surround the rest with method color
        // logger.error('Your Node.js version is needed to >= %s', '10.1');
        if (this.log) {
            console.log(color(prefix + firstParam), color.apply(void 0, rest));
        }
        return chalk(color(prefix + firstParam), color.apply(void 0, rest));
    };
});
export default Logger;
