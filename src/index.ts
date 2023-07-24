import { GraphConstructorType, GraphClassType, EdgeType } from "./type";

export class Graph implements GraphClassType {
  node: string[] = [];
  edge: EdgeType = {};
  start: null = null;
  end: null = null;

  constructor(graphData: GraphConstructorType) {
    if (graphData.node != undefined && graphData.node != null) {
      this.node = graphData.node;
    }
    if (graphData.isUnforked) {
      this.edge = {}
      this.node.forEach((elm, index) => {
        if (index < this.node.length - 1) {
          this.edge[elm] = [this.node[index + 1]]
        }
      })
    }
    if (graphData.edge != undefined && graphData.edge != null) {
      this.edge = graphData.edge;
    }
  }

  public addNode = (node_name: (string)): undefined => {
    if (!this.node.includes(node_name)) {
      this.node.push(node_name)
    }
  }

  public addEdge = (from: (string), to: (string)): undefined => {
    if (this.edge[from] != undefined) {
      this.edge[from].push(to)
    }
    else {
      this.node.push(from)
      this.edge[from] = [to]
    }
    if (this.node.includes(to)) {
      this.node.push(to)
    }
  }

  public changeNodeDestination = (node: (string), to:Array<string>): undefined => {
    this.edge[node] = to
  }

  public getReverseEdge = (): EdgeType => {
    let reverseEdge: EdgeType = {}
    for (let targetNode of this.node) {
      reverseEdge[targetNode] = []
      for (let key of Object.keys(this.edge)) {
        //console.log(key, targetNode, this.edge[key], this.edge[key].includes(targetNode))
        if (this.edge[key].includes(targetNode)) {
          reverseEdge[targetNode].push(key)
        }
      }
    }
    return reverseEdge
  }

  public getStartNode = (): Array<string> => {
    let reverseEdge = this.getReverseEdge()
    let startNode: Array<string> = []
    for (let targetNode of Object.keys(reverseEdge)) {
      if (reverseEdge[targetNode].length == 0) {
        startNode.push(targetNode)
      }
    }
    return startNode
  }

  public getEndNode = (): Array<string> => {
    let endNode: Array<string> = [];
    for (let targetNode of this.node) {
      //console.log(targetNode)
      if (!Object.keys(this.edge).includes(targetNode) || this.edge[targetNode].length == 0) {
        endNode.push(targetNode);
      }
    }
    return endNode;
  };

  public topologicalSort = (): Array<string> => {
    let result = [];
    let startNode = this.getStartNode();
    let reverseEdge = this.getReverseEdge();
    let edgeCopy: EdgeType = JSON.parse(JSON.stringify(this.edge));
    //console.log(startNode, reverseEdge)
    while (startNode.length != 0) {
      let targetNode = startNode.shift();
      if (targetNode != undefined) {
        result.push(targetNode);
        if (edgeCopy[targetNode] != undefined && edgeCopy[targetNode] != null) {
          for (let edgeIndex in edgeCopy[targetNode]) {
            const targetEdge = edgeCopy[targetNode][edgeIndex];
            delete edgeCopy[targetNode][edgeIndex]
            reverseEdge[targetEdge] = reverseEdge[targetEdge].filter(elm => elm != targetNode)
            if (reverseEdge[targetEdge].length == 0) {
              startNode.push(targetEdge);
            }
          }
        }
      }
      else {
        break;
      }
    }
    return result;
  }
}
