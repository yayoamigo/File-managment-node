const fs = require('fs/promises');

( async () => {
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

    const CREATE_FILE = 'create a file';
    const fileHandler = await fs.open('./commands.txt', 'r');

    fileHandler.on('change', async ()=>{
        console.log('the file was changed');
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
    })

    const watcher = fs.watch('./commands.txt');
    for await(const event of watcher){
        if(event.eventType === 'change' ){

            fileHandler.emit('change')
            
        }
    }
}) ();
 