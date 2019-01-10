import 'mocha';
import { expect } from 'chai';
import { RemapKey } from "../../src/lib/RemapKey";
import { KeyMap } from '../../src/lib/models/KeyMap';

describe("Remap key test cases", () => {
    it("map single with simple path test", () => {
        let sourceObj: any = { a : { b : { c : 1 } } };
        let destObj: any = { x : { y : { z : 1 } } };
        let fromKey: string = "a.b.c";
        let toKey: string = "x.y.z";
        RemapKey.mapSingleKey(sourceObj, fromKey, toKey)
        expect(sourceObj).to.deep.equal(destObj);
    })

    it("map single with array path test", () => {
        let sourceObj: any = { a : [{ b : { c : 1 } }] };
        let destObj: any = { x : [{ y : { z : 1 } }] };
        let fromKey: string = "a.ARRAY.b.c";
        let toKey: string = "x.ARRAY.y.z";
        RemapKey.mapSingleKey(sourceObj, fromKey, toKey)
        expect(sourceObj).to.deep.equal(destObj);
    })

    it("map single with array less path test", () => {
        let sourceObj: any = { a : [{ b : { c : 1 } }] };
        let destObj: any = { x : [{ y : 1 }] };
        let fromKey: string = "a.ARRAY.b.c";
        let toKey: string = "x.ARRAY.y";
        RemapKey.mapSingleKey(sourceObj, fromKey, toKey)
        expect(sourceObj).to.deep.equal(destObj);
    })

    it("map single with array more path test", () => {
        let sourceObj: any = { a : [{ b : { c : 1 } }] };
        let destObj: any = { x : [{ y : { z: {c : 1} } }] };
        let fromKey: string = "a.ARRAY.b.c";
        let toKey: string = "x.ARRAY.y.z.c";
        RemapKey.mapSingleKey(sourceObj, fromKey, toKey)
        expect(sourceObj).to.deep.equal(destObj);
    })

    it("map multi with simple path test", () => {
        let sourceObj: any = { a : { b : { c : 1 } }, d : { e : 2} };
        let destObj: any = { x : { y : { z : 1 } }, m : {n : 2} };
        let keyMaps: KeyMap[] = [
            {
                fromKey: "a.b.c",
                toKey: "x.y.z"
            },
            {
                fromKey: "d.e",
                toKey: "m.n"
            }
        ]
        RemapKey.mapAllKeys(sourceObj, keyMaps);
        expect(sourceObj).to.deep.equal(destObj);
    })
})