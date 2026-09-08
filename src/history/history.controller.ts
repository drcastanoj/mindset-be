import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryDto } from './history.dto';

@Controller('/history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Post()
  createHistory(@Body() historyDto: HistoryDto) {
    return this.historyService.create(historyDto);
  }

  @Get('/user/:userId')
  getHistoryByUser(@Param('userId') userId: string) {
    return this.historyService.findByUserId(userId);
  }

  @Get()
  getAllHistory() {
    return this.historyService.findAll();
  }
}
