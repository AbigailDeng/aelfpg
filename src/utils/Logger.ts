import chalk from "chalk";

// - Trace: The unimportant detail about how the process run. You may hardly use it.
// - Debug: A debug message for processing information to help during troubleshooting.
// - Info: Generally useful information to log (service start/stop, configuration assumptions, etc).
// - Warn: Anything that can potentially cause application oddities.
// - Error: Error has happend, but the user can still use the system after fixing the error.
// - Fatal: The system is unusable.
const levels = [
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

interface LoggerProps {
  log?: boolean;
  name?: string;
  onlyWords?: boolean;
}

class Logger {
  /**
   * Symbol for the logger.
   * @type {string}
   */
  symbol: string;
  /**
   * Name of the logger.
   * @type {string | undefined}
   */
  name: string | undefined;
  /**
   * Determines whether to log messages.
   * @type {boolean}
   */
  log: boolean;
  /**
   * Constructs a new Logger instance.
   * @param {LoggerProps} props - Logger properties.
   */
  constructor(props: LoggerProps) {
    this.symbol = "";
    this.name = "";
    this.log = props.log !== undefined ? props.log : true; // determin whether console.log or not
    if (!props.onlyWords) {
      this.symbol = "";
      this.name = props.name;
    }
  }
  // add an index signature
  [key: string]: any;
}

// The Logger's prototype's method 'info' 'warn' etc. are compatible with console.log
// So you can use it as console.log
levels.forEach(item => {
  const { level, color } = item;
  const fnName = level.toLocaleLowerCase();

  /**
   * Logs a message with a specific log level.
   * @function
   * @memberof Logger.prototype
   * @param {string | object} firstParam - The first parameter to log.
   * @param {...any} rest - Additional parameters to log.
   * @returns {string} - The formatted log message.
   */
  Logger.prototype[fnName] = function fn(
    firstParam: string | object,
    ...rest: any[]
  ): string {
    // if (typeof params === 'obejct') params = JSON.stringify(params);

    let prefix = `${this.symbol ? this.symbol + " " : ""}${
      this.name ? this.name + " " : ""
    }[${level}]: `;
    if (typeof firstParam === "object" && firstParam !== null) {
      prefix += "\n";
      if (this.log) {
        console.log(color(prefix), firstParam, ...rest);
      }
      return chalk(color(prefix), firstParam, ...rest);
    }
    // To compatible with the situation below, We need to surround the rest with method color
    // logger.error('Your Node.js version is needed to >= %s', '10.1');
    if (this.log) {
      console.log(color(prefix + firstParam), color(...rest));
    }
    return chalk(color(prefix + firstParam), color(...rest));
  };
});

export default Logger;
