const fs = require('fs-extra');

console.log(`
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  COPY ICONS FILES TO BUILD FOLDER
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  from:  './icons'
  to:    './build/static/icons/'
`);

fs.copy('./icons', './build/static/icons/', err => {
   if (err) return console.error(err);

   console.log(`
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
               DONE!
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  `);
});
