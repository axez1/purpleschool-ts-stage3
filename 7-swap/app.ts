function swapKeysAndValues(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const newObject: Record<string, unknown> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === "string") {
        newObject[value] = key;
      } else if (typeof value === "number") {
        newObject[value] = key;
      }
    }
  }

  return newObject;
}

console.log(swapKeysAndValues({ A: 1, B: 2 }));
