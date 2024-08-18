
/**
 * Convert fomart numeric at format currency es-CO COP, Colombian Peso
 * @param {Number} value Number to convert
 * @returns {String} Number fomated to Colombian Peso.
 */
export function formatCurrencyCOP(value) {
    const formatCurrency= new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formatCurrency.format(value);
}
