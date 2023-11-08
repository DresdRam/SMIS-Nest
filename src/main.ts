import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './model/app/app.module';

const port: number = 3025;
const successMessage: string = `Server Started Listening On Port ${port} ....`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port).then(() => {
    console.log(successMessage);
  }).catch((error: any) => {
    console.log(error.message);
  });
}

bootstrap();