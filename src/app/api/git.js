const fs = require('fs') 
const crypto =  require('crypto')
const path = require("path");


async function getTreeFileMode(fileType, fileOrFolder) {
  const { mode } = fs.statSync(fileOrFolder);
  return fileType === 'tree' ? '040000' : '100' + ((mode & parseInt("777", 8)).toString(8));
}

async function getHashOfFile(path) {
  const content = fs.readFileSync(path);
  const hash = crypto.createHash("sha1");
  hash.update(content);
  const sha = hash.digest("hex");
  return sha;
};

async function createTreeObjectsFromPaths(basepath, folderPath) {
  let treeFileContent = '';
  let treeHash = ''
  // we want to create a tree object similar to git ls-tree
  const listOfFilesAndFoldersAll = fs.readdirSync(basepath + '/' +folderPath, { withFileTypes: true });
  const listOfFilesAndFolders = listOfFilesAndFoldersAll.filter(f => f.name !== '.gitj')

  // if it is a file we want to store the hash of the file, if it is a directory we want to call this function recursively
  for (const fileOrFolder of listOfFilesAndFolders) {
      const fileType = fileOrFolder.isDirectory() ? 'tree' : 'blob';
      const fileName = basepath + '/' + folderPath + '/' + fileOrFolder.name;
      let fileHash = '';
      if (fileType === 'tree') {
          const treeHash = await createTreeObjectsFromPaths(basepath, `${folderPath}/${fileName}`);
          fileHash = treeHash;
      } else {
          // here we need to calculate the hash of the file
          fileHash = await getHashOfFile(`${folderPath}/${fileName}`);
      }
      const fileMode = await getTreeFileMode(fileType, `${folderPath}/${fileName}`);
      const fileModeAndName = `${fileMode} ${fileType} ${fileHash} ${fileName}`;
      treeFileContent += fileModeAndName + '\n';
  }
  const hash = crypto.createHash("sha1");
  hash.update(treeFileContent);
  treeHash = hash.digest("hex");
  // write the tree object to the objects folder
  if (!fs.existsSync(`${basepath}/.gitj/objects/${treeHash.slice(0, 2)}`)) {
    fs.mkdirSync(`${basepath}/.gitj/objects/${treeHash.slice(0, 2)}`, { recursive: true });
  }
  if (fs.existsSync(`${basepath}/.gitj/objects/${treeHash.slice(0, 2)}/${treeHash.slice(2)}`)) {
      // a tree with the same content already exists
      console.log(`${basepath}/.gitj/objects/${treeHash.slice(0, 2)}/${treeHash.slice(2)}`);
      return treeHash;
  }
  // write the file to the objects folder
  fs.writeFileSync(`${basepath}/.gitj/objects/${treeHash.slice(0, 2)}/${treeHash.slice(2)}`, treeFileContent);
  // console.log(.gitj/objects/${treeHash.slice(0, 2)}/${treeHash.slice(2)} \n, treeFileContent);
  return treeHash;
}


function getTreeHashFromCommit(folderpath, commitHash) {
  const commitContent = fs.readFileSync(`${folderpath}/.gitj/objects/${commitHash.slice(0, 2)}/${commitHash.slice(2)}`, 'utf-8');
  const array = commitContent.split('\n').map(e=> e.split(' '))
  const elem = array.find(e => e[0] === 'tree');
  console.log(elem[1])
  return elem[1];
};

async function convertTreeObject(folderpath, treeHash, folderPrefix = '', files = []) {
  console.log(treeHash)
  const treeObject = fs.readFileSync(`${folderpath}/.gitj/objects/${treeHash.slice(0, 2)}/${treeHash.slice(2)}`, 'utf-8');
  const array = treeObject.split('\n').map(e=> e.split(' '))
  for (const file of array) {
    if (!file || file.length < 2) continue;
    const [mode, type, hash, name] = file;
    if (type === 'tree') {
      await convertTreeObject(folderpath, hash, folderPrefix + name + '/', files);
    } else {
      files.push({
        mode: mode,
        type: type,
        hash: hash,
        name: folderPrefix + name
      })
    }
  }
  return files;
}

function createFilesAndFolders(files, folderPath) {
  for (const file of files) {
      const { mode, type, hash, name } = file;
      if (type === 'tree') {
          fs.mkdirSync(`${folderPath}/${name}`, { recursive: true });
      } else {
          const content = fs.readFileSync(`${folderPath}/.gitj/objects/${hash.slice(0, 2)}/${hash.slice(2)}`);
          fs.writeFileSync(`${name}`, content);
      }
  }
}

