function getFakeCaptcha(req, res) {
  return res.json({code:'123456',errcode:0,errmsg:'success'});
}
export default {
  // 'POST /api/login': (req, res) => {
  //   const { password, account, type } = req.body;
  //   if (password === '123456' && account === 'admin') {
  //     res.send({
  //       errmsg: '登陆成功',
  //       errcode:0,
  //       data:{
  //         type:type,
  //         token:'bbbasdfasdadsfasdf',
  //         currentAuthority:'admin'
  //       }
  //     });
  //     return;
  //   }
  //   res.send({
  //     errmsg: '登陆失败',
  //     errcode:-1,
  //     type,
  //     currentAuthority: 'guest',
  //   });
  // },

  'GET /api/captcha': getFakeCaptcha,
};