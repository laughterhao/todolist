import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // 指向您的 JSON 數據文件
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
