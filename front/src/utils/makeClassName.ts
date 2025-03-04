export const makeClassName = (
  element: string | string[],
  block?: string,
  modifier?: Record<string, boolean | string | undefined>
) => {
  const classNames = [];
  let className = element;

  if (block) {
    className += `__${block}`;
  }

  classNames.push(className);

  if (modifier) {
    Object.entries(modifier).forEach(([key, value]) => {
      if (!value) return;

      switch (true) {
        case /^key*/.test(key):
          classNames.push(`${className}--${value}`);
          break;
        case /^mixin*/.test(key):
          classNames.push(value);
          break;
        default:
          classNames.push(`${className}--${key}`);
      }
    });
  }

  return classNames.join(' ');
};
