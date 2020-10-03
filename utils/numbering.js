// from https://community.shopify.com/c/Shopify-Design/Ordinal-Number-in-javascript-1st-2nd-3rd-4th/m-p/72156
function getNumberWithOrdinal (n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return (s[(v - 20) % 10] || s[v] || s[0])
}

module.exports = { getNumberWithOrdinal }
