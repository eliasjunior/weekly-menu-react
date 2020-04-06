export function requiredParameter(name) {
  throw new Error(`${name} is required`);
}

export function normalize(data) {
  const makeByIdTable = (
    prev,
    { id = requiredParameter("id product"), name, catId }
  ) => {
    prev.byId[id] = {
      id,
      name,
      catId,
    };
    prev.allIds.push(id);
    return prev;
  };
  return data.reduce(makeByIdTable, { byId: {}, allIds: [] });
}
