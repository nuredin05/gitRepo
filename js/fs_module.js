const fs = require('fs');

// Read file asynchronously with callback
fs.readFile('../abebe.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

// For binary data (like images), omit the encoding
fs.readFile('../images/puppy-1.jpg', (err, data1) => {
  if (err) throw err;
  // data is a Buffer containing the file content
  console.log('Image size:', data1.length, 'bytes');
});
fs.readFile('../abebe.txt', (err, data2 ) => {
  if (err) throw err;
  // data is a Buffer containing the file content
  console.log(data2.toString());
});