export function init(folderpath) {
  // creates a folder called .gitj and creates a subfolder called .gitj/object
  if( !fs.existsSync(folderpath))
    fs.mkdirSync(folderpath);
  fs.mkdirSync(folderpath + "/.gitj");
  fs.mkdirSync(folderpath + "/.gitj/objects");
  fs.mkdirSync(folderpath + "/.gitj/refs");
  fs.mkdirSync(folderpath + "/.gitj/refs/heads");
  // creates a file called .gitj/refs/heads/master
  fs.writeFileSync(folderpath + "/.gitj/refs/heads/main", "");
  // creates a file called .gitj/HEAD
  fs.writeFileSync(folderpath + "/.gitj/HEAD", "ref: refs/heads/main");
}

export function add(folderpath, filename) {
  try {
      // file exists?
      fs.accessSync(folderpath + '/' + filename);
      // read the file
      const content = fs.readFileSync(folderpath + '/' + filename);

      // hash the file
      const hash = crypto.createHash("sha1");
      hash.update(content);
      const sha = hash.digest("hex");

      // create a folder with the first two characters of the hash if it doesn't exist
      if (!fs.existsSync(`${folderpath}/.gitj/objects/${sha.slice(0, 2)}`)) {
          fs.mkdirSync(folderpath + "/.gitj/objects/" + sha.slice(0, 2), { recursive: true });
      }
      if (fs.existsSync(`${folderpath}/.gitj/objects/${sha.slice(0, 2)}/${sha.slice(2)}`)) {
          // a blob with the same content already exists
          process.exit(0);
      }

      // write the file to the objects folder
      fs.writeFileSync(`${folderpath}/.gitj/objects/${sha.slice(0, 2)}/${sha.slice(2)}`, content);
  } catch (error) {
      console.log(error);
      console.log(`File ${filename} does not exist.`);
      process.exit(1);
  }
}

function getRef(folderpath){
  const head_path = folderpath + '/.gitj/HEAD'
  const content = fs.readFileSync(head_path, 'utf-8');
  const ref = content.split(' ')[1]

  return ref
}

async function getLatestCommitHash(folderpath){
  const ref = 'refs/heads/main'

  const commit_head_path = folderpath + '/.gitj/' + ref
  const commit_head = fs.readFileSync(commit_head_path, 'utf-8');
  return commit_head !== '' ? commit_head : 0
}


export async function commit(folderpath, commitMessage) {
    const treeHash = await createTreeObjectsFromPaths(folderpath, '.');
    const parentHash = await getLatestCommitHash(folderpath);
    const author = 'test';
    const committer = 'test';
    const commitDate = Date.now();
    const commitContent = `tree ${treeHash}\nparent ${parentHash}\nauthor ${author}\ncommitter ${committer}\ncommit date ${commitDate}\n${commitMessage}`;
    
    const hash = crypto.createHash("sha1");
    hash.update(commitContent);
    const commitHash = hash.digest("hex");
    console.log(commitHash);
    // write the commit object to the objects folder
    if (!fs.existsSync(`${folderpath}/.gitj/objects/${commitHash.slice(0, 2)}`)) {
      fs.mkdirSync(`${folderpath}/.gitj/objects/${commitHash.slice(0, 2)}`, { recursive: true });
    }
    if (fs.existsSync(`${folderpath}/.gitj/objects/${commitHash.slice(0, 2)}/${commitHash.slice(2)}`)) {
        // a commit with the same content already exists
        console.log(`${folderpath}/.gitj/objects/${commitHash.slice(0, 2)}/${commitHash.slice(2)}`);
        return commitHash;
    }
    // write the file to the objects folder
    fs.writeFileSync(`${folderpath}/.gitj/objects/${commitHash.slice(0, 2)}/${commitHash.slice(2)}`, commitContent);
    // set the head of current branch to the commit hash
    fs.writeFileSync(folderpath + '/.gitj/refs/heads/main', commitHash);
    return commitHash;
}

function removeAllFilesAndFolders(folderpath) {
  const files = fs.readdirSync(folderpath, { withFileTypes: true }).filter(i => i.name !== '.gitj')
  console.log(files)

  for (const file of files) {
    if (file.isDirectory() ){
      fs.rm(path.join(file.path, file.name), { recursive: true})
    }
    else{
      fs.unlinkSync(path.join(file.path ,file.name))
    }
  }
}

export async function checkout(folderpath, commitHash) {
  const listOfFilesToCreate = [];
  // store the commit hash in the refs folder
  fs.writeFileSync(folderpath + '/.gitj/HEAD', commitHash);
  const treeHash = getTreeHashFromCommit(folderpath, commitHash);
  console.log(treeHash)
  // get tree file
  const baseTree = await convertTreeObject(folderpath, treeHash);
  console.log(baseTree)
  // clear the folder
  removeAllFilesAndFolders(folderpath);
  // create the files and folders based on address on the blob
  createFilesAndFolders(baseTree, folderpath);
}
