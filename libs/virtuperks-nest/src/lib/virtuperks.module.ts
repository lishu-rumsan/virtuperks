import { Module, Global } from '@nestjs/common';
import { VirtuperksController } from './virtuperks.controller';
import { VirtuperksService } from './virtuperks.service';

@Global()
@Module({
  controllers: [VirtuperksController],
  providers: [VirtuperksService],
  exports: [VirtuperksService],
})
export class VirtuperksModule {}
