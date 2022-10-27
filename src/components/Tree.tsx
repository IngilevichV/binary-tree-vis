import { memo, useState, useEffect } from "react";
import { Node } from "./Node";
import { Node as NodeType } from "./binaryTree";

export const Tree = memo(
  ({
    elements = [],
    highlight = false,
    onStopTraverse,
  }: {
    highlight: boolean;
    elements: (NodeType | null)[];
    onStopTraverse: () => void;
  }) => {
    const [array, setArray] = useState(elements);
    const [displayArray, setDisplayArray] = useState<(NodeType | null)[]>(
      highlight ? [] : elements
    );
    const [displayEl, setDisplayEl] = useState<NodeType | null>();
    useEffect(() => {
      setArray(elements);
    }, [elements]);

    useEffect(() => {
      if (highlight) {
        setDisplayArray([]);
      } else {
        setDisplayArray(elements);
      }
    }, [highlight, elements]);

    const delay = (ms: number) =>
      new Promise((res) => {
        setTimeout(() => {
          res(1);
        }, ms);
      });

    useEffect(() => {
      if (!highlight) return;
      (async function () {
        for (let el of array) {
          await delay(1000);
          setDisplayEl(el);
        }
        onStopTraverse();
      })();
    }, [array, highlight]);

    useEffect(() => {
      if (!highlight) return;
      displayEl && setDisplayArray((prev) => [...prev, displayEl]);
    }, [displayEl, highlight]);

    return (
      <svg width="100%" height="100%">
        <g transform="translate(0, 15)">
          {displayArray.map((node, i) => {
            return (
              node && (
                <Node
                  key={`${node.x ?? 0}-${node.y ?? 0}-${node.value}-${i}`}
                  node={node}
                />
              )
            );
          })}
        </g>
      </svg>
    );
  }
);
