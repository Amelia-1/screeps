//test

const roleList = {
  harvester: require("role.harvester"),
  upgrader: require("role.upgrader"),
};

const creepLimit = {
  harvester: 2,
  upgrader: 2,
};

function ClearCreepMemory() {
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log("Clearing non-existing creep memory:", name);
    }
  }
}

function Debug() {
  for (let currRole in roleList) {
    roleName = roleList[currRole].roleID;

    let currentAmount = _.filter(
      Game.creeps,
      (creep) => creep.memory.role == roleName,
    ).length;
  }
}

function HandleCreepSpawing() {
  if (Game.spawns["Spawn1"].spawning) {
    var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
    Game.spawns["Spawn1"].room.visual.text(
      "🛠️" + spawningCreep.memory.role,
      Game.spawns["Spawn1"].pos.x + 1,
      Game.spawns["Spawn1"].pos.y,
      { align: "left", opacity: 0.8 },
    );
  } else {
    for (let currRole in roleList) {
      roleName = roleList[currRole].roleID;

      let currentAmount = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == roleName,
      ).length;

      console.log(currentAmount + " " + roleName);

      if (currentAmount < creepLimit[currRole]) {
        let newName = roleName + Game.time;

        console.log(`Spawning New: ${roleName} ` + newName);

        Game.spawns["Spawn1"].spawnCreep(roleList[currRole].preset, newName, {
          memory: { role: roleName },
        });
      }
    }
  }
}

module.exports.loop = function () {
  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    roleList[creep.memory.role].run(creep);
  }

  ClearCreepMemory();
  HandleCreepSpawing();
};
