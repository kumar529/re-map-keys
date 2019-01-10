import 'mocha';
import { expect } from 'chai';
import { Utils } from '../../../src/lib/utils/Utils';

describe("null or blank string test cases", () => {
    it("is null or blank string", () => {
        let input: string = "";
        expect(Utils.isNullOrBlank(input)).to.equal(true);
    })

    it("is not null or blank string", () => {
        let input: string = "test";
        expect(Utils.isNullOrBlank(input)).to.equal(false);
    })

    it("is null or blank string array", () => {
        let input: string[] = ["", ""];
        expect(Utils.isNullOrBlankAny(input)).to.equal(true);
    })

    it("is not null or blank string array", () => {
        let input: string[] = ["test1", "test2"];
        expect(Utils.isNullOrBlankAny(input)).to.equal(false);
    })
});