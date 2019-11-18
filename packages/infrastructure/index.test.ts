import { identifier, availabilityZone, username, password } from './index';
const pulumi = require('@pulumi/pulumi');
const infra = require('./index');

describe('Database Infrastructure', () => {

    expect(true).toBe(true);

    test("#identifier", () => {
    // TODO(check 1): Instances have a Name tag.
    // TODO(check 2): Instances must not use an inline userData script.

    // # DB Identifier
    //
        expect(true).toBe(true);
        expect(infra.identifier).not.toBeUndefined();
    });

    test("#availability-zone", () => {
        expect(infra.availabilityZone).not.toBeUndefined();
    });

    test("#url", () => {
        expect(infra.url).not.toBeUndefined();
    });

    test("#username", () => {
        expect(infra.username).not.toBeUndefined();
    });

    test("#password", () => {
        expect(infra.password).not.toBeUndefined();
    });
});