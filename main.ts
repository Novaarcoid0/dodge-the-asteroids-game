function createAsteroids () {
    info.startCountdown(15)
    while (info.countdown() > 0) {
        projectile = sprites.createProjectileFromSide(assets.image`asteroid0`, randint(-75, -25), randint(-25, 25))
        projectile.setPosition(160, randint(5, 115))
        pause(randint(250, 1000))
    }
}
function startGame () {
    info.setLife(3)
    scene.setBackgroundImage(assets.image`spaceBackground`)
    scroller.scrollBackgroundWithSpeed(-50, 0)
    discovery = sprites.create(assets.image`discoveryShuttle`, SpriteKind.Player)
    discovery.setPosition(30, 60)
    discovery.z = 10
    controller.moveSprite(discovery, 75, 75)
    discovery.setStayInScreen(true)
    createAsteroids()
}
info.onCountdownEnd(function () {
    hubble = sprites.create(assets.image`hubbleTelescope`, SpriteKind.Player)
    hubble.setPosition(140, 55)
    music.play(music.melodyPlayable(music.siren), music.PlaybackMode.InBackground)
    scroller.scrollBackgroundWithSpeed(0, 0)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
    scene.setBackgroundImage(assets.image`kellyScreen`)
})
let hubble: Sprite = null
let discovery: Sprite = null
let projectile: Sprite = null
game.showLongText("dodge the asteroids", DialogLayout.Bottom)
startGame()
scene.setBackgroundImage(assets.image`kellyScreen`)
game.showLongText("Good job if you finished, but try again if you hit 3 asteroids.", DialogLayout.Bottom)
