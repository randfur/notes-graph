import {nodes, addloadedNode, compressNode, decompressNode} from './model.js';
import {updateNodeDom, updateNodeEdgesDom} from './dom.js';

export function load() {
  for (const id in nodes) {
    delete nodes[id];
  }
  
  const data = localStorage.getItem('compressedNodes');
  if (data) {
    const compressedNodes = JSON.parse(data);
    for (const compressedNode of compressedNodes) {
      addloadedNode(decompressNode(compressedNode));
    }
    for (const node of Object.values(nodes)) {
      updateNodeDom(node);
    }
    for (const node of Object.values(nodes)) {
      updateNodeEdgesDom(node);
    }
  }
}

export function save() {
  const compressedNodes = [];
  for (const node of Object.values(nodes)) {
    compressedNodes.push(compressNode(node));
  }
  localStorage.setItem('compressedNodes', JSON.stringify(compressedNodes));
}