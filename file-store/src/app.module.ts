import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule, ClientsModule.register([
    {
      name: 'OCR_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL || 'amqp://localhost:5672'],
        queue: 'ocr_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  ]),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
