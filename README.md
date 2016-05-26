# haastii

### Building haastii ###

1. Install `gulp-cli` globally
   * First remove any old `gulp` packages you have installed
   ```
   npm rm gulp -g
   ```
```
npm install gulp-cli -g
```
2. Install `less` globally
```
npm install less -g
```
3. From the project directory install the npm modules, run gulp, and start the project
```
npm install
gulp
npm start
```

### Deploying haastii ###

1. Make sure you've built the project first

2. Use the `put-haastii` script to push to the server
   1. Make sure you have directory permissions

