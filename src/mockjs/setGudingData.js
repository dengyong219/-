import Mock from "mockjs"
import tx from "@/images/tx.png"
import qqewm from "@/images/qqewm.jpg"
import wxewm from "@/images/wxewm.jpg"
// import myFavicon from "@/images/favicon.ico" //不能编译
Mock.mock("/api/setting", "get", {
    code: 0,
    msg: "",
    data: {
        avatar: tx, //#个人空间的头像
        siteTitle: "邓泳个人空间", //#个人空间的标题
        github: "https://github.com/dengyongGitHub", //#空间主人的github地址
        qq: "2743280773", //#空间主人的qq号
        qqQrCode: qqewm, //#空间主人的qq二维码
        weixin: "y2o1n9g", //#空间主人的微信
        weixinQrCode: wxewm, //#空间主人的微信二维码
        mail: "dengyong0219@gmail.com", //#空间主人的邮箱
        icp: "粤ICP备88888888号", //#空间主人的备案号
        githubName: "dengyongGitHub", //#空间主人的github名称
        favicon: "ttp://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f", //#网站的 favicon 地址
        title: "这是可控编写的标题"// 网站标题昵称
    }
})