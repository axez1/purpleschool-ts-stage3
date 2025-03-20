interface IA {
  a: number;
  b: string;
}

interface IB {
  a: number;
  c: boolean;
}

function difference<A extends object, B extends object>(
  objA: A,
  objB: B
): Pick<A, Exclude<keyof A, keyof B>> {
  const result = {} as Pick<A, Exclude<keyof A, keyof B>>;

  const keys = Object.keys(objA).filter((key) => !(key in objB)) as Array<
    Exclude<keyof A, keyof B>
  >;

  keys.forEach((key) => {
    result[key] = objA[key];
  });

  return result;
}

const a: IA = {
  a: 5,
  b: '',
};

const b: IB = {
  a: 10,
  c: true,
};

const result = difference(a, b);
console.log(result);
