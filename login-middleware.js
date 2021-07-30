// login-middleware.js
module.exports = (req, res, next) => {
/*   res.header('X-Hello', 'World')
  next() */
  console.log(req.path)
  if (req.method == 'POST' && req.path == '/login') {
    const rand=()=>Math.random(0).toString(36).substr(2);
    const token=(length)=>(rand()+rand()+rand()+rand()).substr(0,length);

    if (req.body.username === 'admin@sofyplastic.com' && req.body.password === 'user1') {
      res.status(200).json({
        "sessionToken" : token(40),
        "user": {
        "id": 1,
        "name": "SOFY",
        "last_name": "PLASTIC",
        "document": "112000000",
        "nit": "N900517190",
        "email": "admin@sofyplastic.com",
        "status": "active",
        "type": "client",
        "password": "user1",
        "created_at": "2021-01-01 08:00:59",
        "update_at": "2021-01-01 08:00:59",
        "deleted_at": null
      } })
    } else  if (req.body.username === 'admin@rimax.com' && req.body.password === 'user2') {
      res.status(200).json({
        "sessionToken" : token(40),
        "user": {
        "id": 2,
        "name": "RIMAX",
        "last_name": null,
        "document": "789228093",
        "nit": "N90051716",
        "email": "admin@rimax.com",
        "status": "active",
        "type": "client",
        "password": "user2",
        "created_at": "2021-01-01 08:00:59",
        "update_at": "2021-01-01 08:00:59",
        "deleted_at": null
      }})
    } else {
      res.status(403).json({message: 'wrong password'})
    }
  } else {
    next()
  }
}