const { EventListener } = require('./events')

let eciEvent = new EventListener();
eciEvent.blockEventListener("eci", "Admin", "evschannel");