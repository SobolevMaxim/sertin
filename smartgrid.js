var smartgrid = require('smart-grid');

var settings = {
  filename: '_smart-grid',
  outputStyle: 'scss',
  properties: [],
  columns: 12,
  offset: "30px",
  container: {
      maxWidth: "1280px",
      fields: "30px"
  },
  breakPoints: {
      lg: {
          width: "1200px",
          fields: "30px"
      },
      md: {
          width: "992px",
          fields: "15px"
      },
      sm: {
          width: "720px",
          fields: "15px"
      },
      xs: {
          width: "576px",
          fields: "15px"
      }
  },
  mixinNames: {
      container: "wrapper",
      row: "row-flex",
      rowFloat: "row-float",
      column: "col",
      size: "size",
      columnFloat: "col-float",
      columnPadding: "col-padding",
      offset: "offset"
  },
  tab: "    ",
  oldSizeStyle: false
};

smartgrid('app/sass/', settings);
