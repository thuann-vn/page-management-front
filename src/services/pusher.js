
import Pusher from 'pusher-js';
import Config from '../constants/Config';
const PusherService = new Pusher(Config.pusherAppKey, {
    cluster: Config.pusherCluster,
    encrypted: true
});

export default PusherService;