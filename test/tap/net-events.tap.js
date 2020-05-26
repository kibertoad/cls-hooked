'use strict';

var net = require('net');
var test = require('tap').test;
var createNamespace = require('../../index').createNamespace;

// FIXME This is broken on Node > 6
test('continuation-local state with net connection', {skip: true}, function(t) {

  t.plan(4);

  var namespace = createNamespace('net');
  namespace.run(function() {
    namespace.set('test', 'originalValue');

    var server;
    namespace.run(function() {
      namespace.set('test', 'newContextValue');

      server = net.createServer(function(socket) {
        t.equal(namespace.get('test'), 'newContextValue', 'state has been mutated');
        socket.on('data', function() {
          t.equal(namespace.get('test'), 'newContextValue', 'state is still preserved');
          server.close();
          socket.end('GoodBye');
        });
      });
      server.listen(function() {
        var address = server.address();
        namespace.run(function() {
          namespace.set('test', 'MONKEY');
          var client = net.connect(address.port, function() {
            t.equal(namespace.get('test'), 'MONKEY', 'state preserved for client connection');
            client.write('Hello');
            client.on('data', function() {
              t.equal(namespace.get('test'), 'MONKEY', 'state preserved for client data');
              t.end();
            });
          });
        });
      });
    });
  });
});
