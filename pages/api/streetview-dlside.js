export default function handler(req, res) {
  const streetview = require('streetview-panorama')
  const separator = /!1s|!2e/;

  const { url } = JSON.parse(req.body);
  const viewId = url.split(separator)[1];
  streetview.saveImg({ id: viewId, type: "google", fileName: './public/panorama/' })

  res.status(200).json({
    viewId: viewId
  });
}