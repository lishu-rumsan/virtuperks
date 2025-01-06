import { Controller } from '@nestjs/common';
import { VirtuperksService } from './virtuperks.service';

@Controller('virtuperks')
export class VirtuperksController {
  constructor(private virtuperksService: VirtuperksService) {}
}
