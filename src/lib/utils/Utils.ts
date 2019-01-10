export class Utils {
    public static isNullOrBlank(key: string){
        return !key || key.trim() === "";
    }

    public static isNullOrBlankAny(keys: string[]){
        for(let i = 0; i < keys.length; i++){
            if(this.isNullOrBlank(keys[i])){
                return true;
            }
        }
        return false;
    }
}