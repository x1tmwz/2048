import React, { useState, useEffect } from 'react';


const Cell = ({ number, id,isNew,isMerge }) => {
    const [scale, setScale] = useState(1);
    const scaleFix = () => {
        const view = document.getElementsByClassName(id)[0];
        const text = view.lastChild;
        const viewSize = view.getBoundingClientRect()
        const textSize = text.getBoundingClientRect()
        if ((textSize.width / scale) >= viewSize.width) {
            return setScale(viewSize.width / (textSize.width / scale))
        }
        setScale(1);
    }
    const color = (num) => {
        const color2 = "#EEE4DA";
        const color8 = "#F2B179";
        const color16 = "#F59563";
        const color64 = "#F65E3B";
        const color32 = "#F67C5F";
        const color128 = "#EDCF72";
        const color256 = "#EDCC61";
        const color512 = "#D7C18A";
        const color1024 = "#00cc66";
        const color2084 = "#009933";
        switch (num) {
            case 2:
                return color2;
            case 4:
                return color2;
            case 8:
                return color8;
            case 16:
                return color16;
            case 32:
                return color32;
            case 64:
                return color64;
            case 128:
                return color128;
            case 256:
                return color256;
            case 512:
                return color512;
            case 1024:
                return color1024;
            case 2048:
                return color2084;
            default:
                return "none"

        }
    }
    useEffect(scaleFix, [number])
    const setAnimationName = () => {
        if(isMerge){
            return "pop"
        }
        if(isNew){
            return "new"
        }
        return ""

    }

    return (
        <div className="itemBox">
            <div
                className={id}
                id="gridItem"
                style={{
                    background: color(number),
                    position: "relative",
                    animation:`${setAnimationName()} 200ms ease 100ms`

                }} >
                <span style={{ transform: `scale(${scale})` }}>{number !== 0 ? number : ""}</span>
            </div>

        </div>

    );
}
export default Cell;