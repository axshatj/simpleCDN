const crypto = require('crypto');

class ConsistentHash {
  constructor(nodes, virtualNodes = 100) {
    this.nodes = new Set(nodes);
    this.virtualNodes = virtualNodes;
    this.ring = new Map();
    this.sortedKeys = [];
    this._generateRing();
  }

  _generateRing() {
    for (const node of this.nodes) {
      for (let i = 0; i < this.virtualNodes; i++) {
        const key = this._hash(`${node}:${i}`);
        this.ring.set(key, node);
      }
    }
    this.sortedKeys = Array.from(this.ring.keys()).sort((a, b) => a - b);
  }

  _hash(key) {
    return crypto.createHash('md5').update(key).digest('hex');
  }

  getNode(key) {
    if (this.ring.size === 0) {
      return null;
    }
    const hash = this._hash(key);
    const index = this.sortedKeys.findIndex(k => k >= hash);
    return this.ring.get(this.sortedKeys[index] || this.sortedKeys[0]);
  }

  addNode(node) {
    if (!this.nodes.has(node)) {
      this.nodes.add(node);
      for (let i = 0; i < this.virtualNodes; i++) {
        const key = this._hash(`${node}:${i}`);
        this.ring.set(key, node);
      }
      this.sortedKeys = Array.from(this.ring.keys()).sort((a, b) => a - b);
    }
  }

  removeNode(node) {
    if (this.nodes.has(node)) {
      this.nodes.delete(node);
      for (let i = 0; i < this.virtualNodes; i++) {
        const key = this._hash(`${node}:${i}`);
        this.ring.delete(key);
      }
      this.sortedKeys = Array.from(this.ring.keys()).sort((a, b) => a - b);
    }
  }
}

module.exports = ConsistentHash;

