const DataManifest = [
    // Entity definitions
    { name: "AttackDefinition", type: "json", src: "/js/definitions/attacks.json" },
    { name: "EnemyDefinition", type: "json", src: "/js/definitions/enemies.json" },
    // UI Texture
    { name: "UI_Assets-0", type: "image", src: "/src/img/UI_Assets-0.png" },
    { name: "UI_Assets-1", type: "image", src: "/src/img/UI_Assets-1.png" },
    { name: "UI_Assets-2", type: "image", src: "/src/img/UI_Assets-2.png" },
    { name: "battle-bg", type: "image", src: "/src/img/background.jpeg" },

    // JSON texturePacker Atlas
    { name: "UI_Assets-0", type: "json", src: "/src/img/UI_Assets-0.json" },
    { name: "UI_Assets-1", type: "json", src: "/src/img/UI_Assets-1.json" },
    { name: "UI_Assets-2", type: "json", src: "/src/img/UI_Assets-2.json" },

    { name: "'kenpixel'", type: "fontface",  src: "url('../src/font/kenvector_future.woff2')" },

    // Sprites for enemies (temporal, will be replaced by texturePacker)
    { name: "zombie", type: "image", src: "/src/sprites/ingame/zombie.png" },
    { name: "slime", type: "image", src: "/src/sprites/ingame/slime.png" },
    { name: "skeleton", type: "image", src: "/src/sprites/ingame/skeleton.png" },
    { name: "goblin", type: "image", src: "/src/sprites/ingame/goblin.png" },
    { name: "acid-slime", type: "image", src: "/src/sprites/ingame/acid-slime.png" },
    { name: "skeleton-archer", type: "image", src: "/src/sprites/ingame/skeleton-archer.png" },
    { name: "forest-defender", type: "image", src: "/src/sprites/ingame/forest-defender.png" },

    // Sound
    { name: "battle-sound", type: "audio", src: "src/audio/" },
];

export default DataManifest;