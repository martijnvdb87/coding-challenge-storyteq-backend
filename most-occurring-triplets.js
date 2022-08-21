var logFile = [
    ['/', 'user_1'],
    ['/about', 'user_1'],
    ['/', 'user_3'],
    ['/features', 'user_1'],
    ['/about', 'user_2'],
    ['/purchase', 'user_2'],
    ['/purchase', 'user_1'],
    ['/thank-you', 'user_1'],
    ['/about', 'user_3'],
    ['/thank-you', 'user_2'],
    ['/purchase', 'user_3'],
    ['/thank-you', 'user_3']
];
var getTopRoutes = function (logFile, rankingAmount, trackLength) {
    if (logFile === void 0) { logFile = []; }
    var counter = new Map();
    var temporary = new Map();
    logFile.forEach(function (_a) {
        var _b, _c;
        var path = _a[0], user = _a[1];
        var paths = (_b = temporary.get(user)) !== null && _b !== void 0 ? _b : [];
        paths.push(path);
        if (paths.length > trackLength) {
            paths.shift();
        }
        if (paths.length === trackLength) {
            var key = paths.join();
            var count = (_c = counter.get(key)) !== null && _c !== void 0 ? _c : 0;
            counter.set(key, count + 1);
        }
        temporary.set(user, paths);
    });
    return Array.from(counter.entries())
        .sort(function (a, b) {
        return b[1] - a[1];
    })
        .slice(0, rankingAmount)
        .map(function (item) {
        return [item[0].split(','), item[1]];
    });
};
console.log(getTopRoutes(logFile, 10, 3));
