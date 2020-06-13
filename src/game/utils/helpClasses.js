class Box {
    constructor(value, isMerge=false, isNew=false) {
        this.value = value;
        this.merge = isMerge;
        this.new = isNew;
    } 
    resetSpeacialValues(){
        this.merge=false;
        this.new=false;
    }
}
class Range{
    constructor(min,max) {
        this.min =min;
        this.max = max;
    }
    set(min,max){
        this.min =min;
        this.max = max;
    } 
}
class Pose {
    constructor(x, y) {
        this.x = (x);
        this.y = (y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
export {Box,Pose,Range};