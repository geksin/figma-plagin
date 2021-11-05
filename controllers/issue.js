const request = require('request');
const axios = require('axios');
const CircularJSON = require('circular-json');

const { TOKEN } = process.env;

// https://nodejsdev.ru/doc/http-requests/
// https://www.npmjs.com/package/axios#example

module.exports.getMe = (req, res) => {
    request(
      {
        url: 'https://st-api.yandex-team.ru/v2/myself',
        headers: { Authorization: `OAuth ${TOKEN}` },
      },
      (err, response, body) => {
        if (err) return res.status(500).send({ message: err });
        const respon = JSON.parse(body);
        return res.send(respon);
      },
    );
  };


  module.exports.getTask = (req, res) => {
    request(
      {
        url: `https://st-api.yandex-team.ru/v2/issues/${req.body.task}`,
        headers: { Authorization: `OAuth ${TOKEN}` },
      },
      (err, response, body) => {
        if (err) return res.status(500).send({ message: err });
        const respon = JSON.parse(body);
        return res.send(respon);
      },
    );
  };

//   module.exports.postComment = (req, res) => {

//       console.log(req.body.text);
//   request.post(
//     {
//       url: `https://st-api.yandex-team.ru/v2/issues/${req.body.task}/comments`,
//       headers: { Authorization: `OAuth ${TOKEN}` },
//       postData: {"text": "проверка"}
//     },
//     (err, response, body) => {
//       if (err) return res.status(500).send({ message: err });
//       const respon = JSON.parse(body);
//       return res.send(respon);
//     },
//   );
// };

module.exports.postComment = (req, res) => {

    console.log(req.body.text);
axios(
  {
    method: 'post',
    url: `https://st-api.yandex-team.ru/v2/issues/${req.body.task}/comments`,
    headers: { Authorization: `OAuth ${TOKEN}` },
    data: {"text": req.body.text}
  })
  .then(function (response) {
    const str = CircularJSON.stringify(response);
    res.send(JSON.parse(str))})
.catch((err) => { console.error(err); });
};