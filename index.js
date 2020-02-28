require("PluginLoaded")("LightAPI", () => {
    var light = manager.loadExternal(manager.getPluginFile("LightAPI"));
    var lightAPI = light.loadClass("ru.beykerykt.lightapi.LightAPI");
    var ChunkInfo = light.loadClass("ru.beykerykt.lightapi.chunks.ChunkInfo");
    var createLight = lightAPI.getDeclaredMethod("createLight", org.bukkit.Location.class, Java.type("int").class, Java.type("boolean").class);
    var deleteLight = lightAPI.getDeclaredMethod("deleteLight", org.bukkit.Location.class, Java.type("boolean").class);
    var collectChunks = lightAPI.getDeclaredMethod("collectChunks", org.bukkit.Location.class, Java.type("int").class);
    var updateChunks = lightAPI.getDeclaredMethod("updateChunks", ChunkInfo);
    let updateLighting = (loc, level = 15) => {
        collectChunks.invoke(null, loc, level).forEach((info) => {
            updateChunks.invoke(null, info);
        })
    }
    module.exports = {
        create: (loc, level, update = true) => {
            createLight.invoke(null, loc, level, true);
            if(update) updateLighting(loc, level);
        },
        delete: (loc, update = true) => {
            deleteLight.invoke(null, loc, true);
            if(update) updateLighting(loc);
        },
        update: updateLighting
    };
});
