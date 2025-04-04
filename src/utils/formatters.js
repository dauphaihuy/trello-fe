export const capitalizeFirstLetter = (val) => {
    if (!val) return ''
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}
export const mapOrder = (originalArray, orderArray, key) => {
    if (!originalArray || !orderArray || !key) return []

    const clonedArray = [...originalArray]
    const orderedArray = clonedArray.sort((a, b) => {
        return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
    })

    return orderedArray
}
export const generatePlaceholderCard = (column) => {
    return {
        _id: `${column._id}-placeholder-card`,
        boardId: column.boardId,
        columnId: column._id,
        FE_PlaceholderCard: true
    }
}