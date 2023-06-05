# Nest Demo 1

- 基本 CRUD
- jwt 用户鉴权

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## API

HOST: `http://localhost:3000`

- `GET:/user/list` get user list
- `POST:/user/create` create user
- `POST:/user/delete` delete user
- `POST:/user/update` update user
- `POST:/user/info` get single user's info

## Q&A

### @nestjs/config 这个包的作用

`@nestjs/config` 是一个 Nest.js 模块，用于从环境变量、配置文件和其他来源中加载配置。它提供了一种简单的方式来管理应用程序的配置，使得您可以轻松地将配置信息注入到您的服务和控制器中。

使用 `@nestjs/config`，您可以将配置信息存储在多个来源中，例如：

- 环境变量
- `.env` 文件
- `.env.production` 文件
- `.env.development` 文件
- `.env.test` 文件
- `.env.local` 文件
- `.env.${NODE_ENV}` 文件

您可以使用 `ConfigModule` 来加载配置信息，并使用 `ConfigService` 来访问这些配置信息。例如，您可以在 `app.module.ts` 中加载配置信息，如下所示：

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.production'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

在这个例子中，我们使用 `ConfigModule.forRoot()` 方法来加载配置信息，并指定了要加载的 `.env` 和 `.env.production` 文件的路径。这样，我们就可以在整个应用程序中使用 `ConfigService` 来访问这些配置信息。

例如，您可以在 `app.service.ts` 中使用 `ConfigService` 来访问配置信息，如下所示：

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const name = this.configService.get<string>('APP_NAME');
    return `Hello, ${name}!`;
  }
}
```

在这个例子中，我们使用 `ConfigService` 来获取名为 `APP_NAME` 的配置项，并将其用于生成欢迎消息。这样，我们就可以轻松地管理应用程序的配置信息，并将其注入到我们的服务和控制器中。

### joi 这个包的作用

`joi` 是一个 Node.js 模块，用于验证和转换 JavaScript 对象。它提供了一种简单的方式来定义和验证对象的结构，并将其转换为所需的格式。`joi` 可以用于验证和转换 HTTP 请求、配置文件、数据库记录等等。

使用 `joi`，您可以定义一个对象的结构，并指定每个属性的类型、默认值、最小值、最大值等等。例如，您可以定义一个用户对象的结构，如下所示：

```ts
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(120),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
  }),
});
```

在这个例子中，我们使用 `Joi.object()` 方法来定义一个用户对象的结构，并指定了每个属性的类型、默认值、最小值、最大值等等。例如，我们指定了 name 和 email 属性为必需属性，并使用 `Joi.string()` 和 `Joi.email()` 方法来指定它们的类型。我们还指定了 `age` 属性为可选属性，并使用 `Joi.number()`、`Joi.integer()`、`Joi.min()` 和 `Joi.max()` 方法来指定它的类型、最小值和最大值。最后，我们定义了一个嵌套的 `address` 对象，并指定了它的属性和类型。

一旦您定义了对象的结构，您就可以使用 `validate()` 方法来验证和转换对象。例如，您可以验证一个用户对象是否符合上述结构，如下所示：

```ts
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 25,
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
  },
};

const { error, value } = userSchema.validate(user);

if (error) {
  console.error(error);
} else {
  console.log(value);
}
```

在这个例子中，我们使用 `validate()` 方法来验证一个用户对象是否符合上述结构，并将其转换为所需的格式。如果对象不符合结构，`validate()` 方法将返回一个错误对象，其中包含有关错误的详细信息。如果对象符合结构，`validate()` 方法将返回一个值对象，其中包含已验证和转换的对象。

`joi` 还提供了许多其他方法，例如 `array()`、`boolean()`、`date()`、`alternatives()` 等等，用于定义和验证其他类型的对象。

### bcryptjs 这个包的作用

`bcryptjs` 是一个 Node.js 模块，用于将密码哈希化。它提供了一种简单的方式来保护用户密码，使得即使数据库被盗也不会泄露用户的密码。

使用 `bcryptjs`，您可以将用户密码哈希化，并将其存储在数据库中。当用户登录时，您可以将其输入的密码与存储在数据库中的哈希值进行比较，以验证用户的身份。这样，即使数据库被盗，黑客也无法轻易地获取用户的密码。

在 TypeScript 和 JavaScript 中，您可以使用 `bcryptjs` 来哈希化密码。例如，您可以在 `hashing.service.ts` 中使用 `bcryptjs` 来哈希化密码，如下所示：

```ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashingService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
```

在这个例子中，我们使用 `bcrypt.genSalt()` 方法来生成一个随机的盐值，并使用 `bcrypt.hash()` 方法来将密码哈希化。我们还使用 `bcrypt.compare()` 方法来比较输入的密码和存储在数据库中的哈希值，以验证用户的身份。

请注意，`bcrypt` 是一种计算密集型的操作，因此在生产环境中，您可能需要使用异步哈希化来避免阻塞事件循环。您可以使用 `bcrypt.hash()` 和 `bcrypt.compare()` 方法的异步版本来实现异步哈希化。例如，您可以使用 `bcrypt.hash()` 方法的异步版本来哈希化密码，如下所示：

```ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashingService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async hashPasswordAsync(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
```

在这个例子中，我们使用 `async` 和 `await` 关键字来实现异步哈希化。我们还定义了一个名为 `hashPasswordAsync()` 的方法，它是 `hashPassword()` 方法的异步版本。这样，我们就可以在生产环境中使用异步哈希化，而不会阻塞事件循环。
