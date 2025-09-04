import type { RedisClientOptions } from "redis";
export type RedisSessionsOptions = {
    port?: number;
    host?: string;
    options?: RedisClientOptions & {
        urls?: string[];
    };
    namespace?: string;
    wipe?: number;
    cachetime?: number;
    cachemax?: number;
};
type OptionalPropertyOf<T extends object> = Exclude<{
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
}[keyof T], undefined>;
type SetData<T extends Record<string, string | boolean | number>> = {
    [k in keyof T]?: k extends OptionalPropertyOf<T> ? T[k] | null : T[k];
};
export type Session<T extends Record<string, string | boolean | number> = Record<string, string | boolean | number>> = {
    id: string;
    r: number;
    w: number;
    ttl: number;
    idle: number;
    ip: string;
    d?: T;
    no_resave?: boolean;
};
/** RedisSessions

 To create a new instance use:

    RedisSessions = require("redis-sessions")
    rs = new RedisSessions()

    Parameters:

    `port`: *optional* Default: `6379`. The Redis port.
    `host`, *optional* Default: `127.0.0.1`. The Redis host.
    `options`, *optional* Default: `{}`. Additional options. See [https://github.com/mranney/node_redis#rediscreateclientport-host-options](redis.createClient))
    `namespace`: *optional* Default: `rs`. The namespace prefix for all Redis keys used by this module.
    `wipe`: *optional* Default: `600`. The interval in second after which the timed out sessions are wiped. No value less than 10 allowed.
    `cachetime` (Number) *optional* Default: `0`. Number of seconds to cache sessions in memory.
    `cachemax` (Number) *optional* Default: `5000`. Maximum number of sessions stored in the cache.
*/
/**
 *
 *
 * @class RedisSessions
 *
 * @template SessionData
 *
 * @param port
 */
declare class RedisSessions<SessionData extends Record<string, string | boolean | number>> {
    private redisns;
    private isCache;
    private redis;
    private sessionCache;
    private wiperInterval;
    private redissub;
    private subscribed;
    private toSubscribe;
    private connected;
    private toConnect;
    constructor(redisSessionsOptions?: RedisSessionsOptions);
    activity(options: {
        app: string;
        deltaTime: number;
    }): Promise<{
        activity: any;
    }>;
    create(options: {
        app: string;
        id: string;
        ip: string;
        ttl?: number;
        d?: SessionData;
        no_resave?: boolean;
    }): Promise<{
        token: string;
    }>;
    get(options: {
        app: string;
        token: string;
        _noupdate?: boolean;
        _nocache?: boolean;
    }): Promise<Session<SessionData> | null>;
    kill(options: {
        app: string;
        token: string;
    }): Promise<{
        kill: any;
    }>;
    private _kill;
    killall(options: {
        app: string;
    }): Promise<{
        kill: any;
    }>;
    killsoid(options: {
        app: string;
        id: string;
    }): Promise<{
        kill: number;
    }>;
    ping(): Promise<any>;
    quit(): Promise<void>;
    set(options: {
        app: string;
        token: string;
        d: SetData<SessionData>;
        no_resave?: boolean;
    }): Promise<Session<SessionData> | null>;
    soapp(options: {
        app: string;
        deltaTime: number;
    }): Promise<{
        sessions: Session<SessionData>[];
    }>;
    soid(options: {
        app: string;
        id: string;
    }): Promise<{
        sessions: Session<SessionData>[];
    }>;
    private connect;
    private _createMultiStatement;
    private _createToken;
    private _handleError;
    private _now;
    private _prepareSession;
    private _returnSessions;
    private subscribe;
    private VALID;
    private _validate;
    private _wipe;
}
export default RedisSessions;
