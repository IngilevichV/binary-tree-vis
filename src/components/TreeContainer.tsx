import React, { memo, useState, useCallback, useRef } from "react";
import { BinaryTree, Method } from "./binaryTree";
import { Tree } from "./Tree";

export const TreeContainer = memo(() => {
  const [treeNodes, setTreeNodes] = useState([11, 7, 15]);
  const tree = new BinaryTree();
  const [method, setMethod] = useState<Method>("inOrder");

  const [highlight, setHighlight] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && ref.current) {
        const value = Number((e.target as any).value);
        setTreeNodes([...treeNodes, value]);
        ref.current.value = "";
      }
    },
    [treeNodes]
  );

  treeNodes.forEach((v) => tree.add(v));
  const elements = tree.getElements(method);

  const onMethodClick = useCallback((method: Method) => {
    setHighlight(true);
    setMethod(method);
  }, []);

  return (
    <>
      <div className="wrapper">
        <input ref={ref} onKeyUp={handleKeyUp} placeholder="Add new node" />
      </div>

      <div className="row">
        <div className="button" onClick={() => onMethodClick("preOrder")}>
          Traverse tree preOrder method
        </div>

        <div className="button" onClick={() => onMethodClick("inOrder")}>
          Traverse tree inOrder method
        </div>

        <div className="button" onClick={() => onMethodClick("postOrder")}>
          Traverse tree postOrder method
        </div>
      </div>

      <Tree
        elements={elements}
        highlight={highlight}
        onStopTraverse={() => setHighlight(false)}
      />
    </>
  );
});
