export function zhuanhuanTime(time, showTime = false) {
    // 创建一个 Date 对象
    const date = new Date(+time);

    // 获取年份、月份、日期、小时和分钟
    const year = date.getFullYear();  // 获取年份
    const month = String(date.getMonth() + 1).padStart(2, '0');  // 获取月份，注意月份从 0 开始，需要加 1
    const day = String(date.getDate()).padStart(2, '0');  // 获取日期
    const hours = String(date.getHours()).padStart(2, '0');  // 获取小时
    const minutes = String(date.getMinutes()).padStart(2, '0');  // 获取分钟
    const second = String(date.getSeconds()).padStart(2, '0');  // 获取秒

    // 拼接成 "年-月-日-时-分-秒" 格式
    let formattedDate = `${year}-${month}-${day}`;
    if (showTime) {
        const sfm = `${hours}: ${minutes}: ${second}`
        formattedDate += ` ${sfm}`
    }
    return formattedDate
}