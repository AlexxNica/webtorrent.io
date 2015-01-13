var debug = require('debug')('webtorrent-website:util')
var posix = require('posix')

var MAX_SOCKETS = 10000

exports.downgradeUid = function () {
  if (process.platform === 'linux' && process.env.NODE_ENV === 'production') {
    process.setuid('www-data')
    debug('downgraded uid to ' + process.getuid())
  }
}

exports.upgradeLimits = function () {
  posix.setrlimit('nofile', { soft: MAX_SOCKETS, hard: MAX_SOCKETS })
  var limits = posix.getrlimit('nofile')
  debug('upgraded resource limits to ' + limits.soft)
}
