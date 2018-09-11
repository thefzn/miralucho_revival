import levelBar from "../../img/bar01.png";
import levelBarBack from "../../img/levelMeterBack.png";
import ramBar from "../../img/bar02.png";
import ramBarBack from "../../img/ramMeterBack.png";

export default [
    {
        name: "levelBar",
        source: levelBar,
        repeat: "repeat-x",
    },
    {
        name: "levelBarBack",
        source: levelBarBack,
        size: [167, 38],
    },
    {
        name: "ramBar",
        source: ramBar,
        repeat: "repeat-y",
    },
    {
        name: "ramBarBack",
        source: ramBarBack,
        size: [40, 181],
    },
    {
        name: "empty",
        fixed: true,
    },
];
