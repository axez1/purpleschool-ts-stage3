function allowFunc<T>(validator: (value: T) => boolean) {
  return function (
    _target: any,
    context: ClassAccessorDecoratorContext<any, T>
  ) {
    return {
      get(this: any) {
        return this[`_${String(context.name)}`];
      },
      set(this: any, newValue: T) {
        if (validator(newValue)) {
          this[`_${String(context.name)}`] = newValue;
        } else {
          throw new Error(
            `Invalid value for ${String(context.name)}: ${newValue}`
          );
        }
      },
    };
  };
}

class User {
  @allowFunc((a: number) => a > 0)
  accessor age: number = 30;
}

const person = new User();

person.age = 0;

person.age = 20;
