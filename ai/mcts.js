class Node {
    constructor(state, parent = null) {
        this.state = state;
        this.parent = parent;
        this.children = [];
        this.visits = 0;
        this.value = 0;
    }

    selectBestChild() {
        return this.children.reduce((best, child) => {
            let ucb1 = child.value / (child.visits + 1) + Math.sqrt(2 * Math.log(this.visits + 1) / (child.visits + 1));
            return ucb1 > best.ucb1 ? { node: child, ucb1 } : best;
        }, { node: null, ucb1: -Infinity }).node;
    }
}

function monteCarloTreeSearch(rootState, iterations) {
    let rootNode = new Node(rootState);

    for (let i = 0; i < iterations; i++) {
        let node = rootNode;
        while (node.children.length !== 0) node = node.selectBestChild();
        
        let newNode = expand(node);
        let result = simulate(newNode);
        backpropagate(newNode, result);
    }

    return rootNode.selectBestChild().state;
}
