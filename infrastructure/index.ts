import { kms, rds } from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const database = new rds.Cluster('postgresql', {
    backupRetentionPeriod: 5,
    clusterIdentifier: 'meal-planner-db-cluster',
    databaseName: 'mealplanner',
    engine: 'aurora-postgresql',
    engineMode: 'serverless',
    engineVersion: '10.7',
    masterPassword: 'bar123456', // TODO: Tie into Pulumi's "Random" & Secrets Management
    masterUsername: 'foo',
    preferredBackupWindow: '02:00-03:00',
    scalingConfiguration: {
        maxCapacity: 8,
        minCapacity: 2,
    },
    storageEncrypted: true,
    tags: {
        env: 'dev',
        name: 'meal-planner',
    },
});

export const databaseId = database.id
export const databaseUrl = database.endpoint
