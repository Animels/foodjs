import { makeClassName } from '@utils';

import './component.css';

const Image = ({
  src,
  radius,
  className,
  height,
  width,
}: {
  src: string;
  radius: string;
  className?: string;
  height?: string;
  width?: string;
}) => {
  return (
    <img
      style={{ height: height ?? 100, width: width ?? 100 }}
      className={makeClassName('image', undefined, { key: radius && `r${radius}`, mixin: className })}
      src={src}
    ></img>
  );
};

export { Image };
