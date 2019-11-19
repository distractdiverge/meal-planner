import { ec2, rds } from '@pulumi/aws';
import { secret } from '@pulumi/pulumi';
import { RandomPassword } from '@pulumi/random';

const baseTags = {
  application: 'meal-planner',
  env: 'dev',
};

const randomPassword = new RandomPassword('password', {
  length: 16,
  overrideSpecial: '_%@',
  special: true,
});

const securityGroup = new ec2.SecurityGroup('public-postgres', {
  ingress: [
    { protocol: 'TCP', fromPort: 5432, toPort: 5432, cidrBlocks: ['0.0.0.0/0'] },
  ],
  tags: Object.assign({}, {}, baseTags),
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
  skipFinalSnapshot: true,
  storageType: 'gp2', // GP2 = General Purpose SSD
  tags: Object.assign({}, {}, baseTags),
  username: 'mealplanner_service_admin',
  vpcSecurityGroupIds: [securityGroup.id],
});

export const identifier = database.id;
export const availabilityZone = database.availabilityZone;
export const url = database.endpoint;
export const username = database.username;
export const password = secret(database.password);
