const sanitizeArray = (item) => {
  const length = item.length;
  let newItem = Object.assign({}, item);
  const allKeys = Object.keys(item);
  for (let i = 0; i < length; i++) {
    const key = allKeys[i];
    delete newItem[key];
  }

  const nameKeys = allKeys.splice(length, length * 2);
  for (let i = 0; i < length; i++) {
    const key = nameKeys[i];
    const val = newItem[key];
    if (Array.isArray(val)) {
      newItem[key] = sanitizeArray(val);
    }
  }

  return newItem;
};

export const sanitizeResponse = (items) => {
  const newItems = items.map((item) => {
    let newItem = item;
    if (Array.isArray(item)) {
      newItem = sanitizeArray(item);
    }
    return newItem;
  });
  return newItems;
};
