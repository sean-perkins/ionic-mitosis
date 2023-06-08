## Developing

### Install dependencies

This project uses pnpm.

```bash
pnpm install
```

### Building Mitosis (UI components)

```bash
npm run build
```

### Building Framework Library

Replace `@ionic/react` with the framework you want to build. For example `@ionic/vue` or `@ionic/angular`.

```bash
npx turbo run build --filter=@ionic/react
```

### Run the test app

Inside the `apps/` directory there is a test app that can be used to test the components.

```bash
cd apps/react
npm install
npm run dev
```
