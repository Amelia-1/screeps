const roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder')
};

function clearCreepMemory() {
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

module.exports.loop = function () {
    
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        roles[creep.memory.role].run(creep);
    }
    
    clearCreepMemory();
    
}