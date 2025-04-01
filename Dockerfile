# 使用 Node.js 基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

RUN npm install -g pnpm

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装项目依赖
RUN pnpm install

# 复制整个项目到工作目录
COPY . .

# 暴露应用端口（根据实际情况修改）
EXPOSE 8201

# 启动应用
CMD ["pnpm", "run", "serve"]