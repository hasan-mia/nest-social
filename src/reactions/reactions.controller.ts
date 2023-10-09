import { Body, Controller, Post } from '@nestjs/common';
import { ReactionDto } from './dto/reaction.dto';
import { ReactionsService } from './reactions.service';

@Controller('reaction')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}
  // post reaction
  @Post('post')
  postReaction(@Body() dto: ReactionDto) {
    return this.reactionsService.postReaction(dto);
  }
  // comment reply reaction
  @Post('comment')
  commentReaction(@Body() dto: ReactionDto) {
    return this.reactionsService.commentReaction(dto);
  }
}
