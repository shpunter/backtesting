const Rect = ({ x, y, width, height, color }: RectProps) => {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={color}
      opacity="0.7"
    />
  );
};

export default Rect;

type RectProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};
