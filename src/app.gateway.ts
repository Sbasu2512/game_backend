import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from './app.service.js';

// payload: {
//     verb: 'get' | 'set' | 'update' | 'delete',
//     data: {
//        maction: 'register' | 'login' | 'logout' | 'refreshToken' | 'game-action' | ...
//        payload: any
//     },
// }

@WebSocketGateway({
  cors: { origin: '*' },
})
export class AppGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly appService: AppService) {}

  // Single entry point for API calls
  @SubscribeMessage('api')
  async handleApi(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    const { verb, data } = body;

    try {
      let result: any;

      switch (`${verb}`) {
        case 'get':
          result = this.appService.get();
          break;

        case 'set':
          result = this.appService.set(data);
          break;

        case 'update':data
          result = this.appService.update(data);
          break;

        case 'delete':
          result = this.appService.delete(data);
          break;

        default:
          throw new Error('Unknown API route');
      }

      client.emit('api_response', {
        status: 'success',
        data: result,
        error: null,
      });
    } catch (err: any) {
      client.emit('api_response', {
        status: 'error',
        data: null,
        error: err.message,
      });
    }
  }
}
