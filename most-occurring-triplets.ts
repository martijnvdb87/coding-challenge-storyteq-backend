type Path = string;
type User = string;
type Key = string;
type Count = number;

type LogFileItem = [Path, User];

type TopRoute = [string[], number];

const logFile: LogFileItem[] = [
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

const getTopRoutes = (logFile: LogFileItem[] = [], rankingAmount: number, trackLength: number): TopRoute[] => {
  const counter = new Map<Key, Count>();
  const temporary = new Map<User, Path[]>();

  logFile.forEach(([path, user]: LogFileItem): void => {
    const paths: Path[] = temporary.get(user) ?? [];
    paths.push(path);

    if (paths.length > trackLength) {
      paths.shift();
    }

    if (paths.length === trackLength) {
      const key: Key = paths.join();
      const count: Count = counter.get(key) ?? 0;
      counter.set(key, count + 1);
    }

    temporary.set(user, paths);
  });

  return Array.from(counter.entries())
    .sort((a: [string, number], b: [string, number]) => {
      return b[1] - a[1];
    })
    .slice(0, rankingAmount)
    .map((item: [string, number]) => {
      return [item[0].split(','), item[1]];
    });
};

console.log(getTopRoutes(logFile, 10, 3));
