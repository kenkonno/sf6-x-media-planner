import dayjs from "dayjs";

export function dateFormat(date: string) {
    return date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : ""
}

export function dateFormatYMD(date: string) {
    return date ? dayjs(date).format("YYYY-MM-DD") : ""
}

export function unixTimeFormat(unixTime: number) {
    return dayjs.unix(unixTime).format("YYYY-MM-DD HH:mm:ss")
}

export function pileUpLabelFormat(v: number) {
    return Math.round(v * 10 / 8) / 10
}

export function progressFormat(v: number) {
    const result = v.toFixed(1)
    return result == "NaN" ? "0.0" : result
}


