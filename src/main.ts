import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors(); // Enable CORS for any origin

  app.use(
    (
      req: any,
      res: { setHeader: (arg0: string, arg1: string) => void },
      next: () => void,
    ) => {
      res.setHeader('content-type', 'application/json');
      next();
    },
  );

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

bootstrap();
