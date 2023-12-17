export const jpNumUnit = (lg10: number) => {
    const units = [
        '',
        '万',
        '億',
        '兆',
        '京',
        '垓',
        '𥝱',
        '穣',
        '溝',
        '澗',
        '正',
        '載',
        '極',
        '恒河沙',
        '阿僧祇',
        '那由他',
        '不可思議',
        '無量大数',
    ] as const
    return units[Math.floor(lg10 / 4)]
}

export const toJpNum = (num: number) => {
    const lg10 = num.toString().length-1
    const unit = jpNumUnit(lg10)
    const res = Math.floor((num / Math.pow(10, lg10 - (lg10 % 4))) * 10) / 10
    return `${res}${unit}`
}
