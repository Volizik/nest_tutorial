import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const port = process.env.PORT || serverConfig.port;

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  await app.listen(port);
}
bootstrap();
