import FileBrowser, { Icons } from "react-keyed-file-browser";

// this imports the FontAwesome Icon Styles
// import "font-awesome/css/font-awesome.min.css";

import React, { useEffect, useState } from "react";

const Editor = ({ folder }) => {
  return (
    <div className="flex h-[500px]">
      <div className="overflow-hidden flex flex-col w-1/6">
        <div className="overflow-y-auto">
          <LeftExplorer folder={folder} />
        </div>
      </div>

      <div className="overflow-hidden flex flex-col w-5/6">
        <div className="overflow-y-scroll">content</div>
      </div>
    </div>
  );
};

const LeftExplorer = ({ folder = {} }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    for (let i = 0; i < folder?.length; i++) {
      let f = folder[`${i}`];
      setFiles((prev) => [
        ...prev,
        {
          key: f.webkitRelativePath,
          size: f.size * 1024,
          modified: f.lastModified,
        },
      ]);
    }
    console.log(folder.length);
    // setFiles(
    //   folder?.FileList?.map(({ file: f }) => {
    //     console.log(f);
    //     return {
    //       key: f.webkitRelativePath,
    //       size: f.size * 1024,
    //       modified: f.lastModified,
    //     };
    //   }) || []
    // );
  }, [folder]);

  console.log(files);
  return <FileBrowser files={[]} icons={Icons.FontAwesome(4)} />;
};

/*
files: [
      {
        key: 'photos/animals/cat in a hat.png',
        modified: +Moment().subtract(1, 'hours'),
        size: 1.5 * 1024 * 1024,
      },
      {
        key: 'photos/animals/kitten_ball.png',
        modified: +Moment().subtract(3, 'days'),
        size: 545 * 1024,
      },
      {
        key: 'photos/animals/elephants.png',
        modified: +Moment().subtract(3, 'days'),
        size: 52 * 1024,
      },
      {
        key: 'photos/funny fall.gif',
        modified: +Moment().subtract(2, 'months'),
        size: 13.2 * 1024 * 1024,
      },
      {
        key: 'photos/holiday.jpg',
        modified: +Moment().subtract(25, 'days'),
        size: 85 * 1024,
      },
      {
        key: 'documents/letter chunks.doc',
        modified: +Moment().subtract(15, 'days'),
        size: 480 * 1024,
      },
      {
        key: 'documents/export.pdf',
        modified: +Moment().subtract(15, 'days'),
        size: 4.2 * 1024 * 1024,
      },
    ],

*/

export default Editor;
