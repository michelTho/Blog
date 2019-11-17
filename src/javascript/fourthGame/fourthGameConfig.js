var config = {
    WIDTH : 800,
    HEIGHT : 600,
    PIXEL_WIDTH : 40,
    PIXEL_HEIGHT : 40,
    FPS : 15
};

config.PIXEL_TOTAL_WIDTH = config.WIDTH / config.PIXEL_WIDTH;
config.PIXEL_TOTAL_HEIGHT = config.HEIGHT / config.PIXEL_HEIGHT;

module.exports = config;