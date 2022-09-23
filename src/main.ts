import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
        .setTitle("fil-meetups")
        .setDescription("Потрясающее API для работы с базой данных пользователей и информацией о митапах")
        .setVersion('0.0.1')
        .build()
        
    const documentation = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/documentation', app, documentation);

  await app.listen(PORT, () => console.log(`Приложение запущено на ${PORT} порте`));
}
bootstrap();
