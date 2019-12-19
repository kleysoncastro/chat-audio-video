class ControllerStram {
  async store(req, res) {
    const { msg, user_id } = req.body;

    console.log(user_id, msg);

    const ownerSocker = req.connectedUser[user_id];

    if (ownerSocker) {
      // req.io.to(ownerSocker).emit('chat', msg);
      req.io.emit('chat', msg);

      req.io.on('chat', chat => {
        req.io.emit('chat', chat);
      });

      console.log(user_id, msg);
      console.log(ownerSocker);
      console.log('linha 17 api ');
    }

    res.json(`API  res: ${msg}`);
  }
}

export default new ControllerStram();
