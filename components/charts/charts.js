import React, {Component} from 'react';

export default class Chart extends Component{
    rgbColor(color, op){
        op = op || {type: "rgba", a: 1}; //type = rgba
        op.a = op.a === undefined ? 1 : op.a;
        var va = "";
        switch(color.toUpperCase()){
            case "WHITE": va = op.type == "r16" ? "#FFFFFF" : "255 255, 255"; break;
            case "BLACK": va = op.type == "r16" ? "#000000" : "0, 0, 0"; break;
            case "GREY": va = op.type == "r16" ? "#BEBEBE" :  "190, 190, 190"; break;
            case "BLUE": va = op.type == "r16" ? "#0000FF" :  "0, 0, 255"; break;
            case "CYAN": va = op.type == "r16" ? "#00FFFF" :  "0, 255, 255"; break;
            case "GREEN": va = op.type == "r16" ? "#00FF00" :  "0, 255, 0"; break;
            case "SEAGREEN": va = op.type == "r16" ? "#2E8B57" :  "46, 139, 87"; break;
            case "YELLOW": va = op.type == "r16" ? "#FFFF00" :  "255, 255, 0"; break;
            case "GOLD": va = op.type == "r16" ? "#FFD700" :  "255, 215, 0"; break;
            case "CHOCOLATE": va = op.type == "r16" ? "#D2691E" :  "210, 105, 30"; break;
            case "BROWN": va = op.type == "r16" ? "#A52A2A" :  "165, 42, 42"; break;
            case "SALMON": va = op.type == "r16" ? "#FA8072" :  "250, 128, 114"; break;
            case "ORANGE": va = op.type == "r16" ? "#FFA500" :  "255, 165, 0"; break;
            case "ORANGERED": va = op.type == "r16" ? "#FF4500" :  "255, 65, 0"; break;
            case "RED": va = op.type == "r16" ? "#FF0000" :  "255, 0, 0"; break;
            case "HOTPINK": va = op.type == "r16" ? "#FF69B4" :  "255, 105, 180"; break;
            case "DEEPPINK": va = op.type == "r16" ? "#FF1493" :  "255, 20, 147"; break;
            case "PINK": va = op.type == "r16" ? "#FFC0CB" :  "255, 192, 203"; break;
            case "MAROON": va = op.type == "r16" ? "#B03060" :  "176, 48, 96"; break;
            case "MAGENTA": va = op.type == "r16" ? "##FF00FF" :  "255, 0, 255"; break;
            case "PURPLE": va = op.type == "r16" ? "#A020F0" :  "160, 32, 240"; break;
            case "DARKGREY": va = op.type == "r16" ? " #A9A9A9 " :  "169, 169, 169"; break;
            case "DARKBLUE": va = op.type == "r16" ? "#00008B" :  "0, 0, 139"; break;
            case "DARKCYAN": va = op.type == "r16" ? "#008B8B" :  "0, 139, 139"; break;
            case "DARKMAGENTA": va = op.type == "r16" ? "#8B008B" :  "139, 0, 139"; break;
            case "SCARLET":
            case "DARKRED": va = op.type == "r16" ? "#8B0000" :  "139, 0, 0"; break;
            default: return color;
        }
        return op.type == "r16" ? va : "rgba(" + va + ", " + op.a + ")";
    }
}