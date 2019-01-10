import { KeyMap } from "./models/KeyMap";
import { Utils } from "./utils/Utils";
import { KeyMapPaths } from "./models/KeyMapPaths";
import { KeyMapToPathMapper } from "./mapper/KeyMapToPathMapper";
import _ from "lodash";

export class RemapKey {

    private static ARRAY_NOTATION = "ARRAY";

    public static mapAllKeys(sourceObj: any, keyMaps: KeyMap[]){
        let keyMapPaths: KeyMapPaths[] = []; 
        keyMaps.forEach(keyMap => {
            keyMapPaths.push(KeyMapToPathMapper.transform(keyMap));
        })
        if(!this._isValidKeyMapPaths(keyMapPaths)){
            throw new Error("Object path cannot be blank");
        }
        keyMaps.forEach(keyMap => {
            this.mapSingleKey(sourceObj, keyMap.fromKey, keyMap.toKey);
        })
    }

    public static mapSingleKey(sourceObj: any, fromKey: string, toKey: string){
        let fromKeyPaths = fromKey.split(".");
        let toKeyPaths = toKey.split(".");
        if(Utils.isNullOrBlankAny(fromKeyPaths) || Utils.isNullOrBlankAny(toKeyPaths)){
            throw new Error("Path cannot be blank");
        }

        let currentObj: any = sourceObj;
        let minPathLen = fromKeyPaths.length < toKeyPaths.length ? fromKeyPaths.length : toKeyPaths.length
        for (let i = 0; i < minPathLen; i++) {
            if(fromKeyPaths[i] === this.ARRAY_NOTATION && toKeyPaths[i] === this.ARRAY_NOTATION){
                if(!Array.isArray(currentObj)){
                    throw new Error("Source object doesn't contain array on the given path");
                }
                for (let j = 0; j < currentObj.length; j++) {
                    this.mapSingleKey(currentObj[j], fromKeyPaths.slice(i + 1).join("."), toKeyPaths.slice(i + 1).join("."));
                }
                break;
            }
            else if(fromKeyPaths[i] === this.ARRAY_NOTATION || toKeyPaths[i] === this.ARRAY_NOTATION){
                throw new Error("Only source or target contains ARRAY notation");
            }
            else if(!Utils.isNullOrBlank(fromKeyPaths[i]) && !Utils.isNullOrBlank(toKeyPaths[i])){
                if(!Utils.isNullOrBlank(fromKeyPaths[i + 1]) && !Utils.isNullOrBlank(toKeyPaths[i + 1])){
                    this._mapSinglePath(currentObj, fromKeyPaths[i], toKeyPaths[i]);
                    currentObj = _.get(currentObj, toKeyPaths[i]);
                }
                else{
                    this._mapSinglePathArray(currentObj, fromKeyPaths.slice(i), toKeyPaths.slice(i));
                }
            }
        }
    }

    private static _mapSinglePathArray(sourceObj: any, fromKeyPaths: string[], toKeyPaths: string[]){
        let fromKeyVal = _.get(sourceObj, fromKeyPaths, null);
        if(fromKeyVal){
            _.set(sourceObj, toKeyPaths, fromKeyVal);
            if(fromKeyPaths.length === toKeyPaths.length){
                _.unset(sourceObj, fromKeyPaths);
            }
            else{
                for (let i = fromKeyPaths.length - 1; i >= 0; i--) {
                    _.unset(sourceObj, fromKeyPaths.slice(0, i + 1));
                }
            }
        }
        else throw new Error("Source path " + fromKeyPaths.join(".") + " not found");
    }

    private static _mapSinglePath(sourceObj: any, fromSimpleKey: string, toSimpleKey: string){
        let fromKeyVal = _.get(sourceObj, fromSimpleKey, null);
        if(fromKeyVal){
            _.set(sourceObj, toSimpleKey, fromKeyVal);
            _.unset(sourceObj, fromSimpleKey);
        }
        else throw new Error("Source path " + fromSimpleKey + " not found");
    }

    private static _isValidKeyMapPaths(keyMapPaths: KeyMapPaths[]){
        for (let i = 0; i < keyMapPaths.length; i++) {
            if(Utils.isNullOrBlankAny(keyMapPaths[i].fromKeyPath)){
                return false;
            }
            if(Utils.isNullOrBlankAny(keyMapPaths[i].toKeyPath)){
                return false;
            }
        }
        return true;
    }
}