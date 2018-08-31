const qs = require('querystring');

function sendHtml = function(res, html){
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
}

function parseReceivedData(req, cb){
  var body = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) { body+=chunk});
  req.on('end', function(){
    var data = qs.parse(body);
    cb(data);
  });
};

function actionForm(id, path, label){
  var html = `<form method="POST" action="${path}">
                <input type="hidden" name="id" value="${id}">
                <input type="submit" value="${label}" />
              </form>`;
  return html;
};

function add(db, req, res){
  parseReceivedData(req, function(work) {
    db.query(
      "INSERT INTO work (hours, date, description) " +
      " VALUE(?,?,?)",
      [work.hours, work.date, work.description],
      function(err) {
        if(err) throw err;
        show(db, res);
      }
    );
  });
};

function delete(db, req, res){
  parseReceivedData(req, function(work){
    db.query(
      "DELETE FROM work WHERE id=?",
      [work.id],
      function(err){
        if(err) throw err;
        show(db, res);
      }
    );
  });
};

function archive(db, req, res){
  parseReceivedData(req, function(work){
    db.query(
      "UPADTE work SET archived=1 WHERE id=? ",
      [work.id],
      function(err) {
        if(err) throw err;
        show(db, res);
      }
    );
  });
};

function show(db, res, showArchived){
  var query = "SELECT * FROM work " +
            "WHERE archived=? " +
            "ORDER BY date DESC";
  var archiveValue = (showArchived) ? 1 : 0;
  db.query(
    query,
    [archiveValue],
    function(err, rows){
      if(err) throw err;
      html = (showArchived)
       ? ''
       : '<a href="/archived">Archived Work</a><br />';
       html += workHitlisHtml(rows);
       html += workForHtml();
       sendHtml(res, html);
    }
  )
}

function showArchived(db, res){
  show(db, res, true);
}

function workHitlistHtml(rows){
  var html = '<table>';
  for(var i in rows){
    html += '<tr>';
    html += '<td>' + rows[i].date + '</td>';
    html += '<td>' + rows[i].hours + '</td>';
    html += '<td>' + rows[i].description + '</td>';
    if(!rows[i].archived){
      html += '<td>' + workArchiveForm(rows[i].id) + '</td>';
    }
    html += '<td>' +workDeleteFrom(rows[i].id) + '</td>';
    html += '</tr>';
   }
   html += '</table>';
   return html;
}

function workFormHtml(){
  var html = '<form method="POST" action="/">' +
    '<p>Date (YYYY-MM-DD):<br/><input name="date" type="text"></p>' +
    '<p>Hours worked:<br/><input name="hours" type="text"></p>' +
    '<p>Description:<br/>' +
    '<textarea  name="description"></textarea></p>' +
    '<input type="submit" value="Add" />' +
    '</form>';
  return html;
}

function workArchiveForm(id){
  return actionForm(id, '/archive', 'Archive');
}

function workDeleteFrom(id){
  return actionForm(id, '/delete', 'Delete');
}
