import "dotenv/config";

import { BadRequestException, Body, Controller, Get, Headers, Inject, Param, Post,  Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import type { AuthRequest } from '@repo/shared';
import { IsAuthenticatedGuard } from '@repo/shared';
import { StripeSessionResponseDto } from '../dto';

@Controller('stripe')
export class PaymentController {
  constructor(@Inject(PaymentService) private paymentService: PaymentService) { }

  @Post('create-checkout-session')
  @UseGuards(IsAuthenticatedGuard)
  async createCheckOutSession(
    @Req() req: AuthRequest,
    @Body() body?: { items?: Array<{ name: string; price: number; quantity: number }> }
  ) {
    const userId = req.user?.sub;
    const email = req.user?.email;

    if (!userId || !email) {
      throw new UnauthorizedException();
    }

    const result = await this.paymentService.createCheckoutSession({
      userId,
      email,
      items: body?.items,

    });
    console.log("Checkout session created:", result);
    return result;
  }

  @Post('webhook')
  async handleWebhook(@Headers('stripe-signature') Signature: string, @Req() req: any, @Res() res: any) {
      console.log('RAW BODY =>', req.rawBody);

  if (!req.rawBody) {
    throw new BadRequestException('Raw body missing');
  }
    if (!Signature) {
      throw new BadRequestException("Missing Stripe signature or webhook secret");
    };
    const rawBody = req.rawBody;
    const result = await this.paymentService.processWebhook(rawBody, Signature);
    return res.status(200).json(result);
  }
  @Get(':session_id')
  @UseGuards(IsAuthenticatedGuard)
  async getcurrentSession(@Param('session_id') sessionId: string): Promise<StripeSessionResponseDto> {
    if (!sessionId) {
      throw new UnauthorizedException("Session ID is required");
    }
    return this.paymentService.getcurrentSession(sessionId);
  }







}
