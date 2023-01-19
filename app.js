const fs = require('fs/promises');

( async () => {

    const CREATE_FILE = 'create a file';
    const DELETE_FILE = 'delete the file';
    const RENAME_FILE = 'rename the file';
    const ADD_TO = 'add to the file'


    const createFile = async(path) =>{
        try{
        const fileExist = await fs.open(path, 'r')
            fileExist.close()
            return console.log(`file ${path} already exists`)

        } catch(e){
            const newFile = await fs.open(path, 'w');
            console.log('new file created');
            newFile.close()
        }
        
    }

    const deleteFile = async(path)=>{
        await fs.unlink(path)
        console.log(`Deleting ${path}`);

    }

    const renameFile = async(oldPath, newPath) =>{
        await fs.rename(oldPath,newPath)
        console.log(`Rename ${oldPath} to ${newPath}`);
    }

    const addToFile = async (path, content) =>{
        const fileHandle = await fs.open(path, 'a');
        fileHandle.write(content)
        console.log(`Adding ${content} to ${path}`);
    }


    const fileHandler = await fs.open('./commands.txt', 'r');

    fileHandler.on('change', async ()=>{
        console.log('the file was changed!');
        const size = ( await fileHandler.stat()).size;
        const buff = Buffer.alloc(size);
        const offset = 0;
        const length  = buff.byteLength;
        const position = 0;
        await fileHandler.read(buff,offset,length,position);
        const command = buff.toString();

        if (command.includes(CREATE_FILE)){
            const filePath = command.substring(CREATE_FILE.length + 1);
            createFile(filePath)
        }

        if (command.includes(DELETE_FILE)){
            const filePath = command.substring(DELETE_FILE.length + 1);
            deleteFile(filePath)
        }

        if (command.includes(RENAME_FILE)){
            const idx = command.indexOf(" to ");
            const oldPath = command.substring(RENAME_FILE.length + 1, idx);
            const newPath = command.substring(idx + 4);

            renameFile(oldPath,newPath)
        }

        if (command.includes(ADD_TO)){
            const idx = command.indexOf(" this content:");
            const filePath = command.substring(ADD_TO.length + 1, idx);
            const content = command.substring(idx + 15);

            addToFile(filePath, content)
        }


        
    })

    const watcher = fs.watch('./commands.txt');
    for await(const event of watcher){
        if(event.eventType === 'change' ){

            fileHandler.emit('change')
            
        }
    }
}) ();
 