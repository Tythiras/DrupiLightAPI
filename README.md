# DrupiLightAPI
API Component of LightAPI for Drupi
## Usage
`LightAPI.create(Location Location, int Level, updateLight);` - Creates light at location

`LightAPI.delete(Location Location, int Level, updateLight);` - Removes lighting at location

`LightAPI.update(Location Location, int Level);` - Updates lighting at location visually


```js
const LightAPI = require('LightAPI');
const level = 7;
let playerLoc = [];
function PlayerMoveEvent(event){
    let player = event.getPlayer();
    let item = player.getItemInHand();
    if(item&&item.getType() == "TORCH") {
        let loc = playerLoc[player.getUniqueId()];

        newLoc = player.getLocation();
        if(Math.abs(newLoc.getX() - loc.getX()) + Math.abs(newLoc.getY() - loc.getY()) + Math.abs(newLoc.getZ() - loc.getZ()) > 0.4) {
            if(loc) LightAPI.delete(loc, false);
            playerLoc[player.getUniqueId()] = newLoc;
            LightAPI.create(newLoc, level, false);
            LightAPI.update(newLoc, level);
        }
    }
}
function PlayerItemHeldEvent(event) {
    let player = event.getPlayer();
    let before = player.getInventory().getItem(event.getPreviousSlot());
    let after = player.getInventory().getItem(event.getNewSlot());
    if(before&&before.getType() == "TORCH") {
        let loc = playerLoc[player.getUniqueId()];
        if(loc) LightAPI.delete(loc, level, true);
    } else if(after&&after.getType() == "TORCH") {
        playerLoc[player.getUniqueId()] = player.getLocation();
        LightAPI.create(playerLoc[player.getUniqueId()], level, true);
    }
}
```
