export function getWebViewContainerContent(link: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }
    </style>
  </head>
  
  <body>
    <iframe name="WeiBoIframe" src="${link}" frameborder="0" width="100%"
      height="100%" sandbox="allow-same-origin allow-scripts"></iframe>
  </body>
  
  </html>
  `
}
