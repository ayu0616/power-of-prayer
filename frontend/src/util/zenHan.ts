export const toHankaku = (str: string): string => {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    })
}
export const toZenkaku = (str: string): string => {
    return str.replace(/[A-Za-z0-9]/g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) + 0xfee0)
    })
}
