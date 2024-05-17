import chalk from 'chalk';
import moment from 'moment';

export const coloredStatus = (req, res) => {
    const status = res.statusCode;
    const method = req.method;
    const url = req.originalUrl;
    const date = moment().format('DD-MM-YYYY');
    const time = moment().format('HH:mm:ss');

    let methodColor;
    switch (method) {
        case 'GET':
            methodColor = chalk.green(method);
            break;
        case 'POST':
            methodColor = chalk.yellow(method);
            break;
        case 'PUT':
            methodColor = chalk.blue(method);
            break;
        case 'PATCH':
            methodColor = chalk.magenta(method);
            break;
        case 'DELETE':
            methodColor = chalk.red(method);
            break;
        default:
            methodColor = method;
    }

    const statusColor = status >= 500 ? chalk.bgRed.white(status) : status >= 400 ? chalk.bgYellow.black(status) : chalk.bgGreen.black(status);

    return `Date: ${date}, Time: ${time}, Method: ${methodColor}, URL: ${url}, Status: ${statusColor}, ResponseTime:`;
};
