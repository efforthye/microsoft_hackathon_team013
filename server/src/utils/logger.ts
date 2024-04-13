import process from 'process';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { format } from 'logform';
import moment from 'moment-timezone';

const { createLogger, transports, config } = winston;
const { combine, timestamp, printf, colorize } = format;

const logDir = `${process.cwd()}/logs`;

const logFormat = printf(({ level, message, timestamp, ...meta }) => {
    let metaString = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 4)}` : '';
    return `${timestamp} [${level}] ${message}${metaString}`;
});

const logger = createLogger({
    level: 'silly',
    format: combine(
        timestamp({ format: () => moment().tz("Asia/Seoul").format('YYYY-MM-DD HH:mm:ss') }),
        logFormat,
    ),
    transports: [
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: 180,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: `${logDir}/error`,
            filename: `%DATE%.error.log`,
            maxFiles: 180,
            zippedArchive: true,
        }),
    ],
    exceptionHandlers: [
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

if (process.env.NODE_ENV !== 'prod') {
    logger.add(
        new winston.transports.Console({
            format: combine(
                timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                printf(info => {
                    const { timestamp, level, message, ...meta } = info;
                    const metaString = Object.keys(meta).length ? `\n ${JSON.stringify(meta)}` : '';
                    return `${timestamp} [${level}] ${message}${metaString}`;
                }),
            ),
        }),
    );
}

const saveLog = (savedData: Array<any>, saveData: Array<any>) => {
    logger.info(`${savedData.length} out of ${saveData.length} data has been saved.`);
};
const platformLog = (platform: string) => {
    logger.silly(`I've reached the ${platform} request location.`);
};
const requestLog = ({ url, params }: { url: string, params: object | undefined }) => {
    logger.http(`Request made to URL: ${url} with params`, { params });
};
const responseLog = ({ platform, marketPriceArr }: { platform: string, marketPriceArr: any[] }) => {
    logger.http(`Response from ${platform}:`, { marketPriceArr });
};
const getRouterLog = ({ routerName, query }: { routerName: string, query: any }) =>{
    logger.info(`${routerName} get request start`, {query});
}
const catchErrorLog = ({text, error}: {text: string, error: any}) =>{
    logger.error(`${text} catch error:`, {error});
}

export {
    logger,
    saveLog,
    platformLog,
    requestLog,
    responseLog,
    getRouterLog,
    catchErrorLog,
};