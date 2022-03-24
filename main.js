var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response)
{
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    var pathname = url.parse(_url, true).pathname;

    console.log(url.parse(_url, true));

    if(pathname === '/')
    {
      if(title == undefined) title = 'Home';

      fs.readdir('./data', (err, fileList) =>{
        var list = '<ol>';

        var i = 0;

        while(i < fileList.length)
        {
          if(fileList[i]!='Home')
            list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</li>`;
          i = i + 1;
        }

        list = list+'</ol>';
        fs.readFile(`data/${title}`, 'utf-8', (err, description) =>{
          var template = `
          <!doctype html>
          <html>
            <head>
              <title> WEB1 - ${title}</title>
              <meta charset = "utf-8">
              <style>
                body {
                  margin:0px;
                  background-color:#101820;
                }
                a {
                  color:#FEE715;
                  text-decoration:none;
                }
                h1 {
                  color:#FEE715;
                  font-size:45px;
                  text-align: center;
                  border-bottom:1px solid gray;
                  margin:0px;
                  padding:20px;
                }
                ol{
                  color:#FEE715;
                  border-right:1px solid gray;
                  width:100px;
                  margin:0px;
                  padding-left:33px;
                }
                #grid{
                  display:grid;
                  grid-template-columns : 150px 1fr;
                  border-bottom:1px solid gray;
                }
                #article{
                  padding-left:25px;
                }
                @media(max-width:800px)
                {
                  #grid{ display:block;}
                  ol{ border-right:none;}
                }
              </style>
            </head>

            <body>
              <h1><a href = "/?id=Home">Home</a></h1>
              <div id="grid">
                ${list}
                <div id="article">
                  <h2 style="color:#FEE715">${title}</h2>
                  <p style="margin-top:40px;color:#FEE715"><span id="first" class="js">${title}</span></p>
                  <p>
                    ${description}
                  </p>
                </div>
              </div>
            </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        });
      });
    }
    else
    {
      response.writeHead(404);
      response.end('Not found');
    }
  });
app.listen(3000);
