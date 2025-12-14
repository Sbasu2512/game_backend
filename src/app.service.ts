import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  get() {
    return { message: 'Hello World!' };
  }

  set(payload: any) {
    return { saved: payload };
  }

  update(payload: any) {
    return { updated: payload };
  }

  delete(payload: any) {
    return { deleted: payload };
  }
}
