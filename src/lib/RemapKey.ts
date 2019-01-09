import { KeyMap } from "./models/KeyMap";
import { Utils } from "./utils/Utils";
import { KeyMapPaths } from "./models/KeyMapPaths";
import { KeyMapToPathMapper } from "./mapper/KeyMapToPathMapper";
import _ from "lodash";

export class RemapKey {

    private static isArrayKeyRegex = /^[^\[]+\]$/;

    public static mapAllKeys(sourceObj: any, keyMaps: KeyMap[]){
        let keyMapPaths: KeyMapPaths[] = []; 
        keyMaps.forEach(keyMap => {
            keyMapPaths.push(KeyMapToPathMapper.transform(keyMap));
        })
        if(!this._isValidKeyMapPaths(keyMapPaths)){
            throw new Error("Object path cannot be blank");
        }
    }

    public static mapSinglePath(sourceObj: any, fromKey: string, toKey: string){
        let fromKeyPaths = fromKey.split(".");
        let toKeyPaths = toKey.split(".");
        if(Utils.isNullOrBlankAny(fromKeyPaths) || Utils.isNullOrBlankAny(toKeyPaths)){
            throw new Error("Path cannot be blank");
        }

        
        let isSourceContainArrayPath = false;
        let isDestinationContainArrayPath = false;
        fromKeyPaths.forEach(path => {
            if(this.isArrayKeyRegex.test(path)){

            }
        });
    }

    private static _mapSinglePathArray(sourceObj: any, fromKeyPaths: string[], toKeyPaths: string[]){
        let fromKeyVal = _.get(sourceObj, fromKeyPaths, null);
        if(fromKeyVal){
            _.set(sourceObj, toKeyPaths, fromKeyVal);
            _.unset(sourceObj, fromKeyPaths);
        }
        throw new Error("Source path " + fromKeyPaths.join(".") + " not found");
    }

    private static _mapSinglePath(sourceObj: any, fromSimpleKey: string, toSimpleKey: string){
        let fromKeyVal = _.get(sourceObj, fromSimpleKey, null);
        if(fromKeyVal){
            _.set(sourceObj, toSimpleKey, fromKeyVal);
            _.unset(sourceObj, fromSimpleKey);
        }
        throw new Error("Source path " + fromSimpleKey + " not found");
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