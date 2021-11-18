import { CreateRequestDto } from './dto/create-request.dto';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { createWorker } from 'tesseract.js';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private httpService: HttpService,
    @Inject('OCR_SERVICE') private readonly client: ClientProxy
  ) { }

  @Post()
  request(
    @Body() dto: CreateRequestDto,
  ): any {
    this.client.emit('notification', dto.fileUrl)
  }
}
