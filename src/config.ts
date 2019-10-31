import convict from 'convict';
import { partial } from 'ramda';

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

const config = convict({
    env: {
        default: Environment.Development,
        doc: 'Node Environment',
        env: 'NODE_ENV',
        format: [ Environment.Development, Environment.Production, Environment.Test ],
    }
});

const getEnv = partial(config.get, [ 'env' ]);

export {
    Environment,
    getEnv,
};
