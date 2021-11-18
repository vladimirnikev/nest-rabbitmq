import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { createWorker } from 'tesseract.js';

@Controller()
export class AppController {
  @MessagePattern('notification')
  getNotifications(@Payload() data, @Ctx() context: RmqContext) {
    const worker = createWorker({
      logger: m => console.log(m),
    });

    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(data);
      console.log(text);
      await worker.terminate();
    })();
  }
}
