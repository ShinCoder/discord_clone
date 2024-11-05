import { Module } from '@nestjs/common';

import { GeneralGateway } from './generalGateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [GeneralGateway]
})
export class GatewayModule {}
