// @ts-check
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import LinkedList from './LinkedList.js';

describe('LinkedList', () => {
  let list = new LinkedList();

  beforeEach(() => {
    list = new LinkedList();
  });

  describe('log list', () => {
    it('should log list', () => {
      const { log } = console;
      const logSpy = jest
        .spyOn(console, 'log')
        .mockImplementationOnce(jest.fn());
      list.add('item');
      list.log();
      expect(logSpy).toHaveBeenCalledWith(['item']);
      console.log = log;
    });
  });

  describe('add nodes to linked list', () => {
    it('should add one node', () => {
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.length).toBe(0);
      const node = list.add(1);
      expect(list.length).toBe(1);
      expect(list.head).toEqual(node);
      expect(list.tail).toEqual(node);
    });

    it('should add some nodes and change its previous and next values', () => {
      const a = list.add('a');
      const b = list.add('b');
      const c = list.add('c');

      expect(list.head).toEqual(a);
      expect(list.tail).toEqual(c);

      expect(a.value).toBe('a');
      expect(b.value).toBe('b');
      expect(c.value).toBe('c');

      expect(a.previous).toBe(null);
      expect(a.next).toBe(b);

      expect(b.previous).toBe(a);
      expect(b.next).toBe(c);

      expect(c.previous).toBe(b);
      expect(c.next).toBe(null);
    });
  });

  describe('get nodes by index', () => {
    beforeEach(() => {
      list.add('a');
      list.add('b');
      list.add('c');
      list.add('d');
    });

    it('should get some nodes by index', () => {
      expect(list.getByIndex(0).value).toBe('a');
      expect(list.getByIndex(1).value).toBe('b');
      expect(list.getByIndex(2).value).toBe('c');
      expect(list.getByIndex(3).value).toBe('d');
    });

    it('should not get node from inexistent index', () => {
      expect(list.length).toBe(4);
      expect(list.getByIndex(-1)).toBeNull();
      expect(list.getByIndex(4)).toBeNull();
    });
  });

  describe('iterate by linked list nodes', () => {
    beforeEach(() => {
      list.add('a');
      list.add('b');
      list.add('c');
      list.add('d');
    });

    it('should iterate by linked list nodes', () => {
      const fn = jest.fn();
      for (const item of list) {
        fn(item);
      }
      expect(fn).toBeCalledTimes(4);
      expect(fn).toHaveBeenNthCalledWith(1, 'a');
      expect(fn).toHaveBeenNthCalledWith(2, 'b');
      expect(fn).toHaveBeenNthCalledWith(3, 'c');
      expect(fn).toHaveBeenNthCalledWith(4, 'd');
    });

    it('should create array from linkedList', () => {
      expect([...list]).toEqual(['a', 'b', 'c', 'd']);
      expect(Array.from(list)).toEqual(['a', 'b', 'c', 'd']);
    });
  });

  describe('remove nodes from linked list', () => {
    beforeEach(() => {
      list.add('a');
      list.add('b');
      list.add('c');
      list.add('d');
      list.add('e');
    });
    it('should remove the only node that is head and tail', () => {
      list = new LinkedList();
      const node = list.add('unique');
      expect(list.length).toBe(1);
      expect(list.head).toEqual(node);
      expect(list.tail).toEqual(node);
      list.removeIndex(0);
      expect(list.length).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });
    it('should not remove node if index does not exists', () => {
      list.removeIndex(-1);
      list.removeIndex(5);
      expect(list.length).toBe(5);
    });

    it('should change list length on delete some node', () => {
      expect(list.length).toBe(5);
      list.removeIndex(2);
      expect(list.length).toBe(4);
      list.removeIndex(0);
      expect(list.length).toBe(3);
    });

    it('should delete head', () => {
      expect(list.head.value).toBe('a');
      list.removeIndex(0);
      expect(list.head.value).toBe('b');
      expect(list.head.previous).toBeNull();
    });

    it('should delete tail', () => {
      expect([...list]).toEqual(['a', 'b', 'c', 'd', 'e']);
      expect(list.tail.value).toBe('e');
      list.removeIndex(4);
      expect([...list]).toEqual(['a', 'b', 'c', 'd']);

      expect(list.tail.value).toBe('d');
      expect(list.tail.next).toBeNull();
    });

    it('should delete some node between head and tail', () => {
      expect([...list]).toEqual(['a', 'b', 'c', 'd', 'e']);
      list.removeIndex(2);
      expect([...list]).toEqual(['a', 'b', 'd', 'e']);
      list.removeIndex(1);
      expect([...list]).toEqual(['a', 'd', 'e']);
    });
  });

  describe('LinkedList corner cases', () => {
    beforeEach(() => {
      list.add('a');
      list.add('b');
      list.add('c');
      list.add('d');
    });

    it('should not allow change list length by public interface', () => {
      expect(list.length).toBe(4);
      list.length = 5;
      expect(list.length).toBe(4);
    });

    it('should not allow change list head by public interface', () => {
      expect([...list]).toEqual(['a', 'b', 'c', 'd']);
      const node = LinkedList.Node('head');
      expect(node.next).toBeNull();
      expect(node.previous).toBeNull();
      node.next = list.head;
      list.head = node;
      expect([...list]).toEqual(['a', 'b', 'c', 'd']);
    });

    it('should not allow change list tail by public interface', () => {
      expect([...list]).toEqual(['a', 'b', 'c', 'd']);
      const node = LinkedList.Node('tail');
      expect(node.next).toBeNull();
      expect(node.previous).toBeNull();
      const tail = list.tail;
      node.previous = tail;
      list.tail = node;
      tail.next = node;
      expect([...list]).toEqual(['a', 'b', 'c', 'd']);
    });
  });
});
