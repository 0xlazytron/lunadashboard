import React from "react";

const Grid: React.FC<GridProps> = ({
  gridRow,
  gap,
  columnGap,
  rowGap,
  justifyItems,
  alignItems,
  justifyContent,
  alignContent,
  children,
  className,
  ...rest
}) => {
  const gridClasses = `
  ${gridRow ? `grid-rows-${gridRow}` : ""}
  ${gap ? `gap-${gap}` : ""}
  ${columnGap ? `gap-x-${columnGap}` : ""}
  ${rowGap ? `gap-y-${rowGap}` : ""}
  ${justifyItems ? `justify-items-${justifyItems}` : ""}
  ${alignItems ? `items-${alignItems}` : ""}
  ${justifyContent ? `justify-${justifyContent}` : ""}
  ${alignContent ? `content-${alignContent}` : ""}
  ${className}
`;

  return (
    <div className={`grid ${gridClasses}`} {...rest}>
      {children}
    </div>
  );
};

export default Grid;
