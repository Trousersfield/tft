import { cache as setData } from './setDataImporter'

const ITEMS = setData['items']
const BASIC_ITEM_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

/**
 * Given a combined item, return its basic items.
 *
 * @param {Item} item
 */
const basicItems = (item) => {
  if (item.id < 10) return
  const ids = item.id.toString().split('')
  if (ids.length !== 2) return
  const items = ids.map(id => (
    getItem(parseInt(id))
  ))
  return items
}

/**
 * Find possible combinations given a basic item
 *
 * @param   {Item}    item  The basic item
 * @return  {List}          List of possible combination-items for given item
 */
const combinedItems = (item) => {
  if (item.id > 9) return
  const items = BASIC_ITEM_IDS.reduce((result, currentId) => {
    const combinedItem = item.id < currentId ?
      getItem(parseInt(`${item.id}${currentId}`)) :
      getItem(parseInt(`${currentId}${item.id}`))
    if (combinedItem) result.push(combinedItem)
    return result
  }, [])
  return items
}

const getItem = (id) => {
  return ITEMS.find(item => item.id === id)
}

export {
  basicItems,
  combinedItems
}