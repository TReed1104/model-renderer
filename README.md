# Model Renderer
## Overview
A WebGL engine for rendering .OBJ model files in 3D space.
Repository template for Vue.js projects

### Features
- Webpack Compilation
- Babel transpiling
- Live development via Hot module reloading
- Local and Docker deployment
- NPM and yarn support (yarn by default)

### Dependencies
- Node.js
- Yarn package manager (Default - npm alternatively is supported)
- Docker (optional - for Docker deployment)
- Bash (optional - for scripted Docker deployment)

<br>

## Yarn Run Commands
Local use with Yarn package manager.


### Development - "run dev'
Accessible on Localhost:8080.

```bash
cd app
yarn
yarn run dev
```

### Build - "run build"
Compiles the project source ready for deployment, exports to app/dist.

```bash
cd app
yarn
yarn run build
```

<br>

## NPM Run Commands
Local use with Node package manager.

Please Note - This repository has been configured using Yarn and therefore does not contain a lock-file for NPM.

### Development - "run dev'
Accessible on Localhost:8080.

```bash
cd app
npm install .
npm run dev
```

### Build - "run build"
Compiles the project source ready for deployment, exports to app/dist.

```bash
cd app
npm install .
npm run build
```

<br>

## Docker Deployment
Deploys to Docker via Docker-compose

### Development
#### Scripted Deployment
```bash
sudo chmod +x deployment/dev.sh
./deployment/dev.sh
```

#### Manual Deployment
```bash
docker-compose -p model-renderer-dev -f docker-compose.dev.yml up -d --build --remove-orphans
```
### Production
#### Scripted Deployment
```bash
sudo chmod +x deployment/prod.sh
./deployment/prod.sh
```

#### Manual Deployment
```bash
docker-compose -p model-renderer -f docker-compose.yml up -d --build --remove-orphans
```
