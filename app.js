const fs = require('fs/promises');

( async () => {
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

           if (command.includes('create a file')){
            const filePath = command.substring('create a file' + 1)
           }
    })

    const watcher = fs.watch('./commands.txt');
    for await(const event of watcher){
        if(event.eventType === 'change' ){

            fileHandler.emit('change')
            
        }
    }
}) ();
 