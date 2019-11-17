var config = {
    WIDTH : 800,
    HEIGHT : 600,
    PIXEL_WIDTH : 20,
    PIXEL_HEIGHT : 20,
    FPS : 8
};

config.PIXEL_TOTAL_WIDTH = config.WIDTH / config.PIXEL_WIDTH;
config.PIXEL_TOTAL_HEIGHT = config.HEIGHT / config.PIXEL_HEIGHT;

module.exports = config;