import { rds } from '@pulumi/aws';
import { Config, secret } from '@pulumi/pulumi';
import { RandomPassword } from '@pulumi/random';

const randomPassword = new RandomPassword('password', {
    length: 16,
    overrideSpecial: '_%@',
    special: true,
});

const database = new rds.Instance('meal-planner-database', {
    allocatedStorage: 20,
    autoMinorVersionUpgrade: true,
    engine: 'postgres',
    engineVersion: '11.5',
    identifier: 'mealplanner-db',
    instanceClass: rds.InstanceTypes.T2_Micro,
    maxAllocatedStorage: 50,
    multiAz: false,
    name: 'mealplannerdb',
    optionGroupName: 'default:postgres-11',
    parameterGroupName: 'default.postgres11',
    password: randomPassword.result,
    publiclyAccessible: true,
    storageType: 'gp2', // GP2 = General Purpose SSD
    username: 'mealplanner_service_admin',
    tags: {
        env: 'dev',
        name: 'meal-planner',
    },
});

export const identifier = database.id;
export const availabilityZone = database.availabilityZone;
export const url = database.endpoint;
export const username = database.username;
export const password = secret(database.password);