import { data as setData } from './setDataImporter'

const BASIC_ITEM_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

/**
 * Given a combined item, return its basic items.
 *
 * @param {Id} id
 */
const basicItems = (id) => {
  if (id < 10) return
  const ids = id.toString().split('')
  if (ids.length !== 2) return
  const items = ids.map(id => (
    setData.items[id].id
  ))
  return items
}

/**
 * Find possible combinations given a basic item
 *
 * @param   {Id}    id  The basic item's id
 * @return  {List}      List of possible combination-item ids for given item
 */
const combinedItems = (id) => {
  if (id > 9) return
  const items = BASIC_ITEM_IDS.reduce((result, currentId) => {
    const combinedItem = id < currentId ?
      setData.items[`${id}${currentId}`].id :
      setData.items[`${currentId}${id}`].id
    if (combinedItem) result.push(combinedItem)
    return result
  }, [])
  return items
}

export {
  basicItems,
  combinedItems
}