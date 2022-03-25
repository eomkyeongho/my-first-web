var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateList(fileList)
{
  var list = '<ol>';

  var i = 0;

  while(i < fileList.length)
  {
    if(fileList[i]!='Home')
    {
      list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
    }

    i = i + 1;
  }

  list = list+'<br><a href="/create" style="border:solid 1px; padding:2px; padding-bottom:6px;">create</a></ol>';

  return list;
}

function templateHTML(title, list, body)
{
  return `
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
        ${body}
      </div>
    </body>
  </html>
  `;
}

var app = http.createServer(function(request,response)
{
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/')
    {
      if(title == undefined) title = 'Home';

      fs.readdir('./data', (err, fileList) =>
      {
        list = templateList(fileList);
        fs.readFile(`data/${title}`, 'utf-8', (err, description) =>{
          var template = templateHTML(title, list, `<div id="article">
                    <h2 style="color:#FEE715">${title}</h2>
                    <p style="margin-top:40px;color:#FEE715"><span id="first" class="js">${title}</span></p>
                    <p>
                      ${description}<br>
                    </p>
                  </div>`);
          response.writeHead(200);
          response.end(template);
        });
      });
    }
    else if(pathname === '/create')
    {
      title = 'WEB - create';
      fs.readdir('./data', (err, fileList) =>
      {
        list = templateList(fileList);
        fs.readFile(`data/${title}`, 'utf-8', (err, description) =>
        {
          var template = templateHTML(title, list, `<form action="http://localhost:3000/create_process" method="post">
            <p><input type="text" name="title"></p>
            <p>
              <textarea name="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>`);
          response.writeHead(200);
          response.end(template);
        });
      });
    }
    else if(pathname === '/create_process')
    {
      var body = '';

      request.on('data', function (data)
      {
        body = body + data;
      });

      request.on('end', function ()
      {
        var post = qs.parse(body);
        var title = post.title;
        var description = `<h2 style="color:#FEE715">${post.description} file is here</h2>`;

        fs.writeFile(`data/${title}`, description, 'utf-8', (err) =>
        {
          response.writeHead(302, {Location:`/?id=${title}`});
          response.end('success');
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
