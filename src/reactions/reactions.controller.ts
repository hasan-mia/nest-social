import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ReactionDto } from './dto/reaction.dto';
import { ReactionsService } from './reactions.service';

@Controller('reaction')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}
  //========= post reaction ==========//
  @UseGuards(JwtAuthGuard)
  @Post('post')
  postReaction(@Body() dto: ReactionDto) {
    return this.reactionsService.postReaction(dto);
  }
  //========= comment reply reaction ==========//
  @UseGuards(JwtAuthGuard)
  @Post('comment')
  commentReaction(@Body() dto: ReactionDto) {
    return this.reactionsService.commentReaction(dto);
  }
  //========= comment reply reaction ==========//
  @UseGuards(JwtAuthGuard)
  @Post('comment')
  replyReaction(@Body() dto: ReactionDto) {
    return this.reactionsService.replyReaction(dto);
  }
}
