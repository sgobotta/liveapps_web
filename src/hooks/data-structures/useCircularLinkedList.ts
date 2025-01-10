export type CircularLinkedListNode = {
  data: any;
  next: CircularLinkedListNode | null;
  prev: CircularLinkedListNode | null;
};

export interface CircularLinkedListI {
  create: (nodesData: any[]) => CircularLinkedListNode | null;
  getNext: (head: CircularLinkedListNode) => void;
  getPrev: (head: CircularLinkedListNode) => void;
}

export const useCircularLinkedList = () => {
  function createNode(data: any): CircularLinkedListNode {
    return {
      data,
      next: null,
      prev: null,
    };
  }

  function create(nodesData: any[]): CircularLinkedListNode | null {
    if (nodesData.length === 0) return null;

    let head: CircularLinkedListNode = createNode(nodesData[0]);
    let current: CircularLinkedListNode = head;

    for (let i = 1; i < nodesData.length; i++) {
      const newNode = createNode(nodesData[i]);
      current.next = newNode;
      newNode.prev = current;
      current = newNode;
    }

    // Make it circular
    current.next = head;
    head.prev = current;

    return head;
  }

  function getNext(
    head: CircularLinkedListNode | null,
  ): CircularLinkedListNode | void {
    if (!head) return;

    let current: CircularLinkedListNode = head;
    do {
      current = current.next!;
      return current;
    } while (current !== head);
  }

  function getPrevious(
    head: CircularLinkedListNode | null,
  ): CircularLinkedListNode | void {
    if (!head) return;

    let current: CircularLinkedListNode = head.prev!; // Start from the last node
    do {
      current = current.prev!;
      return current;
    } while (current !== head!.prev);
  }

  return {
    create,
    getNext,
    getPrevious,
  };
};
