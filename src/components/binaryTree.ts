export class Node {
  public value: number;
  public left: Node | null;
  public right: Node | null;
  public x: number | null;
  public y: number | null;
  public parent: Node | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = null;
    this.y = null;
    this.parent = null;
  }
}

export type Method = "preOrder" | "inOrder" | "postOrder";

export class BinaryTree {
  public root: Node | null;

  constructor() {
    this.root = null;
  }

  add(value: number) {
    const newNode = new Node(value);
    if (this.root == null) {
      this.root = newNode;
      this.root.x = window.innerWidth / 2;
      this.root.y = 15;
      return;
    }

    let currentNode = this.root as Node | null;
    while (currentNode) {
      if (newNode.value < currentNode.value) {
        if (
          !currentNode.left &&
          currentNode.x !== null &&
          currentNode.y !== null
        ) {
          currentNode.left = newNode;
          newNode.parent = currentNode;
          newNode.x = currentNode.x - 30;
          newNode.y = currentNode.y + 30;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (
          !currentNode.right &&
          currentNode.x !== null &&
          currentNode.y !== null
        ) {
          currentNode.right = newNode;
          newNode.parent = currentNode;
          newNode.x = currentNode.x + 30;
          newNode.y = currentNode.y + 30;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  preOrder(node: Node | null, callback: (node: Node) => void) {
    if (node == null) return;
    callback(node);
    this.preOrder(node.left, callback);
    this.preOrder(node.right, callback);
  }

  inOrder(node: Node | null, callback: (node: Node) => void) {
    if (node == null) return;
    this.inOrder(node.left, callback);
    callback(node);
    this.inOrder(node.right, callback);
  }

  postOrder(node: Node | null, callback: (node: Node) => void) {
    if (node == null) return;
    this.postOrder(node.left, callback);
    this.postOrder(node.right, callback);
    callback(node);
  }

  traverse(callback: (node: Node) => void, method: Method) {
    if (method === "preOrder") {
      return this.preOrder(this.root, callback);
    }

    if (method === "inOrder") {
      return this.inOrder(this.root, callback);
    }

    return this.postOrder(this.root, callback);
  }

  getHeight(node: Node | null, height = 0): number {
    return node
      ? 1 +
          Math.max(
            this.getHeight(node.left, height),
            this.getHeight(node.right, height)
          )
      : 0;
  }

  getElements(method = "inOrder" as Method) {
    let ans = [] as (Node | null)[];
    this.traverse((node) => ans.push(node), method);
    return ans;
  }
}
