import convict from 'convict';
import { partial } from 'ramda';

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

const config = convict({
    env: {
        desc: 'Node Environment',
        format: [ Environment.Development, Environment.Production, Environment.Test ],
        default: Environment.Development,
        env: 'NODE_ENV',
    }
});

const getEnv = partial(config.get, [ 'env' ]);

export {
    Environment,
    getEnv,
};

