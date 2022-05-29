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

    // Rooms source
    { name: "tiles", type: "image", src: "/src/tilemap/source/MiniPack/tiles.png" },
    { name: "table_2", type: "image", src: "/src/tilemap/source/MiniPack/table_2.png" },
    { name: "building3_blue", type: "image", src: "/src/tilemap/source/MiniPack/building3_blue.png" },
    { name: "building1_blue", type: "image", src: "/src/tilemap/source/MiniPack/building1_blue.png" },
    { name: "tree_1", type: "image", src: "/src/tilemap/source/MiniPack/tree_1.png" },
    { name: "angar2_blue", type: "image", src: "/src/tilemap/source/MiniPack/angar2_blue.png" },
    { name: "building1_yellow", type: "image", src: "/src/tilemap/source/MiniPack/building1_yellow.png" },
    { name: "[Base]BaseChip_pipo", type: "image", src: "/src/tilemap/source/Pipoya RPG Tileset 16x16/Pipoya RPG Tileset 16x16/[Base]BaseChip_pipo.png" },
    // Rooms tilesets
    { name: "BgTileset", type: "tsx", src: "/src/tilemap/tilesets/BgTileset.tsx" },
    { name: "table_2", type: "tsx", src: "/src/tilemap/tilesets/table_2.tsx" },
    { name: "ObjTileset", type: "tsx", src: "/src/tilemap/tilesets/ObjTileset.tsx" },
    { name: "Building2", type: "tsx", src: "/src/tilemap/tilesets/Building2.tsx" },
    { name: "Trees", type: "tsx", src: "/src/tilemap/tilesets/Trees.tsx" },
    { name: "Angar1", type: "tsx", src: "/src/tilemap/tilesets/Angar1.tsx" },
    { name: "OrangeBuilding", type: "tsx", src: "/src/tilemap/tilesets/OrangeBuilding.tsx" },
    { name: "BgTileset_Interior", type: "tsx", src: "/src/tilemap/tilesets/BgTileset_Interior.tsx" },
    // Rooms tilemap
    { name: "room01", type: "tmx", src: "/src/tilemap/Room_01.tmx" },
    { name: "room02", type: "tmx", src: "/src/tilemap/Room_02.tmx" },
    { name: "room03", type: "tmx", src: "/src/tilemap/Room_03.tmx" },
    { name: "room11", type: "tmx", src: "/src/tilemap/Room_11.tmx" },
    { name: "room11_2", type: "tmx", src: "/src/tilemap/Room_11_2.tmx" },
    { name: "room12", type: "tmx", src: "/src/tilemap/Room_12.tmx" },
    { name: "room13", type: "tmx", src: "/src/tilemap/Room_13.tmx" },
    { name: "room14", type: "tmx", src: "/src/tilemap/Room_14.tmx" },
    { name: "room15", type: "tmx", src: "/src/tilemap/Room_15.tmx" },
    { name: "room16", type: "tmx", src: "/src/tilemap/Room_16.tmx" },
    { name: "room17", type: "tmx", src: "/src/tilemap/Room_17.tmx" },
    { name: "room18", type: "tmx", src: "/src/tilemap/Room_18.tmx" },

    // Title Screen assets
    { name: "title-bg", type: "image", src: "/src/img/title-bg.png" },
    { name: "title-logo", type: "image", src: "/src/img/title-logo.png" },
    { name: "start-text", type: "image", src: "/src/img/start-text.png" },

    // Overworld assets
    { name: "player", type: "image", src: "/src/img/OverworldPlayer/player.png" },
    { name: "player", type: "json", src: "/src/img/OverworldPlayer/player.json" },
    { name: "player-run", type: "image", src: "/src/img/OverworldPlayer/player-run.png" },
    { name: "player-run", type: "json", src: "/src/img/OverworldPlayer/player-run.json" },


    // Sprites for enemies (temporal, will be replaced by texturePacker)
    { name: "zombie", type: "image", src: "/src/sprites/ingame/zombie.png" },
    { name: "slime", type: "image", src: "/src/sprites/ingame/slime.png" },
    { name: "skeleton", type: "image", src: "/src/sprites/ingame/skeleton.png" },
    { name: "goblin", type: "image", src: "/src/sprites/ingame/goblin.png" },
    { name: "acid-slime", type: "image", src: "/src/sprites/ingame/acid-slime.png" },
    { name: "skeleton-archer", type: "image", src: "/src/sprites/ingame/skeleton-archer.png" },
    { name: "forest-defender", type: "image", src: "/src/sprites/ingame/forest-defender.png" },
];

export default DataManifest;