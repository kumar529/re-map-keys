import { KeyMap } from "../models/KeyMap";
import { KeyMapPaths } from "../models/KeyMapPaths";

export class KeyMapToPathMapper {
    public static transform(keyMap: KeyMap) {
        let keyMapPath: KeyMapPaths = {
            fromKeyPath: keyMap.fromKey.split("."),
            toKeyPath: keyMap.toKey.split("."),
        };
        return keyMapPath;
    }
}
