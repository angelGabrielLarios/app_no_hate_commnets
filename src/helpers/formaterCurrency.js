export function formaterCurrency(number = 0) {


    const format = parseFloat(number.toFixed(2)).toLocaleString("en", {
        style: "currency",
        currency: "MXN"
    });
    return format
}