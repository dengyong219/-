import Mock from "mockjs";
Mock.mock("/api/about", "get", {
    code: 0,
    msg: "",
    // data: "http://skill.phodal.com/#_rs2tu_1_Name"
    // data: "https://www.bootstrapmb.com/item/15574/preview",//栗子效果
    data: "https://www.bootstrapmb.com/item/6896/preview",//蜘蛛
})