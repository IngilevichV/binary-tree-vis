import { memo } from "react";
import { Node as NodeType } from "./binaryTree";

const radius = 15;
const getOffset = (direction: "left" | "right") => {
  const angle = direction === "left" ? 135 : 45;
  const multiplier = direction === "left" ? -1 : 1;
  return {
    x: multiplier * radius * Math.sin((Math.PI * 2 * angle) / 360),
    y: multiplier * radius * Math.cos((Math.PI * 2 * angle) / 360),
  };
};

export const Node = memo(({ node }: { node: NodeType }) => {
  const direction = (node.parent?.value ?? 0) > node.value ? "left" : "right";
  const { x, y } = getOffset(direction);
  return (
    <g key={`${node.x}-${node.y}-${node.value}`}>
      <line
        x1={(node.parent?.x ?? 0) + x}
        y1={(node.parent?.y ?? 0) + y}
        x2={node.x ?? 0}
        y2={node.y ?? 0}
        strokeWidth={node.parent ? 2 : 0}
        stroke="green"
      />

      <circle
        cx={node.x ?? 0}
        cy={node.y ?? 0}
        stroke="green"
        fill={"white"}
        r={radius}
      />

      <text x={node.x ?? 0} y={node.y ?? 0} textAnchor="middle">
        {node.value}
      </text>
    </g>
  );
});
